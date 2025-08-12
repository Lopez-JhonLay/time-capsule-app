import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./lib/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	connectDB();
	console.log(`Server running on http://localhost:${PORT}`);
});
