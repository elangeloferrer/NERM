const response = require("../utils/response");
const userService = require("../services/userService");

exports.getAllUsers = async (req, res) => {
	try {
		const users = await userService.getAllUsers();
		return response.success(res, users, "Users fetched successfully", 200);
	} catch (error) {
		console.error("Fetch Error:", error);
		return response.error(res, "Failed to fetch users", 500);
	}
};

exports.getUserById = async (req, res) => {
	try {
		const user = await userService.getUserById(req.params.id);

		if (!user) {
			return response.error(res, "User not found", 500);
		}

		return response.success(res, user, "User fetched successfully", 200);
	} catch (error) {
		console.error("Fetched User Error:", error);
		return response.error(res, "Failed to fetch user", 500);
	}
};

exports.createUser = async (req, res) => {
	try {
		const user = await userService.createUser(req.body);
		return response.success(res, user, "User created successfully", 201);
	} catch (error) {
		console.error("Create User Error:", error);

		// Handle validation and duplicate errors
		if (
			error.name === "SequelizeValidationError" ||
			error.name === "SequelizeUniqueConstraintError"
		) {
			const errors = {};
			if (error.errors) {
				error.errors.forEach((err) => {
					if (
						err.validatorKey === "not_unique" ||
						err.type === "unique violation"
					) {
						errors[err.path] = "Email already exists";
					} else {
						errors[err.path] = err.message;
					}
				});
			}

			return response.error(res, "Validation failed", 400, errors);
		}

		// Log error for debugging
		console.error("Unexpected Error in createUser:", error);

		// All other errors = internal server error (don’t leak to client)
		return response.error(res, "Internal server error", 500);
	}
};

exports.updateUser = async (req, res) => {
	try {
		const user = await userService.updateUser(req.params.id, req.body);

		if (!user) {
			return response.error(res, "User not found", 404, errors);
		}

		return response.success(res, user, "User updated successfully", 200);
	} catch (error) {
		console.error("Update User Error:", error);

		// Handle validation and duplicate errors
		if (
			error.name === "SequelizeValidationError" ||
			error.name === "SequelizeUniqueConstraintError"
		) {
			const errors = {};
			if (error.errors) {
				error.errors.forEach((err) => {
					if (
						err.validatorKey === "not_unique" ||
						err.type === "unique violation"
					) {
						errors[err.path] = "Email already exists";
					} else {
						errors[err.path] = err.message;
					}
				});
			}

			return response.error(res, "Validation failed", 400, errors);
		}

		// Log error for debugging
		console.error("Unexpected Error in updateUser:", error);

		// All other errors = internal server error (don’t leak to client)
		return response.error(res, "Internal server error", 500);
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const success = await userService.deleteUser(req.params.id);

		if (!success) {
			return response.error(res, "User not found", 404);
		}

		return response.success(res, [], "User deleted successfully", 200);
	} catch (error) {
		console.error("Delete Error:", error);
		return response.error(res, "Failed to delete user", 500);
	}
};
