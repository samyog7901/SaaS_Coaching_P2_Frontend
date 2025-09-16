"use client"
import { resetStatus } from "@/lib/store/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface NavbarProps {
  showCategories?: boolean;
}

const Navbar = ({showCategories}: NavbarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const { user } = useAppSelector((state) => state.auth)
  const [userName, setUserName] = useState("Guest")
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isHomepage = typeof window !== "undefined" ? window.location.pathname : "/"

  useEffect(() => {
    if (user?.username) setUserName(user?.username)
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token || !!user?.token)
  }, [user])

  // const handleLogout = () => {
  //   localStorage.removeItem("token")
  //   localStorage.removeItem("userInstitute")
  //   setIsLoggedIn(false)
  //   dispatch(resetStatus())
  //   router.push("/auth/login")
  // }

  return (
    <header className="w-full px-6 py-4 bg-white shadow-sm dark:bg-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">
             EdTech SaaS
          </h1>
        </div>

        {/* Navigation Links - Show only when not logged in */}
        {!isLoggedIn && (
          <nav className="hidden md:flex gap-8 text-gray-700 dark:text-gray-200">
            <a href="#features" className="hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#about" className="hover:text-blue-600 transition-colors">
              About
            </a>
          </nav>
        )}

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          { isHomepage && (
            <>
              <a
                href="/auth/login"
                className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                Login
              </a>
              <a
                href="/auth/register"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </a>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation - Show only when not logged in */}
      {!isLoggedIn && (
        <nav className="md:hidden mt-4 flex justify-center gap-6 text-gray-700 dark:text-gray-200">
          <a href="#features" className="hover:text-blue-600 transition-colors text-sm">
            Features
          </a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors text-sm">
            Pricing
          </a>
          <a href="#about" className="hover:text-blue-600 transition-colors text-sm">
            About
          </a>
        </nav>
      )}
    </header>
  )
}

export default Navbar