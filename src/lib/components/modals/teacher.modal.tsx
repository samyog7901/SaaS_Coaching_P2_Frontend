"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchInstituteCourse } from "@/lib/store/institute/course/institute-course-slice"
import { createInstituteTeacher } from "@/lib/store/institute/teacher/institute-teacher-slice"
import { ITeacherPostData } from "@/lib/store/teacher/teacherSlice.type"

interface ICloseModal {
  closeModal: () => void
}

const TeacherModal: React.FC<ICloseModal> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  // const { status } = useAppSelector(store => store.instituteTeacher)
  const { courses } = useAppSelector(store => store.course)

  const [teacherData, setTeacherData] = useState<ITeacherPostData>({
    teacherName: "",
    teacherEmail: "",
    teacherPhoneNumber: "",
    teacherExperience: "",
    teacherSalary: "",
    teacherPhoto: null,
    teacherJoinedDate: "",
    courseId: ""
  })

  const handleTeacherChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setTeacherData({
      ...teacherData,
      // @ts-ignore
      [name]: name === "teacherPhoto" ? e.target.files?.[0] : value
    })
  }

  const handleTeacherSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await dispatch(createInstituteTeacher(teacherData));
    
    if (success) {
      closeModal();
      await dispatch(fetchInstituteCourse());
      
    }
  };

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchInstituteCourse())
    }
 
  }, [courses.length, dispatch])


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
          ➕ Add teacher
        </h2>

        <form onSubmit={handleTeacherSubmission} className="space-y-4 text-gray">
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="teacherName"
              onChange={handleTeacherChange}
              placeholder="Teacher.."
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="teacherEmail"
              onChange={handleTeacherChange}
              placeholder="teacher@gmail.com"
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
              name="teacherPhoneNumber"
              onChange={handleTeacherChange}
              placeholder="98xxxx..."
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Photo</label>
            <input
              type="file"
              name="teacherPhoto"
              onChange={handleTeacherChange}
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-100">
              <label className="text-sm font-medium text-gray-600">
                Experience
              </label>
              <input
                type="text"
                name="teacherExperience"
                onChange={handleTeacherChange}
                placeholder="2+ months, years "
                className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
              />
            </div>
            <div className="w-100">
              <label className="text-sm font-medium text-gray-600">
                Joined Date
              </label>
              <input
                type="date"
                name="teacherJoinedDate"
                onChange={handleTeacherChange}
                className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Salary</label>
              <input
                type="text"
                name="teacherSalary"
                onChange={handleTeacherChange}
                placeholder="30k+"
                className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none "
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Course</label>
              <select
                name="courseId"
                onChange={handleTeacherChange}
                className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                <option value="">Select Course</option>
                {courses.length > 0 &&
                  courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.courseName}
                    </option>
                  ))}
              </select>
            </div>
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

export default TeacherModal
