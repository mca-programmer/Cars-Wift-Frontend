import WhyChooseUs from "@/components/about_us/WhyChooseUs";
import ClientLogo from "@/components/home/ClientLogo";
import Testimonial from "@/components/home/Testimonial";
import React from "react";

const page = () => {
  return (
    <div className="min-h-[90vh] w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      />
      {/* Content */}
      <div className="relative z-10 pb-24 ">
        <div className="flex flex-col bg-[#11142009] backdrop-blur-2xl border-b border-white/5 items-center mb-12 pt-36 md:pt-44 pb-16 md:pb-24 ">
          <h2 className="section_heading text-center">About Us</h2>
        </div>

        <Testimonial />
        <ClientLogo direction={"right"} />
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default page;
