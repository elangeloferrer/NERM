const db = require("../models");
const User = db.User;

exports.getAllUsers = () => users;

exports.createUser = async (data) => {
	const user = await User.create(data);
	return user;
};
