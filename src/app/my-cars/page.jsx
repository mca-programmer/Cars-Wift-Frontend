"use client";
import React from "react";
import { PrivateRoute } from "@/provider/PrivateRoute";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import MyCarCard from "@/components/shared/MyCarCard";
import { motion } from "framer-motion";
import Loader from "@/components/shared/Loader";

const page = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ["my-cars", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/my-cars?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <PrivateRoute>
      <div className="mt-20 py-24 max-w-[1300px] mx-auto px-4 ">
        <div className="flex flex-col items-center mb-12">
          <h2 className="section_heading text-center">My Cars</h2>
          <p className="section_paragraph mt-4 text-center max-w-xl text-gray-300 text-lg">
            Find the perfect ride for your next journey. Filter, search and book
            instantly.
          </p>
        </div>
        {/* My Cars Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.map((car, index) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex"
            >
              <MyCarCard car={car} className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default page;
