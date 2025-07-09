const db = require("../models");
const User = db.User;

exports.getAllUsers = async () => {
	return await User.findAll();
};

exports.getUserById = async (id) => {
	return await User.findByPk(id);
};

exports.createUser = async (data) => {
	const user = await User.create(data);
	return user;
};

exports.updateUser = async (id, data) => {
	const user = await User.findByPk(id);
	if (!user) return null;

	await user.update(data);
	return user;
};

exports.deleteUser = async (id) => {
	const user = await User.findByPk(id);
	if (!user) return false;

	await user.destroy();
	return true;
};
