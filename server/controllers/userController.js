const response = require("../utils/response");
const userService = require("../services/userService");

exports.getAllUsers = (req, res) => {
	const users = userService.getAllUsers();
	res.json(users);
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
		console.error("🔥 Unexpected Error in createUser:", error);

		// All other errors = internal server error (don’t leak to client)
		return response.error(res, "Internal server error", 500);
	}
};
