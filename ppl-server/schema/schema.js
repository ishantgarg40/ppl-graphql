const graphql = require("graphql");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const categoryModel = require("../models/categoryModel");
const sendEmail = require("../SendEmails");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { GraphQLUpload } = require("graphql-upload");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    isVerified: { type: GraphQLBoolean }
  })
});

const CategoryType = new GraphQLObjectType({
  name: "category",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    filedata: {
      type: GraphQLUpload
    }
  })
});

const PostType = new GraphQLObjectType({
  name: "upload_post",
  fields: () => ({
    user_id: { type: GraphQLString },
    category_id: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return category.findById(parent.category_id);
      }
    },
    image: { type: GraphQLUpload },
    user: {
      type: UserType,
      resolve(parent, args) {
        return userModel.findById(parent.user_id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return userModel.findById(args.id);
      }
    },
    userOnUsername: {
      type: UserType,
      args: {
        username: { type: GraphQLString }
      },
      resolve(parent, args) {
        return userModel.findOne({ username: args.username });
      }
    },
    userOnEmail: {
      type: UserType,
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        return userModel.findOne({ email: args.email });
      }
    },
    verifyToken: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(parent, args) {
        return jwt.verify(args.token, process.env.JWT_SECRET, (err, data) => {
          if (err) throw new Error("Invalid Token");
          return data._doc;
        });
      }
    },
    profileInfo: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(parent, args) {
        return jwt.verify(args.token, process.env.JWT_SECRET, (err, data) => {
          if (err) throw new Error("Invalid Token");
          return data._doc;
        });
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    registerUser: {
      type: UserType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString)
        },
        password: {
          type: new GraphQLNonNull(GraphQLString)
        },
        firstname: {
          type: new GraphQLNonNull(GraphQLString)
        },
        lastname: {
          type: new GraphQLNonNull(GraphQLString)
        },
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        isVerified: {
          type: new GraphQLNonNull(GraphQLBoolean)
        }
      },
      async resolve(parent, args) {
        let saltRounds = 10;
        let password = await bcrypt.hashSync(args.password, saltRounds);
        let user = new userModel({
          username: args.username,
          password,
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          isVerified: false
        });
        let userDataAfterSave = await user.save();
        sendEmail(userDataAfterSave);
        return userDataAfterSave;
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      async resolve(parent, args) {
        try {
          let query = { _id: args.id };
          let result = await userModel.updateOne(
            query,
            { $set: { isVerified: true } },
            err => {
              if (err) throw err;
            }
          );
          return result;
        } catch (err) {
          // return { error: "there is an error in verfication" };
          console.log(err);
        }
      }
    },
    addCategory: {
      type: CategoryType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        filedata: {
          type: new GraphQLNonNull(GraphQLUpload)
        }
      },
      async resolve(parent, args) {
        try {
          const { name, filedata } = args;
          const category = new categoryModel({
            name,
            filedata
          });
          const response = await category.save();
          return response;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    uploadPost: {
      type: PostType,
      args: {
        token: {
          type: new GraphQLNonNull(GraphQLString)
        },
        image: {
          type: new GraphQLNonNull(GraphQLUpload)
        },
        category: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      async resolve(parent, args) {
        try {
          const { token, image, category_id } = args;
          const userInfo = jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, data) => {
              if (err) throw new Error("Invalid Token");
              return data._doc;
            }
          );
          const post = new postModel({
            filedata: image,
            postedBy: userInfo.id,
            category: category_id
          });
          let response = await post.save();
          return response;
        } catch (error) {
          throw new Error(error);
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
