import User from "../models/User.js";
import { matchedData } from "express-validator";

export const registerUser = async (req, res) => {
  try {
    const data = matchedData(req);
    req.body = data;

    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(401).json({ message: "Username already exists" });

    const newUser = new User({ username, password });
    newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while registering", error: err.message });
  }
};

export const logoutUser = async (req, res) => {
  req.logout((err) => {
    if (err)
      return res.status(500).json({ message: "Error while logging out" });

    res.json({ message: "Logged out successfully" });
  });
};
