import { create } from "zustand";

import axiosInstance from "@/lib/axios";

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
		} catch (error) {
			console.error(`Error creating account: ${error}`);
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
		} catch (error) {
			console.error(`Error logging in: ${error}`);
		} finally {
			set({ isLoggingIn: false });
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({ authUser: null });
			console.log("Logged out successfully");
		} catch (error) {
			console.error(`Error logging out: ${error}`);
		}
	},
}));

export default useAuthStore;
