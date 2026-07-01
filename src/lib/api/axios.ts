import axios from "axios";
import { toast } from "@/components/ui/toast";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// ── Request Interceptor ──
// Attach auth token to every outgoing request (if one exists).
apiClient.interceptors.request.use(
  (config) => {
    // If you store a JWT in localStorage / cookie, attach it here:
    // const token = typeof window !== "undefined"
    //   ? localStorage.getItem("access_token")
    //   : null;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor ──
// Centralised error and success notifications for API responses.
apiClient.interceptors.response.use(
  (response) => {
    // Automatically trigger success toast for mutating methods (POST, PUT, DELETE)
    // if the API returned a descriptive success message in response.data.message
    const method = response.config.method?.toLowerCase();
    if (method && method !== "get" && response.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    let errorMessage = "An unexpected error occurred.";

    if (error.response) {
      const { status, data } = error.response;
      
      // Parse custom error messages returned by API
      if (data && typeof data === "object") {
        errorMessage = data.message || data.error || `Error ${status}: Something went wrong.`;
      } else {
        errorMessage = `Error ${status}: Something went wrong.`;
      }

      switch (status) {
        case 401:
          console.log("[API] Unauthorized — redirect to login");
          break;
        case 403:
          console.log("[API] Forbidden — insufficient permissions");
          break;
        case 404:
          console.log("[API] Resource not found");
          break;
        case 500:
          console.log("[API] Internal server error");
          break;
        default:
          console.log(`[API] Error ${status}:`, data);
      }
    } else if (error.request) {
      errorMessage = "Network error. Please check your internet connection.";
      console.log("[API] Network error — no response received");
    } else {
      errorMessage = error.message || "Request setup error.";
      console.log("[API] Request setup error:", error.message);
    }

    toast.error(errorMessage);
    return Promise.reject(error);
  },
);

export default apiClient;
