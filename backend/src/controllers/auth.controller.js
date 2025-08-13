import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: "Password must be at least 6 characters long" });
		}

		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			email,
			password: hashPassword,
		});

		if (newUser) {
			generateToken(newUser._id, res);
			await newUser.save();

			return res.status(201).json({
				user: {
					id: newUser._id,
					email: newUser.email,
				},
				message: "User created successfully",
			});
		} else {
			return res.status(500).json({ message: "User creation failed" });
		}
	} catch (error) {
		console.log(`Error in signup controller: ${error.message}`);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email && !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid passwocrd" });
		}

		generateToken(user._id, res);

		res.status(200).json({
			user: {
				id: user._id,
				email: user.email,
			},
			message: "Login successful",
		});
	} catch (error) {
		console.log(`Error in login controller: ${error.message}`);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const logout = async (req, res) => {
	try {
		res.clearCookie("jwt", {
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		});

		res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		console.log(`Error in logout controller: ${error.message}`);
		res.status(500).json({ message: "Internal server error" });
	}
};
