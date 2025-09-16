import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse, IInitialCourseData } from "./courseSlice.type";
import { Status } from "@/lib/types/type";


const initialState:IInitialCourseData = {
    course : {
        courseName: "",
        courseDescription: "",
        courseDuration: "",
        coursePrice: 0
    },
    status : Status.LOADING
}

const courseSlice =createSlice({
    name : "course",
    initialState : initialState,
    reducers : {
        setCourse(state:IInitialCourseData,action:PayloadAction<ICourse>){
            state.course = action.payload
        },
        setStatus(state:IInitialCourseData,action:PayloadAction<Status>){
            state.status = action.payload
        }
    }
})

export const {setCourse, setStatus} = courseSlice.actions
export default courseSlice.reducer

// export function fetchCourses(){
//     return async fetchCoursesThunk()
// }
