require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const cors = require("cors");
const loginHandler = require("./routes/loginHandler");

app.use(require("express").static("uploads"));
app.use(cors());

mongoose
  .connect(`${process.env.MONGO_URL}ppl_db`, { useNewUrlParser: true })
  .catch(err => console.log(err.stack));

mongoose.connection.once("open", () => {
  console.log("Connection Open with ppl_db!!");
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.use("/login", loginHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening at *:${PORT}`);
});
