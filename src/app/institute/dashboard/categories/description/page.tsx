import { useState } from "react"
import { ICategoryData } from "@/lib/store/institute/category/category.types"
import { useAppDispatch } from "@/lib/store/hooks"
// import { useAppDispatch } from "@/lib/store/hooks"
// import { updateCategory } from "@/lib/store/institute/category/category.slice"

const CategoryDescriptionPopup = ({ category }: { category: ICategoryData }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newDescription, setNewDescription] = useState(category.categoryDescription || "")

  const dispatch = useAppDispatch()

  const handleSave = () => {
    // 👉 Call Redux or API update here
    // dispatch(updateCategory({ id: category.id, categoryDescription: newDescription }))
    console.log("Updated description:", newDescription)

    setIsEditing(false)
    setShowPopup(false)
  }

  return (
    <div className="relative inline-block">
      {/* Preview text */}
      <p
        onClick={() => setShowPopup(!showPopup)}
        className="text-sm font-medium text-gray-900 cursor-pointer hover:text-amber-600"
      >
        {category.categoryDescription
          ? category.categoryDescription.substring(0, 40) + "..."
          : "—"}
      </p>

      {showPopup && (
        <div className="absolute left-0 mt-2 w-72 p-4 bg-white border rounded-lg shadow-lg z-50">
          <h4 className="font-semibold text-amber-600">{category.categoryName}</h4>

          {/* Editable description */}
          {isEditing ? (
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md text-sm text-gray-700"
              rows={4}
            />
          ) : (
            <p className="text-gray-700 text-sm mt-2">{newDescription}</p>
          )}

          <div className="flex justify-end gap-2 mt-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-gray-500 px-2 py-1 hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="text-xs text-white bg-amber-500 px-3 py-1 rounded hover:bg-amber-600"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-amber-600 px-2 py-1 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-xs text-white bg-gray-500 px-3 py-1 rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryDescriptionPopup
