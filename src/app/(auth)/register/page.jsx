"use client";
import ErrorMessage from "@/components/shared/ErrorMessage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import useAuth from "@/hooks/useAuth";

export default function Page() {
  const { createUser, loading, setUser, setLoading, googleSignIn } = useAuth();
  const [firebaseError, setFirebaseError] = useState("");
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handle register
  const handleRegister = async (data) => {
    setFirebaseError("");
    try {
      await createUser(data.email, data.password).then((res) => {
        setUser(res.user);
        toast.success("Created User Successfully");
        route.push("/");
        window.scrollTo(0, 0);
      });
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/email-already-in-use") {
        setFirebaseError("Email already in use");
      } else if (err.code === "auth/invalid-email") {
        setFirebaseError("Invalid email address");
      } else {
        setFirebaseError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  //handle google
  const handleGoogleSignin = () => {
    setFirebaseError("");
    try {
      googleSignIn().then((res) => {
        route.push("/");
        window.scrollTo(0, 0);
        setUser(res.user);
        toast.success("Logged in successfully");
      });
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row  py-20 justify-center items-center min-h-screen px-4 bg-black mt-20 max-w-[1200px] mx-auto">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full lg:w-1/2 max-w-md bg-[#0a0a0a] border border-white/5 rounded-xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Create an Account
        </h2>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-5"
        >
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input_field"
              placeholder="Enter your email"
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                  message:
                    "Password must include at least one uppercase and one lowercase letter",
                },
              })}
              className="input_field"
              placeholder="Enter your password"
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
            {firebaseError && <ErrorMessage message={firebaseError} />}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#ededed] text-black font-medium cursor-pointer py-3 rounded-lg 
          hover:bg-gray-300 transition disabled:opacity-50`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="divider my-6">or</div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignin}
          className="btn btn-outline py-6 w-full border-white/10 hover:bg-base-300/50 flex items-center gap-2 justify-center"
        >
          <FcGoogle size={22} />
          Login with Google
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?
          <Link
            href="/login"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            className="text-gray-200 hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 70, y: -25, scale: 0.7 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-full lg:w-1/2 flex justify-center lg:justify-end"
      >
        <Image
          width={400}
          height={100}
          alt="Car"
          src="https://i.pinimg.com/1200x/b4/6c/8e/b46c8e064f44ccb8cfc5f760550aa716.jpg"
          className="rounded-xl shadow-lg w-full "
        />
      </motion.div>
    </div>
  );
}
