import express from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import { saveLetter } from "../controllers/letter.controller.js";

const router = express.Router();

router.post("/save", protectRoute, saveLetter);

export default router;
