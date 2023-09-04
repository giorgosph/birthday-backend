const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
require("dotenv").config();


const getBirthDates = async (req, res) => {
  try {
    console.log("Getting today's birth dates");

    const dates = await User.getTodaysDates();
    if(!dates) return res.status(204).json({ success: false });

    res.status(200).json({ success: true, birthDates: dates });
  } catch (err) {
    console.error("Error Getting User:\n", err);
    res.status(500).send({ success: false, message: "Server Error" });
  }
};

const wish = (req, res) => {
  console.log(`Happy Birthday ${req.params.name}!`);
  res.status(200).json({ hasBody: false, message: "Thank you :)" });
}

const register = async (req, res) => {
  const { username, password } = req.body; 

  try {
    console.log(`Try to register new user ${username}`)

    const userExists = await User.findUser(username);
    if (userExists) return res.status(200).send({ success: false, message: "Username Already Exist!" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.register({ ...req.body, password: hashed });

    signToken(user.username, res);
  } catch (err) {
    console.error("Error Creating User:\n", err);
    res.status(500).send({ success: false, message: "Server Error" });
  }
}

const login = async (req, res) => {
  const { username, password } = req.body; 

  try {
    console.log(`Try to log in user ${username}`)

    const user = await User.findUser(username);
    if(!user) return res.status(401).json({ success: true, message: "Wrong username/password" });

    const authed = await bcrypt.compare(password, user.password);
    if (authed) {
      console.log("User logged in -> ", user.username);
      signToken(user.username, res);
    } else res.status(401).json({ success: true, message: "Wrong username/password" });
  } catch (err) {
    console.error("Error Logging User:\n", err);
    res.status(500).send({ success: false, message: "Server Error" });
  }
}

// ------------------- Helper Functions ------------------- //

function signToken(username, res) {
  const sendToken = (err, token) => {
    if(err) throw new Error(err);
    res.status(201).json({ success: true, token: `Bearer ${token}` });
  };

  jwt.sign(username, process.env.SECRET, sendToken);
}

module.exports = {
  getBirthDates,
  register,
  login,
  wish
};
