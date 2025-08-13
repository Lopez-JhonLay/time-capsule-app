import { useState } from "react";
import { Link } from "react-router-dom";

import useAuthStore from "@/store/useAuthStore";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Loader } from "lucide-react";

import LoginBgImg from "@/assets/login-bg-img.jpg";

function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { login, isLoggingIn } = useAuthStore();

	const handleSubmit = (e) => {
		e.preventDefault();

		login(formData);
	};

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<div className={"flex flex-col gap-6"}>
					<Card className="overflow-hidden p-0">
						<CardContent className="grid p-0 md:grid-cols-2">
							<form
								onSubmit={handleSubmit}
								className="p-6 md:p-8"
							>
								<div className="flex flex-col gap-6">
									<div className="flex flex-col items-center text-center">
										<h1 className="text-2xl font-bold">Welcome back</h1>
										<p className="text-muted-foreground text-balance">
											Login to your DearFutureMe account
										</p>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="email">Email</Label>
										<Input
											value={formData.email}
											onChange={(e) =>
												setFormData({ ...formData, email: e.target.value })
											}
											id="email"
											type="email"
											placeholder="m@example.com"
											required
										/>
									</div>
									<div className="grid gap-3">
										<div className="flex items-center">
											<Label htmlFor="password">Password</Label>
											<a
												href="#"
												className="ml-auto text-sm underline-offset-2 hover:underline"
											>
												Forgot your password?
											</a>
										</div>
										<Input
											value={formData.password}
											onChange={(e) =>
												setFormData({ ...formData, password: e.target.value })
											}
											id="password"
											type="password"
											required
										/>
									</div>
									<Button
										disabled={isLoggingIn}
										type="submit"
										className="w-full"
									>
										{isLoggingIn ? (
											<>
												<Loader className="size-5 animate-spin" />
												Signing in...
											</>
										) : (
											"Sign in"
										)}
									</Button>
								</div>
								<div className="text-center text-sm mt-3">
									Don&apos;t have an account?{" "}
									<Link
										to="/register"
										className="underline underline-offset-4"
									>
										Sign up
									</Link>
								</div>
							</form>
							<div className="bg-muted relative hidden md:block">
								<img
									src={LoginBgImg}
									alt="Image"
									className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
								/>
							</div>
						</CardContent>
					</Card>
					<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
						By clicking continue, you agree to our{" "}
						<a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
