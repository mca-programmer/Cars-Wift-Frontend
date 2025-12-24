"use client";
import React from "react";
import {
  FaCarSide,
  FaPhoneAlt,
  FaCheckCircle,
  FaClipboardList,
} from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="pt-20 pb-24 max-w-[1332px] mx-auto px-4 text-white">
      {/* Title */}
      <div className="flex flex-col items-center">
        <h2 className="section_heading text-center">How It Works</h2>
        <p className="section_paragraph mt-4 text-center max-w-2xl">
          Renting a car is now easier than ever. Follow these simple steps to
          explore, rent, or list your own vehicle.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-18">
        {/* Step 1 */}
        <div
          className={`bg-black border border-white/10 rounded-xl p-7 text-center 
                        hover:border-white/30 transition duration-300`}
        >
          <FaCarSide size={40} className="mx-auto text-gray-300" />
          <h3 className="text-xl font-semibold mt-5">Browse Cars</h3>
          <p className="text-gray-400 text-sm mt-3">
            Explore a wide range of verified rental cars near you.
          </p>
        </div>

        {/* Step 2 */}
        <div
          className={`bg-black border border-white/10 rounded-xl p-7 text-center
                        hover:border-white/30 transition duration-300`}
        >
          <FaPhoneAlt size={40} className="mx-auto text-gray-300" />
          <h3 className="text-xl font-semibold mt-5">Contact Owner</h3>
          <p className="text-gray-400 text-sm mt-3">
            Easily contact the car owner for details, availability, or booking.
          </p>
        </div>

        {/* Step 3 */}
        <div
          className={`bg-black border border-white/10 rounded-xl p-7 text-center
                        hover:border-white/30 transition duration-300`}
        >
          <FaCheckCircle size={40} className="mx-auto text-gray-300" />
          <h3 className="text-xl font-semibold mt-5">Rent the Car</h3>
          <p className="text-gray-400 text-sm mt-3">
            Finalize your agreement and enjoy a smooth, hassle-free ride.
          </p>
        </div>

        {/* Step 4 */}
        <div
          className={`bg-black border border-white/10 rounded-xl p-7 text-center
                        hover:border-white/30 transition duration-300`}
        >
          <FaClipboardList size={40} className="mx-auto text-gray-300" />
          <h3 className="text-xl font-semibold mt-5">List Your Car</h3>
          <p className="text-gray-400 text-sm mt-3">
            Have a car? Upload details and start earning by renting it out.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
