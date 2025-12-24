"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="mt-20 md:mt-10 pb-20 flex flex-col items-center justify-center min-h-screen bg-black px-4 text-center">
      
      {/* Image */}
      <div className="mb-8 w-full max-w-md">
        <Image
          src="https://i.pinimg.com/736x/9a/96/41/9a96412268b77bb6e87e9d429ecc5c56.jpg" // replace with your own image if needed
          alt="Page Not Found"
          width={400}
          height={300}
          className="mx-auto"
        />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold text-white -mt-10 mb-4">Page Not Found</h1>

      {/* Paragraph */}
      <p className="text-gray-300 mb-6 max-w-md">
        Sorry, the page you are looking for does not exist. You can go back to the homepage.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="px-6 py-2.5 bg-[#ededed] text-black font-medium rounded-lg hover:bg-gray-300 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
