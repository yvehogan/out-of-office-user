import axios from "axios";

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
// Centralised error handling so individual services don't have to repeat it.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Redirect to login or clear stored credentials
          // window.location.href = "/login";
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
          console.log(`[API] Error ${status}:`, error.response.data);
      }
    } else if (error.request) {
      // Network error — no response received
      console.log("[API] Network error — no response received");
    } else {
      console.log("[API] Request setup error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
