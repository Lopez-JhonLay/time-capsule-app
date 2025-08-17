import Letter from "../models/letter.model.js";

export const saveLetter = async (req, res) => {
	const { text, image, dateToBeOpened, password } = req.body;
	const userId = req.user._id;

	try {
		const newLetter = new Letter({
			userId,
			text,
			image,
			dateToBeOpened,
			password,
		});

		await newLetter.save();

		res.status(201).json(newLetter);
	} catch (error) {
		res.status(500).json({ message: "Error saving letter", error });
	}
};
