const express = require("express");
const cors = require("cors");

const users = require("./routes/usersRoute");

const app = express();

app.use(cors());
app.use(express.json());

const apiRoute = "/api/v1";

app.use(`${apiRoute}/users`, users);

module.exports = app;
