import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

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

const MyCarCard = ({ car }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/cars/${car._id}`);
          queryClient.invalidateQueries(["my-cars"]);
          Swal.fire("Deleted!", "Your car has been removed.", "success");
        } catch {
          Swal.fire("Error!", "Failed to delete the car.", "error");
        }
      }
    });
  };

  return (
    <div className="bg-[#0a0a0a] text-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition flex flex-col border border-white/10">
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={car.image}
          alt={car.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="flex items-center gap-4 mb-3">
          <Image
            src={brandLogos[car.brand]}
            alt={car.brand}
            width={48}
            height={48}
            className="p-2 border rounded-full border-white/10 object-contain"
          />
          <div>
            <h3 className="text-lg font-bold">{car.title}</h3>
            <p className="text-gray-300 text-sm">{car.brand}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Link
            href={`/car-details/${car._id}`}
            className="flex-1 py-2 flex justify-center items-center gap-2 bg-[#ededed] text-[#111] rounded-lg font-medium hover:bg-gray-300 duration-200"
          >
            <AiOutlineEye size={20} />
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 py-2 flex justify-center items-center gap-2 bg-red-500/30 text-red-400 rounded-lg font-medium hover:bg-red-700/60 cursor-pointer duration-200"
          >
            <AiOutlineDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCarCard;
