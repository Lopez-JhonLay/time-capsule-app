import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
	Mail,
	Calendar,
	Lock,
	Unlock,
	Search,
	Plus,
	Eye,
	Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import LetterModal from "../components/LetterModal";

import axiosInstance from "@/lib/axios";

import toast from "react-hot-toast";

export default function Letters() {
	const [searchTerm, setSearchTerm] = useState("");
	const [letters, setLetters] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedLetter, setSelectedLetter] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const fetchLetters = async () => {
			try {
				const res = await axiosInstance.get("/letters");

				console.log(res.data);
				setLetters(res.data);
			} catch (err) {
				setError(err.response?.data?.message || "Failed to load letters");
			} finally {
				setIsLoading(false);
			}
		};

		fetchLetters();
	}, []);

	// Filter letters based on search term
	const filteredLetters = letters.filter((letter) =>
		letter.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const isDatePassed = (dateString) => {
		return new Date(dateString) <= new Date();
	};

	const getStatusColor = (letter) => {
		if (isDatePassed(letter.dateToBeOpened)) {
			return "text-green-600 dark:text-green-400";
		} else {
			return "text-slate-500 dark:text-slate-400";
		}
	};

	const getStatusText = (letter) => {
		if (isDatePassed(letter.dateToBeOpened)) {
			return "Open";
		} else {
			return "Scheduled";
		}
	};

	// Handler to view a specific letter
	const handleReadLetter = async (letterId) => {
		try {
			const res = await axiosInstance.get(`/letters/${letterId}`);

			console.log("Fetched letter:", res.data);
			setSelectedLetter(res.data);
			setIsModalOpen(true);
		} catch (err) {
			console.error(
				"Failed to fetch letter:",
				err.response?.data || err.message
			);
		}
	};

	const handleDelete = async (letterId) => {
		try {
			const confirmDelete = confirm(
				"Are you sure you want to delete this letter?"
			);
			if (!confirmDelete) return;

			const deletingToast = toast.loading("Deleting letter...");

			const res = await axiosInstance.delete(`/letters/${letterId}`);

			toast.dismiss(deletingToast);

			if (res.status === 200) {
				toast.success("Letter deleted successfully");

				setLetters((prevLetters) =>
					prevLetters.filter((l) => l._id !== letterId)
				);
			} else {
				toast.error(res.data?.message || "Failed to delete letter");
			}
		} catch (error) {
			toast.dismiss();
			toast.error(error.response?.data?.message || "Something went wrong");
		}
	};

	if (isLoading)
		return (
			<div className="flex justify-center items-center h-screen text-slate-500">
				Loading your letters...
			</div>
		);

	if (error)
		return (
			<div className="flex justify-center items-center h-screen text-red-500">
				{error}
			</div>
		);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			{/* Navigation */}
			<Header />

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header Section */}
				<div className="mb-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
								Your Letters
							</h1>
							<p className="text-lg text-slate-600 dark:text-slate-300">
								Manage your time capsule letters and memories.
							</p>
						</div>
						<Link to="/write">
							<Button
								size="lg"
								className="flex items-center space-x-2"
							>
								<Plus className="h-5 w-5" />
								<span>Write New Letter</span>
							</Button>
						</Link>
					</div>

					{/* Search Bar */}
					<div className="mt-6 relative max-w-md">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
						<Input
							type="text"
							placeholder="Search your letters..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10"
						/>
					</div>
				</div>

				{/* Letters Grid */}
				{filteredLetters.length === 0 ? (
					<Card className="shadow-lg border-0">
						<CardContent className="py-12">
							<div className="text-center">
								<Mail className="mx-auto h-12 w-12 text-slate-400 mb-4" />
								<h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
									{searchTerm ? "No letters found" : "No letters yet"}
								</h3>
								<p className="text-slate-600 dark:text-slate-300 mb-6">
									{searchTerm
										? "Try adjusting your search term."
										: "Start by writing your first time capsule letter."}
								</p>
								{!searchTerm && (
									<Link to="/write">
										<Button>
											<Plus className="h-4 w-4 mr-2" />
											Write Your First Letter
										</Button>
									</Link>
								)}
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredLetters.map((letter) => (
							<Card
								key={letter._id}
								className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300"
							>
								<CardHeader className="pb-4">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<CardTitle className="text-lg mb-2 line-clamp-2">
												{letter.title}
											</CardTitle>
											<div className="flex items-center space-x-2 text-sm">
												<Calendar className="h-4 w-4 text-slate-500" />
												<span className="text-slate-600 dark:text-slate-300">
													Opens: {formatDate(letter.dateToBeOpened)}
												</span>
											</div>
										</div>
										<div className="flex items-center space-x-2 ml-4">
											{letter.password && letter.password.trim() !== "" ? (
												<Lock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
											) : (
												<Unlock className="h-5 w-5 text-slate-400" />
											)}
										</div>
									</div>
								</CardHeader>
								<CardContent className="pt-0">
									<div className="space-y-4">
										{/* Status */}
										<div className="flex items-center justify-between text-sm">
											<span className="text-slate-500 dark:text-slate-400">
												Status:
											</span>
											<span className={`font-medium ${getStatusColor(letter)}`}>
												{getStatusText(letter)}
											</span>
										</div>

										{/* Created Date */}
										<div className="flex items-center justify-between text-sm">
											<span className="text-slate-500 dark:text-slate-400">
												Created:
											</span>
											<span className="text-slate-600 dark:text-slate-300">
												{formatDate(letter.createdAt)}
											</span>
										</div>

										{/* Actions */}
										<div className="flex gap-2 pt-2">
											<Button
												variant="outline"
												size="sm"
												className="flex-1"
												// disabled={!isDatePassed(letter.dateToBeOpened)}
												onClick={() => handleReadLetter(letter._id)}
											>
												<Eye className="h-4 w-4 mr-2" />
												Read
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
												onClick={() => handleDelete(letter._id)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}

				{/* Stats Section */}
				{filteredLetters.length > 0 && (
					<div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
						<Card className="shadow-lg border-0">
							<CardContent className="p-6 text-center">
								<div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
									{letters.length}
								</div>
								<div className="text-sm text-slate-600 dark:text-slate-300">
									Total Letters
								</div>
							</CardContent>
						</Card>
						<Card className="shadow-lg border-0">
							<CardContent className="p-6 text-center">
								<div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
									{letters.filter((l) => l.isOpened).length}
								</div>
								<div className="text-sm text-slate-600 dark:text-slate-300">
									Opened
								</div>
							</CardContent>
						</Card>
						<Card className="shadow-lg border-0">
							<CardContent className="p-6 text-center">
								<div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
									{
										letters.filter(
											(l) => !l.isOpened && isDatePassed(l.openDate)
										).length
									}
								</div>
								<div className="text-sm text-slate-600 dark:text-slate-300">
									Ready to Open
								</div>
							</CardContent>
						</Card>
					</div>
				)}
			</div>

			<LetterModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				letter={selectedLetter}
			/>
		</div>
	);
}
