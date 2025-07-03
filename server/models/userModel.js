"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasMany(models.Post, {
				foreignKey: "user_id",
				as: "posts",
			});
		}
	}

	User.init(
		{
			first_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "First name is required" },
					notEmpty: { msg: "First name cannot be empty" },
				},
			},
			middle_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Middle name is required" },
					notEmpty: { msg: "Middle name cannot be empty" },
				},
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Last name is required" },
					notEmpty: { msg: "Last name cannot be empty" },
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					msg: "Email must be unique",
				},
				validate: {
					notNull: { msg: "Email is required" },
					notEmpty: { msg: "Email cannot be empty" },
					isEmail: { msg: "Email must be valid" },
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			underscored: true,
		}
	);

	// to return createdAt & updatedAt in snake case format
	User.prototype.toJSON = function () {
		const values = { ...this.get() };
		values.created_at = values.createdAt;
		values.updated_at = values.updatedAt;
		delete values.createdAt;
		delete values.updatedAt;
		return values;
	};

	return User;
};
