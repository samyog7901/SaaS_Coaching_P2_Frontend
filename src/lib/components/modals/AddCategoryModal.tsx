"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addCategories } from "@/lib/store/institute/category/categorySlice";
import { ICategoryAddData } from "@/lib/store/institute/category/category.types";
import { Status } from "@/lib/types/type";

interface AddCategoryPopoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoryPopout: React.FC<AddCategoryPopoutProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((store) => store.category);
  const [categoryData, setCategoryData] = useState<ICategoryAddData>({
    categoryName: "",
    categoryDescription: "",
  });

  if (!isOpen) return null;

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleCategorySubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addCategories(categoryData));
    if (status === Status.SUCCESS) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Popout card */}
      <div className="relative w-96 bg-white rounded-2xl shadow-xl p-6 animate-popIn text-gray-600">
        {/* X button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">➕ Add New Category</h2>

        <form onSubmit={handleCategorySubmission} className="space-y-4 text-gray">
          {/* Category Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">Category Name</label>
            <input
              type="text"
              name="categoryName"
              onChange={handleCategoryChange}
              placeholder="Enter category name"
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            />
          </div>

          {/* Category Description */}
          <div>
            <label className="text-sm font-medium text-gray-600">Description</label>
            <textarea
              name="categoryDescription"
              onChange={handleCategoryChange}
              placeholder="Enter description"
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
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

export default AddCategoryPopout;
