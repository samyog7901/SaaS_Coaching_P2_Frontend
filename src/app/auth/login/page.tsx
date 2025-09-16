"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ILoginData } from "./login.types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { loginUser, resetStatus } from "@/lib/store/auth/authSlice";
import { useRouter } from "next/navigation";
import { Status } from "@/lib/types/type";





const Login = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {user} = useAppSelector((store)=>store.auth)//subscribe gare jastai ho , initialState ma change hune bittikai state ma naya data change garxa ,sync vayo
  const {status} = useAppSelector((state)=>state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<ILoginData>({
    email: "",
    password: ""
  });
  
  
  useEffect(() => {
    if (status === Status.SUCCESS) {
      dispatch(resetStatus())
      router.push("/institute/dashboard")
    }
  }, [status, router])

  const handleLoginDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value
    })
  }
  // Clean up any existing general institute flags on login
useEffect(() => {
  if (user?.id) {
    // Remove the general flag that causes issues
    localStorage.removeItem('isInstitute');
    
    // Check if user-specific flag exists
    const userInstituteStatus = localStorage.getItem(`institute_${user.id}`);
    if (userInstituteStatus === 'true') {
      // User is legitimately an institute
      console.log("User is a valid institute member");
    }
  }
}, [user]);

  const handleLoginSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try{
      await dispatch(loginUser(data))   
    }catch(error){
      console.error("Login failed:", error)
    }finally{
      setIsLoading(false)
    }
  }

  return (
<div id="page-container" className="mx-auto flex min-h-dvh w-full min-w-80 flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100">

  <main id="page-content" className="flex max-w-full flex-auto flex-col">
    <div className="relative mx-auto flex min-h-dvh w-full max-w-10xl items-center justify-center overflow-hidden p-4 lg:p-8">
  
      <section className="w-full max-w-xl py-6">
     
        <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-xs dark:bg-gray-800 dark:text-gray-100">
          <div className="grow p-5 md:px-16 md:py-12">
            <form className="space-y-6" onSubmit={handleLoginSubmission}>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
            Welcome, please sign in to your dashboard
          </h2>
              <div className="space-y-1">
                <label htmlFor="email" className="inline-block text-sm font-medium">Email</label>
                <input type="email" id="email" name="email" value={data.email} onChange={handleLoginDataChange} placeholder="Enter your email" className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500" />
              </div>
              <div className="space-y-1">
                <label htmlFor="password" className="inline-block text-sm font-medium">Password</label>
                <input type="password" id="password" name="password" value={data.password} onChange={handleLoginDataChange} placeholder="Enter your password" className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500" />
              </div>
              <div>
                <div className="mb-5 flex items-center justify-between gap-2">
                  <label className="flex items-center">
                    <input type="checkbox" id="remember_me" name="remember_me" className="size-4 rounded-sm border border-gray-200 text-blue-500 checked:border-blue-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900 dark:checked:border-transparent dark:checked:bg-blue-500 dark:focus:border-blue-500" />
                    <span className="ml-2 text-sm">Remember me</span>
                  </label>
                  <a href="javascript:void(0)" className="inline-block text-sm font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300">Forgot Password?</a>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-6 py-3 leading-6 font-semibold text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-3 focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    // Loading state
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    // Normal state
                    <>
                      <svg className="hi-mini hi-arrow-uturn-right inline-block size-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z" clipRule="evenodd" />
                      </svg>
                      <span>Sign In</span>
                    </>
                  )}
                </button>
                
        
                <div className="my-5 flex items-center">
                  <span aria-hidden="true" className="h-0.5 grow rounded-sm bg-gray-100 dark:bg-gray-700/75" />
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">or sign in with</span>
                  <span aria-hidden="true" className="h-0.5 grow rounded-sm bg-gray-100 dark:bg-gray-700/75" />
                </div>
           
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm leading-5 font-semibold text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-xs focus:ring-3 focus:ring-gray-300/25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600/40 dark:active:border-gray-700">
                    <svg className="bi bi-facebook inline-block size-4 text-[#1877f2]" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                    <span>Facebook</span>
                  </button>
                  <button   type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:shadow-none transition dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                  {/* Google Logo */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                    className="w-5 h-5"
                  >
                    <path
                      fill="#4285F4"
                      d="M488 261.8c0-17.5-1.5-34.1-4.3-50.4H249v95.4h135.8c-5.9 31.9-23.4 58.9-49.6 76.9l80.1 62c46.8-43.2 72.7-106.8 72.7-183.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M249 492c66.5 0 122.2-22.1 162.9-59.9l-80.1-62c-22.3 15-50.8 23.7-82.8 23.7-63.7 0-117.7-43-137.1-100.7H28.6v63.6C69.6 443.5 153.6 492 249 492z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M111.9 293.1c-4.8-14.3-7.6-29.6-7.6-45.1s2.8-30.8 7.6-45.1v-63.6H28.6C10.3 175.1 0 210.2 0 248s10.3 72.9 28.6 108.7l83.3-63.6z"
                    />
                    <path
                      fill="#EA4335"
                      d="M249 97.9c36.1 0 68.5 12.5 94.1 37l70.5-70.5C371.2 24.7 315.5 0 249 0 153.6 0 69.6 48.5 28.6 139.3l83.3 63.6c19.4-57.7 73.4-100.7 137.1-100.7z"
                    />
                  </svg>

                  <span>Continue with Google</span>
                </button>
                </div>
              </div>
            </form>
          </div>
          <div className="grow bg-gray-50 p-5 text-center text-sm md:px-16 dark:bg-gray-700/50">
            Don’t have an account yet?
            <a href="/auth/register" className="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300">Sign up</a>
          </div>
        </div>
     
       
      </section>
 
    </div>
  </main>

</div>
)}



export default Login;
