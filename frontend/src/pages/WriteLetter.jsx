import { useState } from "react";
import { Save, Calendar, Lock, FileText } from "lucide-react";

import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Header from "../components/Header";

import useAuthStore from "@/store/useAuthStore";

import axiosInstance from "@/lib/axios";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

export default function WriteLetter() {
	const [formData, setFormData] = useState({
		title: "",
		message: "",
		openDate: "",
		password: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	const { authUser } = useAuthStore();

	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const letter = {
				title: formData.title,
				text: formData.message,
				dateToBeOpened: formData.openDate,
				password: formData.password || null,
			};

			const response = await axiosInstance.post("/letters/save", letter, {
				withCredentials: true,
			});

			console.log("Letter saved:", response.data);

			toast.success("Your letter has been put to capsule!");

			setFormData({
				title: "",
				message: "",
				openDate: "",
				password: "",
			});

			navigate("/letters");
		} catch (error) {
			console.error(
				"Error saving letter:",
				error.response?.data || error.message
			);
		} finally {
			setIsLoading(false);
		}
	};

	const getTomorrowDate = () => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow.toISOString().split("T")[0];
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			{/* Navigation */}
			<Header />

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<div className="max-w-4xl mb-4">
					<h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
						{authUser
							? `Welcome back, ${authUser.email}!`
							: "Welcome to DearFutureMe"}
					</h1>
					<p className="text-lg text-slate-600 dark:text-slate-300">
						Create a message for your future self or loved ones to discover.
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="space-y-6"
				>
					<div className="grid gap-6 lg:grid-cols-3">
						{/* Main Form */}
						<div className="lg:col-span-2 space-y-6">
							{/* Title Card */}
							<Card className="shadow-lg border-0">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center space-x-2">
										<FileText className="h-5 w-5 text-blue-600" />
										<span>Letter Details</span>
									</CardTitle>
									<CardDescription>
										Give your letter a meaningful title and write your message.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="title">Title</Label>
										<Input
											id="title"
											name="title"
											type="text"
											placeholder="e.g., A message to my future self"
											value={formData.title}
											onChange={handleInputChange}
											className="text-lg"
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="message">Your Message</Label>
										<textarea
											id="message"
											name="message"
											rows={12}
											placeholder="Write your letter here... Share your thoughts, dreams, current events, or anything you'd like to remember in the future."
											value={formData.message}
											onChange={handleInputChange}
											className="w-full px-3 py-2 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md resize-none"
											required
										/>
									</div>

									{/* Save Button */}
									<div className="flex justify-end pt-4">
										<Button
											type="submit"
											size="lg"
											className="w-full sm:w-auto"
											disabled={isLoading}
										>
											{isLoading ? (
												<>
													<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
													Saving...
												</>
											) : (
												<>
													<Save className="h-4 w-4 mr-2" />
													Save Letter
												</>
											)}
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Settings Sidebar */}
						<div className="space-y-6">
							{/* Schedule Card */}
							<Card className="shadow-lg border-0">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center space-x-2">
										<Calendar className="h-5 w-5 text-green-600" />
										<span>Schedule</span>
									</CardTitle>
									<CardDescription>
										When should this letter be opened?
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<Label htmlFor="openDate">Open Date</Label>
										<Input
											id="openDate"
											name="openDate"
											type="date"
											min={getTomorrowDate()}
											value={formData.openDate}
											onChange={handleInputChange}
											required
										/>
										<p className="text-xs text-slate-500 dark:text-slate-400">
											Your letter will be available to open on this date.
										</p>
									</div>
								</CardContent>
							</Card>

							{/* Security Card */}
							<Card className="shadow-lg border-0">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center space-x-2">
										<Lock className="h-5 w-5 text-purple-600" />
										<span>Security</span>
									</CardTitle>
									<CardDescription>
										Protect your letter with a password.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<Label htmlFor="password">Password (Optional)</Label>
										<Input
											id="password"
											name="password"
											type="password"
											placeholder="Enter a secure password"
											value={formData.password}
											onChange={handleInputChange}
										/>
										<p className="text-xs text-slate-500 dark:text-slate-400">
											Leave empty for no password protection.
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
