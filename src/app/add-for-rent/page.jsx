"use client";

import { PrivateRoute } from "@/provider/PrivateRoute";
import React, { useState } from "react";
import Image from "next/image";
import { SlCloudUpload } from "react-icons/sl";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/shared/ErrorMessage";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { reload, sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";

const Page = () => {
  const [fileName, setFileName] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await reload(auth.currentUser);
    setUser(auth.currentUser);
    if (!auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser);
      toast.error(
        "A verification email has been sent. Please verify your email first!"
      );
      return;
    }

    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    const imag_Api_URL = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_HOST_KEY}`;
    // console.log("imgbb URL:", imag_Api_URL);

    axios
      .post(imag_Api_URL, formData)
      .then((res) => {
        const imageUrl = res.data.data.url;
        const carData = {
          ...data,
          image: imageUrl,
          userEmail: user.email,
          userName: user.displayName,
        };
        axiosSecure
          .post("/cars", carData)
          .then((res) => {
            toast.success("Car added successfully!");
            reset();
            setFileName("");
          })
          .catch((err) => {
            if (err.response?.status === 429) {
              toast.error(
                err.response.data.message || "You have reached your car limit!"
              );
            } else {
              toast.error("Failed to add your car for RENT");
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-black pt-20">
        {/* banner */}
        <div className="relative w-full h-60 md:h-72 lg:h-80">
          <Image
            src="https://i.pinimg.com/1200x/cf/5c/91/cf5c91b5beef1b2517276f4ea9237bd6.jpg"
            alt="Banner"
            fill
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 to-black flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
              Add Your Car for Rent
            </h1>
            <p className="text-gray-300 text-sm md:text-base mt-2 max-w-xl">
              Fill up the form below to publish your car rental listing.
            </p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="max-w-4xl mx-auto px-4 -mt-20 pb-20">
          <div className="bg-transparent border border-white/10 rounded-xl shadow-xl p-8 md:p-10 w-full backdrop-blur-lg">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Title */}
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-300">
                  Car Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Toyota Axio 2017"
                  className="input_field w-full mt-2"
                  {...register("title", {
                    required: "Car title is required",
                  })}
                />
                {errors.title && (
                  <ErrorMessage message={errors.title.message} />
                )}
              </div>

              {/* Image Upload */}
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-300">
                  Car Image
                </label>

                <label className="mt-2 flex items-center gap-3 w-full p-4 py-7 border-2 border-dashed border-white/20 bg-[#0a0a0a] rounded-lg cursor-pointer hover:border-white/50 duration-200">
                  <SlCloudUpload size={35} />

                  <span className="text-gray-400 text-sm">
                    {fileName ? fileName : "Upload car photo (JPG, PNG)"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image", {
                      required: "Car image is required",
                    })}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFileName(file.name);
                        // Update React Hook Form manually
                        register("image").onChange({
                          target: { name: "image", value: e.target.files },
                        });
                      }
                    }}
                  />
                </label>

                {errors.image && (
                  <ErrorMessage message={errors.image.message} />
                )}
              </div>

              {/* Short description */}
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-300">
                  Short Description
                </label>
                <input
                  type="text"
                  placeholder="Short overview of the car"
                  className="input_field w-full mt-2"
                  {...register("shortDescription", {
                    required: "Short description is required",
                  })}
                />
                {errors.shortDescription && (
                  <ErrorMessage message={errors.shortDescription.message} />
                )}
              </div>

              {/* Long description */}
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-300">
                  Detailed Description
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe condition, mileage, features..."
                  className="input_field w-full mt-2"
                  {...register("longDescription", {
                    required: "Detailed description is required",
                  })}
                ></textarea>
                {errors.longDescription && (
                  <ErrorMessage message={errors.longDescription.message} />
                )}
              </div>

              {/* Price */}
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Price (৳)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 3000"
                  className="input_field w-full mt-2"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be above 0" },
                  })}
                />
                {errors.price && (
                  <ErrorMessage message={errors.price.message} />
                )}
              </div>

              {/* Fuel */}
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Fuel
                </label>
                <input
                  type="text"
                  placeholder="Fuel type"
                  className="input_field w-full mt-2"
                  {...register("fuel", {
                    required: "Fuel type is required",
                  })}
                />
                {errors.fuel && <ErrorMessage message={errors.fuel.message} />}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="e.g. 017xxxxxxxx"
                  className="input_field w-full mt-2"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phone && (
                  <ErrorMessage message={errors.phone.message} />
                )}
              </div>

              {/* Brand */}
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Fuel Type
                </label>
                <select
                  defaultValue=""
                  className="select mt-2 w-full h-12.5 rounded-lg border-white/10 bg-[#0a0a0a]"
                  {...register("brand", {
                    required: "Fuel type selection is required",
                  })}
                >
                  <option value="" disabled>
                    Pick a Brand
                  </option>
                  <option>BMW</option>
                  <option>Mitsubishi</option>
                  <option>Nissan</option>
                  <option>Mercedes-Benz</option>
                  <option>Audi</option>
                </select>
                {errors.brand && (
                  <ErrorMessage message={errors.brand.message} />
                )}
              </div>

              {/* Engine */}
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Engine Capacity
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1500cc"
                  className="input_field w-full mt-2"
                  {...register("engine", {
                    required: "Engine capacity is required",
                  })}
                />
                {errors.engine && (
                  <ErrorMessage message={errors.engine.message} />
                )}
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Uttara, Dhaka"
                  className="input_field w-full mt-2"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                {errors.location && (
                  <ErrorMessage message={errors.location.message} />
                )}
              </div>

              {/* Submit */}
              <div className="col-span-2 mt-4">
                <button
                  type="submit"
                  className="w-full bg-[#ededed] text-black font-medium cursor-pointer py-3 rounded-lg 
          hover:bg-gray-300 transition "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Page;
