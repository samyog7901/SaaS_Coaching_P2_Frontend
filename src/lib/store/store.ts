import { configureStore } from "@reduxjs/toolkit"

import studentSlice from "./student/studentSlice"
import teacherSlice from "../store/teacher/teacherSlice"
import authSlice from "./auth/authSlice"
import instituteSlice from "./institute/instituteSlice"
import categorySlice  from "./institute/category/categorySlice"
import instituteCourseSlice  from "./institute/course/institute-course-slice"
import instituteTeacherSlice from "./institute/teacher/institute-teacher-slice"
import instituteStudentSlice from "./institute/student/institute-student-slice"



const store = configureStore({
    reducer : {
        auth : authSlice,
        student : studentSlice,
        teacher : teacherSlice,
        institute : instituteSlice,
        category : categorySlice,
        course : instituteCourseSlice,
        instituteTeacher : instituteTeacherSlice,
        instituteStudent : instituteStudentSlice
        
        
    }
})

export default store

//dispatch ko type : paxi kaam lagx aahamilai
export type AppDispatch = typeof store.dispatch //useDispatch lai type dina chainxa
export type RootState = ReturnType<typeof store.getState>// useSelectorlai type dina chainxa

// react-redux -- package
// next - reduxToolkit

// diff hooks provide garxa (useSelector()--> fetch data, useDispatch()-->insert and modify data) , inarulai hamile aafai custom types dinuparxa