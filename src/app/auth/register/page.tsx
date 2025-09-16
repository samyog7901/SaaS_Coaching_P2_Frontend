"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { IRegisterData } from "./register.types"
import { registerUser, resetStatus } from "@/lib/store/auth/authSlice"

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { useRouter } from "next/navigation"
import { Status } from "@/lib/types/type"






const Register = () => {
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const {status} = useAppSelector((state)=>state.auth)
    const router = useRouter()
    const [data,setData] = useState<IRegisterData>({
        username : "",
        email : "",
        password : ""
    })

    useEffect(()=>{
      if(status === Status.SUCCESS){
        dispatch(resetStatus())
        router.push("/auth/login")
      }
    },[status])

    const handleRegisterDataChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setData({
            ...data,
            [name] : value
        })
    }
    console.log(data,"Registration data")
    const handleRegisterSubmission =(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault() 
      dispatch(registerUser(data))
      
      
      // if(status === Status.SUCCESS){
      //   console.log("User registered successfully")
      // }
    }
  return (
    <>
    <div id="page-container" className="mx-auto flex min-h-dvh w-full min-w-80 flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100">

<main id="page-content" className="flex max-w-full flex-auto flex-col">
  <div className="relative mx-auto flex min-h-dvh w-full max-w-10xl items-center justify-center overflow-hidden p-4 lg:p-8">

    <section className="w-full max-w-xl py-6">
   

   
      <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-xs dark:bg-gray-800 dark:text-gray-100">
        <div className="grow p-5 md:px-16 md:py-12">
          <form className="space-y-6" onSubmit={handleRegisterSubmission}>
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
          Welcome, please sign up a new account        </h2>
            <div className="space-y-1">
              <label htmlFor="username" className="inline-block text-sm font-medium">Username</label>
              <input type="text" id="username" name="username" onChange={handleRegisterDataChange} placeholder="Enter your username" className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500" />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="inline-block text-sm font-medium">Email</label>
              <input type="email" id="email" name="email" onChange={handleRegisterDataChange} placeholder="Enter your email" className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500" />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="inline-block text-sm font-medium">Password</label>
              <input type="password" id="password" name="password" onChange={handleRegisterDataChange} placeholder="Enter your password" className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500" />
            </div>
            <div>
           
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-6 py-3 leading-6 font-semibold text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-3 focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90">
                <svg className="hi-mini hi-arrow-uturn-right inline-block size-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z" clipRule="evenodd" />
                </svg>
                <span>Sign Up</span>
              </button>
            </div>
          </form>
        </div>
        <div className="grow bg-gray-50 p-5 text-center text-sm md:px-16 dark:bg-gray-700/50">
          Already have an account?
          <a href="/auth/login" className="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300">Sign in</a>
        </div> 
      </div>
   
    

    </section>

  </div>
</main>

</div>
    </>
    
  )
}

export default Register