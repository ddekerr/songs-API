const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3001);
  })
  .catch(() => {
    console.log("No Database connection");
    process.exit(1);
  });
