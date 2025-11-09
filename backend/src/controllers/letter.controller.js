import Letter from "../models/letter.model.js";

export const getLetters = async (req, res) => {
	const userId = req.user._id;

	try {
		const letters = await Letter.find({ userId }).sort({ dateToBeOpened: 1 });

		res.status(200).json(letters);
	} catch (error) {
		res.status(500).json({ message: "Error fetching letters", error });
	}
};

export const getLetterById = async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;

	try {
		const letter = await Letter.findOne({ _id: id, userId });

		if (!letter) {
			return res.status(404).json({ message: "Letter not found" });
		}

		res.status(200).json(letter);
	} catch (error) {
		res.status(500).json({ message: "Error fetching letter", error });
	}
};

export const saveLetter = async (req, res) => {
	const { title, text, dateToBeOpened, password } = req.body;
	const userId = req.user._id;

	try {
		const newLetter = new Letter({
			userId,
			title,
			text,
			dateToBeOpened,
			password,
		});

		await newLetter.save();

		res.status(201).json(newLetter);
	} catch (error) {
		res.status(500).json({ message: "Error saving letter", error });
	}
};

// controllers/letterController.js
export const deleteLetterById = async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;

	try {
		const letter = await Letter.findOne({ _id: id, userId });

		if (!letter) {
			return res
				.status(404)
				.json({ message: "Letter not found or unauthorized" });
		}

		await Letter.deleteOne({ _id: id, userId });

		res.status(200).json({ message: "Letter deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting letter", error });
	}
};
