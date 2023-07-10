const crypto = require("crypto");
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
      passwordRepeat: z
        .string()
        .min(8)
        .regex(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d\s:])[\S]*$/)),
    });

    req.body = schema.parse(req.body);
    if (req.body && req.body.password === req.body.passwordRepeat) {
      next();
    } else {
      res.status(400).json({
        message: "make sure password and password repeat are equal",
      });
    }
  } catch (error) {
    res.status(400).json(error.issues);
  }
};
const addUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const hasedPassword = hashed(password);

  const newUser = new User({
    email: email,
    password: hasedPassword,
  });
  data = await newUser.save();
  console.log(User);
  res.json({
    success: true,
  });
};
module.exports = [validateData, addUser];
