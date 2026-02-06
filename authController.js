const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ fullName, email, password: hashed, role });
  res.json({ message: "User Registered" });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ msg: "Invalid" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};
