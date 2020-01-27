const mongoose = require("mongoose");

const postModel = mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel"
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryModel"
  },
  filedata: Object,
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "userModel",
    default: []
  },
  comments: [
    {
      text: String,
      date: {
        type: Date,
        default: Date.now
      },
      commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
      },
      replies: [
        {
          text: String,
          date: {
            type: Date,
            default: Date.now
          },
          repliedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel"
          }
        }
      ]
    }
  ]
});

module.exports = mongoose.model("postModel", postModel);
