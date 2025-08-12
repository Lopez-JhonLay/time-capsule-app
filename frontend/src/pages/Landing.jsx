import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Clock, Archive, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			{/* Navigation */}
			<nav className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center space-x-2">
							<Clock className="h-8 w-8 text-blue-600" />
							<span className="text-2xl font-bold text-slate-900 dark:text-white">
								DearFutureMe
							</span>
						</div>
						<div className="flex items-center space-x-4">
							<Link to="/login">
								<Button variant="ghost">Sign In</Button>
							</Link>
							<Link to="/register">
								<Button>Get Started</Button>
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto text-center">
					<div className="max-w-3xl mx-auto">
						<h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
							Preserve Your{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
								Memories
							</span>{" "}
							for Tomorrow
						</h1>
						<p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
							Create digital time capsules to store your precious moments,
							thoughts, and memories. Schedule them to be opened in the future
							and relive the magic of today.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link to="/register">
								<Button
									size="lg"
									className="w-full sm:w-auto"
								>
									Start Your Journey
								</Button>
							</Link>
							<Button
								variant="outline"
								size="lg"
								className="w-full sm:w-auto"
							>
								Watch Demo
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
							Why Choose DearFutureMe?
						</h2>
						<p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
							Discover the features that make preserving your memories simple,
							secure, and meaningful.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						<Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
							<CardHeader className="text-center">
								<div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
									<Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
								</div>
								<CardTitle>Time-Locked</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center">
									Set future dates for your capsules to be opened. Perfect for
									anniversaries, birthdays, or personal milestones.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
							<CardHeader className="text-center">
								<div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
									<Archive className="h-6 w-6 text-green-600 dark:text-green-400" />
								</div>
								<CardTitle>Rich Media</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center">
									Store photos, videos, voice notes, and text messages. Create
									multimedia experiences for your future self.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
							<CardHeader className="text-center">
								<div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
									<Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
								</div>
								<CardTitle>Secure & Private</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center">
									Your memories are encrypted and protected. Only you can access
									your time capsules when they're ready.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
							<CardHeader className="text-center">
								<div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
									<Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
								</div>
								<CardTitle>Easy to Use</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center">
									Intuitive interface makes creating and managing your time
									capsules effortless and enjoyable.
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
						<CardHeader className="pb-8">
							<CardTitle className="text-3xl sm:text-4xl font-bold mb-4">
								Ready to Create Your First Time Capsule?
							</CardTitle>
							<CardDescription className="text-blue-100 text-lg">
								Join thousands of users who are already preserving their
								memories for the future.
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link to="/register">
									<Button
										size="lg"
										variant="secondary"
										className="w-full sm:w-auto cursor-pointer"
									>
										Get Started Free
									</Button>
								</Link>
								<Link to="/learn-more">
									<Button
										size="lg"
										variant="secondary"
										className="w-full sm:w-auto cursor-pointer"
									>
										Learn More
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-4 gap-8">
						<div className="md:col-span-2">
							<div className="flex items-center space-x-2 mb-4">
								<Clock className="h-8 w-8 text-blue-400" />
								<span className="text-2xl font-bold">DearFutureMe</span>
							</div>
							<p className="text-slate-400 max-w-md">
								Preserve your memories and create meaningful connections with
								your future self through our secure time capsule platform.
							</p>
						</div>
						<div>
							<h3 className="font-semibold mb-4">Product</h3>
							<ul className="space-y-2 text-slate-400">
								<li>
									<a
										href="#"
										className="hover:text-white transition-colors"
									>
										Features
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-white transition-colors"
									>
										Pricing
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-white transition-colors"
									>
										FAQ
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold mb-4">Company</h3>
							<ul className="space-y-2 text-slate-400">
								<li>
									<a
										href="#"
										className="hover:text-white transition-colors"
									>
										About
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-white transition-colors"
									>
										Privacy
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-white transition-colors"
									>
										Terms
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
						<p>&copy; 2025 DearFutureMe. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
