"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "John Anderson",
    role: "Business Owner",
    text: "The renting process was smooth and fast. Highly recommend this service to anyone!",
    image:
      "https://i.pinimg.com/736x/d1/4a/d7/d14ad724e349523a50168806804a8f9b.jpg",
  },
  {
    name: "Sarah Lee",
    role: "Traveler",
    text: "Amazing experience! The car was clean, comfortable, and affordable.",
    image:
      "https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg",
  },
  {
    name: "Michael Brown",
    role: "Entrepreneur",
    text: "Great platform with excellent customer support. Will use again!",
    image:
      "https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg",
  },
  {
    name: "Emily Carter",
    role: "Designer",
    text: "Loved the service! Easy booking and a great variety of cars.",
    image:
      "https://i.pinimg.com/736x/68/4c/b6/684cb636cf67568ed031a5fee627c8a5.jpg",
  },
];

const Testimonial = () => {
  return (
    <div className="py-20 overflow-hidden">
      {/* Title */}
      <div className="flex flex-col items-center">
        <h2 className="section_heading text-center">What Our Client Says</h2>
        <p className="section_paragraph mt-4 text-center max-w-2xl text-lg text-gray-300">
          Renting a car is now easier than ever. See what our users say about
          their experience with Cars Wift
        </p>
      </div>

      <div className="relative max-w-[1332px] mx-auto mt-12 overflow-hidden rounded-2xl">
        <div className="absolute left-0 top-0 h-full w-24 bg-linear-to-r from-[#121212] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 h-full w-24 bg-linear-to-l from-[#121212] to-transparent z-20 pointer-events-none"></div>

        <Marquee speed={35} gradient={false}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="
            w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px]
            mx-4 p-6 bg-[#181818] border border-gray-700/40 
            rounded-2xl shadow-lg hover:shadow-2xl transition shadow-black/20
          "
            >
              {/* Stars */}
              <div className="flex text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FaStar key={s} />
                ))}
              </div>

              <p className="mb-6 text-gray-300 text-base leading-relaxed">
                “{t.text}”
              </p>

              <div className="h-px bg-gray-700/40 my-6"></div>

              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg text-white">{t.name}</h3>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Testimonial;
