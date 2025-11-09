import express from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import {
	getLetters,
	getLetterById,
	saveLetter,
	deleteLetterById,
} from "../controllers/letter.controller.js";

const router = express.Router();

router.get("/", protectRoute, getLetters);
router.get("/:id", protectRoute, getLetterById);
router.post("/save", protectRoute, saveLetter);
router.delete("/:id", protectRoute, deleteLetterById);

export default router;
