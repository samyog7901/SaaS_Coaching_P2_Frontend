"use client"
import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { resetStatus } from '@/lib/store/auth/authSlice'
import { useRouter, usePathname } from 'next/navigation'
import { fetchInstitutes } from '@/lib/store/institute/instituteSlice'

const Dashboard = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()
    const { user } = useAppSelector((store) => store.auth)
    const {institute,currentInstitute} = useAppSelector((store)=>store.institute)
   

    const handleLogout = () => {
        localStorage.removeItem("token")
        dispatch(resetStatus())
        router.push("/auth/login")
    }

    const titleMap: Record<string, string> = {
        '/institute/dashboard': 'Dashboard',
        '/institute/dashboard/categories': 'Categories',
        '/institute/dashboard/student': 'Students',
        '/institute/dashboard/teacher': 'Teachers',
        '/institute/dashboard/course': 'Courses'
    }
    useEffect(()=>{
        dispatch(fetchInstitutes())
    },[dispatch])

    const title = titleMap[pathname] || 'Dashboard'
    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar */}
                <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-md flex flex-col">
                    <div className="p-4 border-b">
                        <div className="flex items-center">
                            <img
                                src="https://tailwindflex.com/images/logo.svg"
                                alt="Logo"
                                className="h-8 w-auto"
                            />
                            <span className="ml-2 text-xl font-semibold text-gray-800">
                                {currentInstitute?.instituteName}
                            </span>
                        </div>
                    </div>
                    <Sidebar />
                    <div className="mt-auto p-4 border-t">
                        <div className="flex items-center">
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?..."
                                alt="User"
                            />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">
                                    {/* {user?.username || "Guest"} */}
                                    {currentInstitute?.instituteName}
                                </p>
                                <button onClick={handleLogout}>
                                    <p className="text-xs font-medium hover:text-red-500 text-gray-600 cursor-pointer">
                                        Log Out
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 p-6 bg-gray-100 overflow-y-auto">
                    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                    <div className="mt-4 p-6 bg-white rounded-lg shadow-md">{children}</div>
                </main>
            </div>

        </>
    )
}

export default Dashboard