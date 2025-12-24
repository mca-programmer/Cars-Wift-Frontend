"use client";

import axios from "axios";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const axiosInstance = axios.create({
  baseURL: "https://car-xpress-api-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    // Response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const status = err?.response?.status;

        if (status === 401 || status === 403) {
          await logOut();
          router.push("/login");
        }

        return Promise.reject(err);
      }
    );

    // Cleanup on unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, router]);

  return axiosInstance;
};

export default useAxiosSecure;
