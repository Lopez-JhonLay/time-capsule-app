import { create } from "zustand";

import axiosInstance from "@/lib/axios";

import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,
	isCheckingAuth: true,

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/auth/check");
			set({ authUser: res.data.user });
		} catch (error) {
			set({ authUser: null });
			console.error(`Error checking auth: ${error}`);
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signup: async (data) => {
		set({ isSigningUp: true });

		try {
			const res = await axiosInstance.post("/auth/signup", data);
			set({ authUser: res.data });
			console.log("Account created successfully", res.data);
			toast.success("Account created successfully!");
		} catch (error) {
			console.error(`Error creating account: ${error}`);
			toast.error(error.response.data.message);
		} finally {
			set({ isSigningUp: false });
		}
	},

	login: async (data) => {
		set({ isLoggingIn: true });

		try {
			const res = await axiosInstance.post("/auth/login", data);
			set({ authUser: res.data });
			console.log("Logged in successfully", res.data);
			toast.success("Login successful!");
		} catch (error) {
			console.error(`Error logging in: ${error}`);
			toast.error(error.response.data.message);
		} finally {
			set({ isLoggingIn: false });
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({ authUser: null });
			console.log("Logged out successfully");
			toast.success("Logout successful!");
		} catch (error) {
			console.error(`Error logging out: ${error}`);
			toast.error(error.response.data.message);
		}
	},
}));

export default useAuthStore;
