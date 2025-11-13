const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

module.exports = app;
