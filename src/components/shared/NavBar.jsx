"use client";

import { useState } from "react";
import Link from "next/link";
import LoginBtn from "../shared/LoginBtn";
import Image from "next/image";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";
import useAuth from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import Loader from "./Loader";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, logOut, setUser, loading } = useAuth();
  // console.log(user);

  const links = [
    { name: "Home", href: "/" },
    { name: "All Cars", href: "/all-cars" },
    { name: "About Us", href: "/about-us" },
    { name: "FAQ", href: "/faq" },
  ];

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful");
        setUser(null);
      })
      .catch((err) => console.log(err));
  };

  const LoginBtn = dynamic(() => import("../shared/LoginBtn"), { ssr: false });

  return (
    <nav className="fixed py-2   md:border-b border-white/5 top-0 left-0 w-full md:backdrop-blur-lg shadow-sm z-50">
      <div className="relative flex items-center h-16 max-w-12/11 mx-auto px-4 lg:px-8 ">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide z-10">
          <Image
            src="/assets/logo_new.png"
            alt="CarsWift Logo"
            width={120}
            height={40}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-[#666666] text-[14px] font-medium absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`transition-colors hover:text-[#ededed] ${
                  pathname === item.href ? "text-[#ededed]" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}

        <div className="hidden md:flex gap-3 ml-auto z-10">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full overflow-hidden">
                  {user.photoURL ? (
                    <img alt="User Avatar" src={user.photoURL} />
                  ) : (
                    <FaCircleUser className="w-full h-full text-gray-300" />
                  )}
                </div>
              </div>
              <div
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-[#111] rounded-xl shadow-lg mt-3 p-3 w-38 border border-white/10"
              >
                <Link
                  href="/add-for-rent"
                  className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-white/10 hover:text-white transition"
                >
                  Add For Rent
                </Link>
                <Link
                  href="/my-cars"
                  className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-white/10 hover:text-white transition"
                >
                  My Cars
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link className="z-100" href="/login">
                <LoginBtn />
              </Link>
              <Link
                href="/register"
                className="btn hover:bg-gray-300 duration-300 bg-[#ededed] text-sm text-[#191919] rounded-lg font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center cursor-pointer ml-auto z-10"
          onClick={() => setOpen(true)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Slide-Over Menu */}
      {open && (
        <div
          className="fixed inset-0 bg-[#2f2f2f4b]  z-50 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute left-0 top-0 w-72 h-full bg-[#0a0a0a] shadow-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="mb-8 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Mobile Links */}
            <ul className="flex flex-col gap-6 text-base font-medium">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition-colors ${
                      pathname === item.href
                        ? "text-[#ededed]"
                        : "text-[#666666]"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {user && (
                <>
                  <li>
                    {" "}
                    <Link
                      href="/add-for-rent"
                      className={`transition-colors ${
                        pathname === "add-for-rent"
                          ? "text-[#ededed]"
                          : "text-[#666666]"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      Add For Rent
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      href="/my-cars"
                      className={`transition-colors ${
                        pathname === "add-for-rent"
                          ? "text-[#ededed]"
                          : "text-[#666666]"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      My Cars
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* Mobile Buttons */}
            <div className="mt-10 flex flex-col gap-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-[#ededed] text-black font-medium! rounded-md text-center"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 border rounded-md text-center"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 bg-[#ededed] text-black font-medium! rounded-md text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
