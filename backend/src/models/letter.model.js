import mongoose from "mongoose";

const letterSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		image: {
			type: [String],
		},
		dateToBeOpened: {
			type: Date,
			required: true,
		},
		password: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Letter = mongoose.model("Letter", letterSchema);

export default Letter;
