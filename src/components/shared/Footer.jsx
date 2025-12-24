"use client";

import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  const link_style = `link-hover hover:text-[#ededed] duration-200`;

  const social_style = `flex items-center justify-center w-10 h-10 rounded-full bg-[#666666] text-[#ededed] hover:bg-[#ededed] hover:text-[#666666] transition-all duration-300 hover:-translate-y-1 hover:scale-110`;

  return (
    <footer className="bg-[#000000] border-t border-white/5 text-[#666666]">
      <div className="footer sm:footer-horizontal py-10 max-w-[1332] mx-auto px-4">
        {/* Left Section */}
        <aside>
          <Link href="/" className="text-2xl font-bold tracking-wide">
            <Image
              src="/assets/footer_logo.png"
              alt="CarsWift Logo"
              width={120}
              height={40}
            />
          </Link>
          <p className="max-w-xs mt-2 text-[#666666]">
            Rent cars easily and quickly. Discover available cars in your city
            and book them instantly.
          </p>
        </aside>

        {/* Quick Links */}
        <div>
          <h6 className=" text-[#ededed]">Quick Links</h6>
          <Link href="/" className={link_style}>
            Home
          </Link>
          <Link href="/about-us" className={link_style}>
            About Us
          </Link>
          <Link href="/faq" className={link_style}>
            FAQ
          </Link>
          <Link href="/login" className={link_style}>
            Login
          </Link>
          <Link href="/register" className={link_style}>
            Register
          </Link>
        </div>

        {/* Services */}
        <div>
          <h6 className=" text-[#ededed]">Services</h6>
          <Link href="/all-cars" className={link_style}>
            All Cars
          </Link>
          <Link href="/add-for-rent" className={link_style}>
            Add For Rent
          </Link>
          <Link href="/my-cars" className={link_style}>
            My Cars
          </Link>
        </div>

        {/* Contact & Social */}
        <div>
          <h6 className=" text-[#ededed]">Contact & Social</h6>

          {/* Contact Info */}
          <div className="space-y-2 text-sm text-[#666666]">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#666666]" /> Sylhet, Bangladesh
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#666666]" /> +880 1701378952
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-[#666666]" /> musarrafhosen52@gmail.com
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.facebook.com/profile.php?id=100095485868640"
              target="_blank"
              rel="noopener noreferrer"
              className={social_style}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/in/md-musarraf-hosen/"
              target="_blank"
              rel="noopener noreferrer"
              className={social_style}
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/mca-programmer"
              target="_blank"
              rel="noopener noreferrer"
              className={social_style}
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 py-4 text-center text-sm text-[#666666]">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-[#ededed]">CarsWift</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
