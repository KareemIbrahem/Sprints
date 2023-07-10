const express = require("express");
const mongoose = require("mongoose");
const prouductRouter = require("./routers/prouductRouter");
const registerRouter = require("./routers/registerRouter");
const loginRouter = require("./routers/loginRouter");
const dotenv = require("dotenv");
dotenv.config();
(async function conectToMongodb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/MongoEcomm", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connected to mongodb");
})().catch((err) => console.log(err));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/product", prouductRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.listen(5000, () => {
  console.log(`server is runing in port ${5000}....`);
});
