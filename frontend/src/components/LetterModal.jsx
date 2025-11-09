import { useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Calendar, Lock } from "lucide-react";

export default function LetterModal({ isOpen, onClose, letter }) {
	const [passwordInput, setPasswordInput] = useState("");
	const [showContent, setShowContent] = useState(false);
	const [error, setError] = useState("");

	if (!letter) return null;

	const formatDate = (dateString) =>
		new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

	const handleUnlock = () => {
		if (passwordInput === letter.password) {
			setShowContent(true);
			setError("");
		} else {
			setError("Incorrect password");
		}
	};

	const handleClose = () => {
		setPasswordInput("");
		setShowContent(false);
		setError("");
		onClose();
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={handleClose}
		>
			<DialogContent className="max-w-lg">
				{letter?.password && letter.password.trim() !== "" && !showContent ? (
					<>
						<DialogHeader>
							<DialogTitle className="flex items-center gap-2 text-xl font-bold">
								<Lock className="h-5 w-5 text-purple-500" /> Enter Password
							</DialogTitle>
							<DialogDescription className="text-slate-500 dark:text-slate-400">
								This letter is password protected. Please enter the password to
								unlock it.
							</DialogDescription>
						</DialogHeader>

						<div className="space-y-3 mt-4">
							<Input
								type="password"
								placeholder="Enter password"
								value={passwordInput}
								onChange={(e) => setPasswordInput(e.target.value)}
							/>
							{error && <p className="text-red-500 text-sm">{error}</p>}
							<Button
								className="w-full"
								onClick={handleUnlock}
								disabled={!passwordInput.trim()}
							>
								Unlock Letter
							</Button>
						</div>
					</>
				) : (
					<>
						<DialogHeader>
							<DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
								{letter.title || "Untitled Letter"}
							</DialogTitle>
							<DialogDescription className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
								<Calendar className="h-4 w-4" /> Opened on{" "}
								{formatDate(letter.dateToBeOpened)}
							</DialogDescription>
						</DialogHeader>

						<div className="mt-4 text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
							{letter.text}
						</div>

						<div className="mt-6 flex justify-end">
							<Button onClick={onClose}>Close</Button>
						</div>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
