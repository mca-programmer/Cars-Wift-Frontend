"use client";
import CarCard from "@/components/shared/CarCard";
import Loader from "@/components/shared/Loader";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const axios = useAxios();
  const { register, handleSubmit, reset } = useForm();
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ["all-cars", searchText],
    queryFn: async () => {
      const res = await axios(
        `/cars${searchText ? `?search=${searchText}` : ""}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  //when search
  const handleSearch = (formData) => {
    const q = searchInput ?? formData.search ?? "";
    setSearchText(q.trim());
  };

  const handleReset = () => {
    setSearchInput("");
    setSearchText("");
    reset();
  };

  const categories = ["BMW", "Audi", "Mercedes-Benz", "Nissan", "Mitsubishi"];

  return (
    <div className="mt-20 max-w-[1300px] mx-auto px-4 py-24">
      <div className="flex flex-col items-center mb-12">
        <h2 className="section_heading text-center">Cars For Rent</h2>
        <p className="section_paragraph mt-4 text-center max-w-xl text-gray-300 text-lg">
          Find the perfect ride for your next journey. Filter, search and book
          instantly.
        </p>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="mb-10 relative max-w-lg mx-auto"
      >
        <input
          {...register("search")}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="search"
          placeholder="Search cars by brand..."
          className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none hover:border-white/20 focus:border-white/20 backdrop-blur-xl"
        />
        <button
          type="submit"
          className="absolute p-3 cursor-pointer rounded-lg bg-black right-1.5 top-[5px] text-gray-300 hover:text-white transition"
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
        </button>
      </form>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            className="px-5 py-2 rounded-full border border-white/10 text-white text-sm hover:bg-indigo-600 duration-300 backdrop-blur-xl cursor-pointer hover:scale-105"
            onClick={() => {
              setSearchInput(cat);
              setSearchText(cat);
            }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* No recults */}
      <AnimatePresence>
        {!isLoading && cars.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-xl items-center justify-center gap-2 text-gray-300 mb-4 flex">
              <RxCross2 size={30} /> No cars found matching your search.
            </h2>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-3 cursor-pointer rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
              >
                Load All Cars
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="py-10 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {cars.map((car, i) => (
              <motion.div
                key={car._id ?? i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Page;
