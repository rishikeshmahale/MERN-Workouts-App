const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exists" });
    }
    
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect Password" });
      }
      
      const token = createToken(user._id);

    res.status(200).json({ email, token });

  } catch (err) {
    return res.status(200).json({ error: err.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ message: "All fields are mandorty" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Email is not valid" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "Password is not strong enough" });
  }

  const exists = await User.findOne({ email: email });

  if (exists) {
    return res.status(404).json({ message: "Email already in use" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash });

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginUser, signupUser };
