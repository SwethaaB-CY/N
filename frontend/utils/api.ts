import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Uses env variable
  withCredentials: true, // Ensures cookies (for authentication) are sent with requests
});

// Request Interceptor (Automatically attach token if exists)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("🔗 Attaching Token:", token); // Debugging
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);


// API call wrapper with error handling
export const fetchData = async (endpoint: string) => {
  try {
    const response = await API.get(endpoint);
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error("API Error:", err.response?.data || err.message);
    throw error;
  }
};

export default API;
