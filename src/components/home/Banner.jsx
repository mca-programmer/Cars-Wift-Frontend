"use client";
import React from "react";
import AnimatedText from "./AnimatedText";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import Button from "../shared/Button";
import ThreeDRotation from "./ThreeDRotation";
import dynamic from "next/dynamic";

const Banner = () => {
  const AnimatedText = dynamic(() => import("./AnimatedText"), { ssr: false });
  const Button = dynamic(() => import("../shared/Button"), { ssr: false });

  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, 1000]);

  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      />
      <section className="pt-40 pb-20 px-4 flex flex-col items-center justify-center bg-[#000000] overflow-hidden z-10">
        {/* Animated Div */}
        <motion.div
          className="z-10"
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <AnimatedText />
        </motion.div>

        {/* Animated H1 */}
        <motion.h1
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          <ThreeDRotation text="Rent Your Dream Car" />
        </motion.h1>

        {/* Animated Paragraph */}
        <motion.p
          className="text-center z-20 text-white/90 max-w-2xl mt-4"
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
        >
          Discover a seamless way to rent premium cars at the best prices.
          Whether a weekend getaway, a business trip, or your daily commute.
        </motion.p>

        {/* Animated Button */}
        <motion.div
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
          className="mt-10 mb-10 z-20"
        >
          <Link href="/all-cars">
            <Button />
          </Link>
        </motion.div>

        {/* Animated Figure */}
        <motion.figure
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ x }}
          className="z-20"
        >
          <Image
            src="/assets/banner_car.jpg"
            alt="Banner"
            width={900}
            height={910}
            className="rounded-xl shadow-lg"
          />
        </motion.figure>
      </section>
    </div>
  );
};

export default Banner;
