const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const z = require("zod");
const User = require("../model/registerModel");

const hashed = (password) =>
  crypto.createHmac("sha256", password).digest("base64");
const validateData = (req, res, next) => {
  try {
    const schema = z.object({
      email: z
        .string()
        .regex(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)),
      password: z
        .string()
        .min(8)
        .regex(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d\s:])[\S]*$/)),
    });
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json(error.issues);
  }
};
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });
  console.log(findUser);

  if (!findUser.email || findUser.password !== hashed(password)) {
    return res.status(401).json({
      status: "error",
      message: "unauthenticated",
    });
  }
  const token = jwt.sign(findUser.email, "alsaeed17108646");
  findUser.token = token;
  await findUser.save();
  return res.status(200).json({
    findUser,
  });
};
module.exports = [validateData, userLogin];
