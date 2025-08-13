import { create } from "zustand";

import axiosInstance from "@/lib/axios";

const useAuthStore = create((set) => ({
	authUser: null,
	isSigningUp: false,

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
}));

export default useAuthStore;
