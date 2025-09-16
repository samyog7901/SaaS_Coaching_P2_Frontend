"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Status } from "@/lib/types/type";
import { createInstituteCourse } from "@/lib/store/institute/course/institute-course-slice";
import { fetchCategories } from "@/lib/store/institute/category/categorySlice";
import { ICoursePostData } from "@/lib/store/institute/course/institute-course-type";

interface ICloseModal {
  closeModal: () => void;
}

const courseLevel = ["Beginner", "Intermediate", "Advance"];

const CourseModal: React.FC<ICloseModal> = ({ closeModal }) => {
  const dispatch = useAppDispatch();

  const { status, data } = useAppSelector((store) => store.category);
  // const { courses } = useAppSelector((store) => store.course);

  const [courseData, setCourseData] = useState<ICoursePostData>({
    courseName: "",
    coursePrice: "",
    courseDescription: "",
    courseDuration: "",
    courseThumbnail: null,
    courseLevel: "",
    categoryId: "",
    teacherId : ""
  });

  // Generic handler for text/textarea
  const handleCourseChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCourseData(() => ({
      ...courseData,
      //@ts-ignore
      [name]: name === "courseThumbnail" ? e.target.files?.[0] : value
    }));
  };



  

  const handleCourseSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
      await dispatch(createInstituteCourse(courseData))
       if(status === Status.SUCCESS){
        closeModal()
       }
  }

  useEffect(() => {
    // dispatch(fetchInstituteCourse())
    if (data.length === 0) {
      dispatch(fetchCategories());
    }
  },[])

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

        <h2 className="text-lg font-semibold text-gray-800 mb-4">➕ Add course</h2>

        <form onSubmit={handleCourseSubmission} className="space-y-4 text-gray">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Course Name
            </label>
            <input
              type="text"
              name="courseName"
              onChange={handleCourseChange}
              placeholder="Python, MERN.."
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Course Price
            </label>
            <input
              type="text"
              name="coursePrice"
              onChange={handleCourseChange}
              placeholder="Rs.999/-"
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Course Level
            </label>
            <select
              name="courseLevel"
              onChange={handleCourseChange}
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            >
             
              {courseLevel.map((cl) => {
                return(
                  <option key={cl} value={cl}>
                  {cl}
                </option>
                )
              })}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm font-medium text-gray-600">
                Course Category
              </label>
              <select
                name="categoryId"
                onChange={handleCourseChange}
                className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
              >
                <option value="">Select category</option>
                {data.length > 0 && data.map((category) => {return(
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                )})}
              </select>
            </div>

            <div className="w-1/2">
              <label className="text-sm font-medium text-gray-600">
                Course Duration
              </label>
              <input
                type="text"
                name="courseDuration"
                onChange={handleCourseChange}
                placeholder="e.g. 3 months"
                className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Course Thumbnail
            </label>
            <input
              type="file"
              name="courseThumbnail"
              accept="image/*"
              onChange={handleCourseChange}
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Course Description
            </label>
            <textarea
              name="courseDescription"
              onChange={handleCourseChange}
              placeholder="Enter description"
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              rows={3}
              required
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
          animation: popIn 0.25s ease-out;
        }
        @keyframes popIn {
          from {
            transform: scale(0.95) translateY(10px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CourseModal;
