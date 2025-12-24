"use client";
import React from "react";
import Marquee from "react-fast-marquee";

const logos = [
  "/assets/lemonsqueezy1.png",
  "/assets/nike1.png",
  "/assets/laravel1.png",
  "/assets/lilly1.png",
  "/assets/column1.png",
  "/assets/nvidia1.png",
  "/assets/openai.png",
];

const ClientLogo = ({direction}) => {
  return (
    <div className="max-w-[1132px] mx-auto flex flex-col md:flex-row items-center md:items-center pb-24 -mt-10 z-300 overflow-hidden px-4 gap-7">
      {/* Left */}
      <div className="flex  items-center">
        <h3 className="text-white z-1000 text-[13px]/6 text-right font-light md:border-r border-white/20 md:pr-7">
          Our Trusted Partners
        </h3>
      </div>

      {/* Right */}
      <div className="w-full">
        <Marquee speed={50} direction={direction}>
          {logos.map((logo, i) => (
            <div key={i} className="flex items-center justify-center px-8 py-4">
              <img
                src={logo}
                alt={`Partner ${i + 1}`}
                className=" object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default ClientLogo;
