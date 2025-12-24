"use client";
import Loader from "@/components/shared/Loader";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const brandLogos = {
  Audi: "https://toppng.com/uploads/preview/audi-car-logo-11530962094iugeww1llh.png",
  BMW: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  "Mercedes-Benz":
    "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
  Nissan:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Nissan_Logo_%281990-1992%29.jpg/640px-Nissan_Logo_%281990-1992%29.jpg",
  Mitsubishi:
    "https://upload.wikimedia.org/wikipedia/commons/5/5a/Mitsubishi_logo.svg",
};

const CarDetails = ({ id }) => {
  const axios = useAxios();
  const router = useRouter();

  const { data: car, isLoading } = useQuery({
    queryKey: ["single-car", id],
    queryFn: async () => {
      const res = await axios(`/cars/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="mt-44 max-w-[1200px] mx-auto px-4 pb-24 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black border border-white/10 rounded-2xl p-2 md:p-2 shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left */}
          <div className="relative w-full h-[350px] md:h-[500px] rounded-xl overflow-hidden">
            <Image
              src={car.image}
              alt={car.title}
              fill
              className="object-cover rounded-xl"
            />
          </div>

          {/* right */}
          <div>
            <h1 className="text-3xl mt-6 mb-4 md:text-4xl font-semibold">
              {car.title}
            </h1>
            <div className="flex items-center gap-4">
              <img
                src={brandLogos[car.brand]}
                alt={car.brand}
                className="w-16 h-16 p-3 border border-white/10 rounded-full bg-white/5 object-contain"
              />

              <div>
                <p className="text-gray-400 mt-1">{car.brand}</p>
              </div>
            </div>
            <p className="text-gray-300 mt-6 text-lg">{car.shortDescription}</p>
            <p className="text-gray-400 mt-4 leading-relaxed">
              {car.longDescription}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 hover:scale-105 duration-300 border border-white/10 rounded-xl text-center">
                <p className="text-gray-400 text-sm">Price/day</p>
                <p className="text-xl font-bold mt-1">৳{car.price}</p>
              </div>

              <div className="p-4  hover:scale-105 duration-300  border border-white/10 rounded-xl text-center">
                <p className="text-gray-400 text-sm">Engine</p>
                <p className="text-lg font-medium mt-1">{car.engine}</p>
              </div>

              <div className="p-4  hover:scale-105 duration-300  border border-white/10 rounded-xl text-center">
                <p className="text-gray-400 text-sm">Fuel Type</p>
                <p className="text-lg font-medium mt-1">{car.fuel}</p>
              </div>

              <div className="p-4  hover:scale-105 duration-300  border border-white/10 rounded-xl text-center">
                <p className="text-gray-400 text-sm">Location</p>
                <p className="text-lg font-medium mt-1">{car.location}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Contact */}
        <div className="mt-10 p-4 z-100 md:p-6  border border-white/10 rounded-xl backdrop-blur-xl">
          <h3 className="text-xl font-medium mb-4">Contact Owner</h3>

          <p className="text-gray-300">
            <span className="text-white font-medium">Name:</span> {car.userName}
          </p>

          <p className="text-gray-300 mt-2">
            <span className="text-white font-medium">Email:</span>{" "}
            {car.userEmail}
          </p>

          <p className="text-gray-300 mt-2">
            <span className="text-white font-medium">Phone:</span> {car.phone}
          </p>

          <a
            href={`tel:${car.phone}`}
            className="mt-5 btn py-5 px-8 bg-[#ededed] text-sm text-[#111] rounded-lg font-medium cursor-pointer transition hover:bg-gray-300"
          >
            Call Now
          </a>
        </div>
      </motion.div>
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mt-6 cursor-pointer px-5 py-2 rounded-lg border border-white/10 hover:bg-white/20 transition text-white backdrop-blur-xl"
      >
        ← Back
      </button>
    </div>
  );
};

export default CarDetails;
