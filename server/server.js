const express = require("express");
const app = express();
const db = require("./models");
const routes = require("./routes"); // Importing routes

app.use(express.json()); // This is to parse JSON

// Use the imported routes
app.use("/users", routes);

app.listen(3001, () => {
	console.log("Server is running on port 3001 eyy");
});
