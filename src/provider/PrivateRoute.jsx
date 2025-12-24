"use client";

import Loader from "@/components/shared/Loader";
import useAuth from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      localStorage.setItem("redirectPath", pathname); // save path
      router.push("/login"); // just go to login page
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!user) return null;

  return children;
}
