import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import RegisterBgImg from "@/assets/register-bg-img.jpg";

import { Link } from "react-router-dom";

function Register() {
	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<div className={"flex flex-col gap-6"}>
					<Card className="overflow-hidden p-0">
						<CardContent className="grid p-0 md:grid-cols-2">
							<form className="p-6 md:p-8">
								<div className="flex flex-col gap-6">
									<div className="flex flex-col items-center text-center">
										<h1 className="text-2xl font-bold">Create your account</h1>
										<p className="text-muted-foreground text-balance">
											Create DearFutureMe account
										</p>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											type="email"
											placeholder="m@example.com"
											required
										/>
									</div>
									<div className="grid gap-3">
										<div className="flex items-center">
											<Label htmlFor="password">Password</Label>
										</div>
										<Input
											id="password"
											type="password"
											required
										/>
									</div>
									<div className="grid gap-3">
										<div className="flex items-center">
											<Label htmlFor="confirm-password">Confirm Password</Label>
										</div>
										<Input
											id="confirm-password"
											type="password"
											required
										/>
									</div>
									<Button
										type="submit"
										className="w-full"
									>
										Register
									</Button>
								</div>
								<div className="text-center text-sm mt-3">
									Already have an account?{" "}
									<Link
										to="/login"
										className="underline underline-offset-4"
									>
										Login
									</Link>
								</div>
							</form>
							<div className="bg-muted relative hidden md:block">
								<img
									src={RegisterBgImg}
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

export default Register;
