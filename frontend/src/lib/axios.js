import axios from "axios";

import { API_URL } from "@/constants/config";

const axiosInstance = axios.create({
	baseURL: `${API_URL}/api`,
	withCredentials: true,
});

export default axiosInstance;
