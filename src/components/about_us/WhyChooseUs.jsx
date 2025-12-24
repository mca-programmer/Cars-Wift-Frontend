"use client";
import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const jumpAnimation = {
    y: [2, -8, 2],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  };

  return (
    <div>
      <div className="mt-16 max-w-[1200px] mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
          Why Choose CarsWift
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center bg-[#111] p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <motion.img
              src="https://img.icons8.com/color/48/event-accepted.png"
              alt="Fast Booking"
              className="w-16 h-16 mb-4"
              animate={jumpAnimation}
            />
            <h4 className="text-xl mt-2 font-semibold text-white mb-2">
              Fast Booking
            </h4>
            <p className="text-gray-400 text-sm">
              Book your ride instantly with our seamless and quick booking
              system.
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-[#111] p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <motion.img
              src="https://img.icons8.com/arcade/64/good-quality.png"
              className="w-16 h-16 mb-4"
              animate={jumpAnimation}
              transition={{ ...jumpAnimation.transition, delay: 0.2 }}
            />
            <h4 className="text-xl font-semibold text-white mb-2">
              Top Quality Cars
            </h4>
            <p className="text-gray-400 text-sm">
              All our vehicles are maintained to the highest standards for a
              safe journey.
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-[#111] p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <motion.img
              src="https://img.icons8.com/bubbles/100/headset.png"
              className="w-16 h-16 mb-4"
              animate={jumpAnimation}
              transition={{ ...jumpAnimation.transition, delay: 0.4 }}
            />
            <h4 className="text-xl font-semibold text-white mb-2">
              24/7 Support
            </h4>
            <p className="text-gray-400 text-sm">
              Our dedicated support team is always ready to assist you anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
