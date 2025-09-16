"use client"
import React, { ChangeEvent, FormEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { IStudentPostData } from "@/lib/store/institute/student/institute-student-type"
import { createInstituteStudent } from "@/lib/store/institute/student/institute-student-slice"


interface ICloseModal {
  closeModal: () => void
}

const StudentModal: React.FC<ICloseModal> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  // const { status } = useAppSelector(store => store.institutestudent)


  const [studentData, setStudentData] = useState<IStudentPostData>({
    studentName: "",
    studentEmail: "",
    studentPhoneNumber: "",
    studentAddress: "",
    enrolledDate : "",
    studentImage : null

  })

  const handleStudentChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setStudentData({
      ...studentData,
      // @ts-ignore
      [name]: name === "studentImage" ? e.target.files?.[0] : value
    })
  }

  const handleStudentSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await dispatch(createInstituteStudent(studentData));
    
    if (success) {
      closeModal();
    }
  };

 


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Popout card */}
      <div className="relative w-96 bg-white rounded-2xl shadow-xl p-6 animate-popIn text-gray-600">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          ➕ Add student
        </h2>

        <form onSubmit={handleStudentSubmission} className="space-y-4 text-gray">
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="studentName"
              onChange={handleStudentChange}
              placeholder="student.."
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="studentEmail"
              onChange={handleStudentChange}
              placeholder="student@gmail.com"
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="text"
              name="studentPhoneNumber"
              onChange={handleStudentChange}
              placeholder="98xxxx..."
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Address</label>
            <input
              type="text"
              name="studentAddress"
              onChange={handleStudentChange}
              placeholder="KTM"
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Enrolled Date</label>
              <input
                type="date"
                name="enrolledDate"
                onChange={handleStudentChange} 
                className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none "
                required
              />
            </div>
           
       

          <div>
            <label className="text-sm font-medium text-gray-600">Student Image</label>
            <input
              type="file"
              name="studentImage"
              onChange={handleStudentChange}
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-10">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-red-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-amber-500 text-white hover:bg-green-500 shadow transition"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-popIn {
          animation: popIn 0.25s ease-out
        }
        @keyframes popIn {
          from {
            transform: scale(0.95) translateY(10px)
            opacity: 0
          }
          to {
            transform: scale(1) translateY(0)
            opacity: 1
          }
        }
      `}</style>
    </div>
  )
}

export default StudentModal
