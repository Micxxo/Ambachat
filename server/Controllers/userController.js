const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { sendError } = require("../Helpers/response");

const createToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (user) return sendError(res, 400, "User already exists");

    if (!name || !email || !password)
      return sendError(res, 400, "All fields are required!");

    if (!validator.isEmail(email))
      return sendError(res, 400, "Email is not a valid email");

    if (!validator.isStrongPassword(password))
      return sendError(res, 400, "Password must be a strong password!");

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.status(200).json({ _id: user._id, name: name, email: email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: "Internal server error" } });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    const isValidPass = await bcrypt.compare(password, user.password);

    if (!user) return sendError(res, 400, "Invalid email or password!");
    if (!isValidPass) return sendError(res, 400, "Invalid email or password!");

    const token = createToken(user._id);
    res
      .status(200)
      .json({ _id: user._id, name: user.name, email: email, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: "Internal server error" } });
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId).select("-password");
    if (!user) return sendError(res, 404, "User not found!");

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: "Internal server error" } });
  }
};

module.exports = {
  register,
  login,
  findUser,
};
