"use client";

import Navbar from "@/lib/components/navbar/Navbar";
import { useAppSelector } from "@/lib/store/hooks";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarWrapper = () => {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth)


  // Determine current page
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isHomepage = pathname === "/";

  // Hide navbar on dashboard pages
  const hideNavbar = pathname.startsWith("/institute/dashboard");

  useEffect(() => {
   
    if (isHomepage || isAuthPage) {
      localStorage.removeItem("token");
    }
  }, [pathname, user]);

  return !hideNavbar ? (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar/>
    </div>
  ) : null;
};

export default NavbarWrapper;
