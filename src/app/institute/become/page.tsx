
'use client'

import { createInstitute } from "@/lib/store/institute/instituteSlice"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"

import { AppDispatch } from "@/lib/store/store"
import { IInstitute } from "@/lib/store/institute/instituteSlice.type"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/store/hooks"
import { Status } from "@/lib/types/type"
import { resetStatus } from "@/lib/store/auth/authSlice"


const becomeInstitute = () => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const [taxType, setTaxType] = useState<'VAT' | 'PAN'>('VAT')
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const {status,user} = useAppSelector((state)=>state.auth)
    const {status: instituteStatus } = useAppSelector((state) => state.institute)
    const [isSubmitting, setIsSubmitting] = useState(false)
   
    const [instituteData,setInstituteData] = useState<IInstitute>({
    instituteName: "",
    instituteEmail: "",
    institutePhoneNumber: "",
    instituteAddress: "",
    institutePanNo: "",
    instituteVatNo: ""

    })
    useEffect(()=>{
      if(instituteStatus === Status.SUCCESS){
        dispatch(resetStatus())
        if(user?.id){
          localStorage.setItem(`institute_${user.id}`,'true')
          console.log("Set user-specific institute flag")
        }
        // localStorage.setItem('isInstitute', 'true');
        window.location.reload();
        router.push('/institute/dashboard')
      }
    },[instituteStatus, user, router, dispatch])
        // Close dropdown when clicking outside
        useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
              if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                  setShowDropdown(false)
              }
          }
  
          document.addEventListener('mousedown', handleClickOutside)
          return () => document.removeEventListener('mousedown', handleClickOutside)
      }, [])

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
      const { name, value } = e.target
      
      setInstituteData({
          ...instituteData,
          [name] : value
      })
      
    }
    const handleTaxTypeChange = (type: 'VAT' | 'PAN') => {
      setTaxType(type)
      setShowDropdown(false)
    }

    const handleTaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (taxType === 'VAT') {
          setInstituteData({
              ...instituteData,
              instituteVatNo: value,
              institutePanNo: "" // Clear the other field
          })
      } else {
          setInstituteData({
              ...instituteData,
              institutePanNo: value,
              instituteVatNo: "" // Clear the other field
          })
      }
    }

    const getCurrentTaxValue = () => {
      return taxType === 'VAT' ? instituteData.instituteVatNo : instituteData.institutePanNo
    }

    const handleInstituteCreateSubmission = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsSubmitting(true)
      try{
        await dispatch(createInstitute(instituteData))
      
      }catch(error){
        console.error("Institute creation failed:", error)
      }finally{
        setIsSubmitting(false)
      }

        
    }
  return (
   <>
 <div className="container mx-auto p-4 text-gray-700">
  {/* Page Title */}
  <h1 className="text-3xl font-bold text-[black] dark:text-white mb-6">
    Create Institute
  </h1>
  <form className="grid grid-cols-1 gap-6" onSubmit={handleInstituteCreateSubmission}>
   
    <div className="p-2">
      <input
        type="text"
        id="name"
        name="instituteName"
        onChange={handleChange}
        placeholder="Institute Name"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2 placeholder-gray-700"
        style={{ backgroundColor: '#f6f6f6' }}
      />
    </div>
   
    <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <input
          type="email"
          id="institute-email"
          name="instituteEmail"
          onChange={handleChange}
          placeholder="Institute Email"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2 placeholder-gray-700"
          style={{ backgroundColor: '#f6f6f6' }}
        />
      </div>
      <div>
        <input
          type="text"
          id="institute-phonenumber"
          name="institutePhoneNumber"
          onChange={handleChange}
          placeholder="Institute Phone Number"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2 placeholder-gray-700"
          style={{ backgroundColor: '#f6f6f6' }}
        />
      </div>
    </div>

      {/* Location */}
      <div className="p-2">
      <input
        type="text"
        id="address"
        name="instituteAddress"
        onChange={handleChange}
        placeholder="Location"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2 placeholder-gray-700"
        style={{ backgroundColor: '#f6f6f6' }}
      />
    </div>
    
    {/* Combined Tax Identification Input */}
    <div className="p-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
            Tax Identification
        </label>
        <div className="relative" ref={dropdownRef}>
            <div className="flex rounded-md shadow-sm">
                {/* Dropdown segment */}
                <button
                    type="button"
                    className="px-4 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-[#8c0327] focus:border-[#8c0327]"
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{ minWidth: '100px' }}
                >
                    {taxType}
                    <span className="ml-2">▼</span>
                </button>
                {/* Input segment */}
                <input
                    type="text"
                    value={getCurrentTaxValue()}
                    onChange={handleTaxInputChange}
                    placeholder={`Enter ${taxType} number`}
                    className="flex-1 block w-full rounded-r-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2 placeholder-gray-700"
                    style={{ backgroundColor: '#f6f6f6' }}
                />
            </div>
            
            {/* Dropdown menu */}
            {showDropdown && (
                <div className="absolute z-10 mt-1 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <button
                            type="button"
                            className={`block w-full text-left px-4 py-2 text-sm ${
                                taxType === 'VAT' 
                                    ? 'bg-gray-100 text-gray-900' 
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            onClick={() => handleTaxTypeChange('VAT')}
                        >
                            VAT
                        </button>
                        <button
                            type="button"
                            className={`block w-full text-left px-4 py-2 text-sm ${
                                taxType === 'PAN' 
                                    ? 'bg-gray-100 text-gray-900' 
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            onClick={() => handleTaxTypeChange('PAN')}
                        >
                            PAN
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
                            

    {/* Registration Button */}
    <div className="col-span-full mt-6 p-2">
    <button
        type="submit"
        disabled={isSubmitting}
        className="block w-full bg-[#53d213] hover:bg-[#53a325] disabled:bg-gray-400 disabled:cursor-not-allowed hover:cursor-pointer text-amber-50 hover:text-white font-bold py-3 px-4 rounded-full transition-colors"
                    >
        {isSubmitting ? 'Creating Institute...' : 'Become Institute'}
        </button>
    </div>
  </form>
</div>


   </>
  )
}

export default becomeInstitute