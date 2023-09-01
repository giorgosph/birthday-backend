const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
require("dotenv").config();

async function register(req, res) {
  const { username, password } = req.body; 

  try {
    console.log(`Try to register new user ${username}`)

    const userExists = await User.findUser(username);
    if (userExists) return res.status(200).send({ success: false, message: "Username Already Exist!" });

    const hashed = await bcrypt.hash(password, 10);
    console.log("HASH PASS: ", hashed); // REMOVE
    const user = await User.register({ ...req.body, password: hashed });

    signToken(user.username, res);
  } catch (err) {
    console.error("Error Creating User:\n\t", err);
    res.status(500).send({ success: false, message: "Server Error" });
  }
}

async function login(req, res) {
  const { username, password } = req.body; 

  try {
    console.log(`Try to log in user ${username}`)

    const user = await User.findUser(username);
    const authed = await bcrypt.compare(password, user?.password);
    if (authed) {
      console.log("User logged in -> ", user.username);
      signToken(user.username, res);
    } else res.status(401).json({ success: true, message: "Wrong username/password" });
  } catch (err) {
    console.error("Error Logging User:\n\t", err);
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
  register,
  login
};
