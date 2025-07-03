const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes"); // Importing user routes

router.use("/", userRoutes); // Used user routes

module.exports = router;
