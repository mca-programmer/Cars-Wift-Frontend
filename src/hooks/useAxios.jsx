"use client";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://car-xpress-api-server.vercel.app",
});

const useAxios = () => {
  return instance;
};

export default useAxios;
