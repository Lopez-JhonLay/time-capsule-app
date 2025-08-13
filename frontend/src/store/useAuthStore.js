import { create } from "zustand";

import axiosInstance from "@/lib/axios";

const useAuthStore = create((set) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,

	signup: async (data) => {
		set({ isSigningUp: true });

		try {
			const res = await axiosInstance.post("/auth/signup", data);
			set({ authUser: res.data });
			console.log("Account created successfully", res.data);
		} catch (error) {
			console.error("Error creating account", error);
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
			console.error("Error logging in", error);
		} finally {
			set({ isLoggingIn: false });
		}
	},
}));

export default useAuthStore;
