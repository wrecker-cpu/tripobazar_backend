//third part modules
const dotenv = require("dotenv");

//file imports
const connectDB = require("./config/db");

const app = require("./app");

dotenv.config({ path: "./config.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((e) => console.log("MONGO db connection failed !!! ", err));
