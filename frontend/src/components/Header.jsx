import { useState } from "react";
import { Button } from "./ui/button";
import { Clock, Mail, LogOut, PenTool, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<nav className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center space-x-2">
						<Clock className="h-8 w-8 text-blue-600" />
						<span className="text-2xl font-bold text-slate-900 dark:text-white">
							DearFutureMe
						</span>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-6">
						<NavLink
							to="/write"
							className={({ isActive }) =>
								`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									isActive
										? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950"
										: "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
								}`
							}
						>
							<PenTool className="h-4 w-4" />
							<span>Write</span>
						</NavLink>
						<NavLink
							to="/letters"
							className={({ isActive }) =>
								`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									isActive
										? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950"
										: "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
								}`
							}
						>
							<Mail className="h-4 w-4" />
							<span>Letters</span>
						</NavLink>
						<Button
							variant="outline"
							size="sm"
							className="flex items-center space-x-2"
						>
							<LogOut className="h-4 w-4" />
							<span>Logout</span>
						</Button>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="p-2"
						>
							{isMobileMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation Menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden border-t border-slate-200 dark:border-slate-700">
						<div className="px-2 pt-2 pb-3 space-y-1">
							<NavLink
								to="/write"
								className={({ isActive }) =>
									`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
										isActive
											? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950"
											: "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
									}`
								}
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<PenTool className="h-5 w-5" />
								<span>Write</span>
							</NavLink>
							<NavLink
								to="/letters"
								className={({ isActive }) =>
									`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
										isActive
											? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950"
											: "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
									}`
								}
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<Mail className="h-5 w-5" />
								<span>Letters</span>
							</NavLink>
							<Button
								variant="outline"
								className="w-full justify-start space-x-3 mt-3"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<LogOut className="h-5 w-5" />
								<span>Logout</span>
							</Button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
