import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
import { ICoursePostData, IInstituteCourseInitialData, IInstituteCourseInitialDataCourse } from "./institute-course-type";


const initialState:IInstituteCourseInitialData = {
    courses : [],
    status : Status.LOADING

}



   export const instituteCourseSlice = createSlice({
    name : "institute-course-slice",
    initialState : initialState,
    reducers : {
       
        setStatus(state,action:PayloadAction<any>){
            state.status = action.payload
        },
        setFetchCourse(state:IInstituteCourseInitialData,action:PayloadAction<IInstituteCourseInitialDataCourse[]>){
            state.courses = action.payload
        },
        setAddCourse(state:IInstituteCourseInitialData,action:PayloadAction<IInstituteCourseInitialDataCourse>){
            state.courses.push(action.payload)
        },
        setDeleteCourse(state:IInstituteCourseInitialData,action:PayloadAction<string>){
            const courseId = action.payload
            const index = state.courses.findIndex((course=>course.id === courseId))
            if(index !== -1){
                state.courses.splice(index,1)
            }
        },
        setEditCourse(state, action:PayloadAction<any>){
            const id = action.payload.id
            const data = action.payload.data

            const index =state.courses.findIndex(course=>course.id = id)
            if(index !== -1){
                state.courses[index] = data
            } 
        }
    }
})

export const {setStatus, setDeleteCourse, setEditCourse, setAddCourse, setFetchCourse} = instituteCourseSlice.actions
export default instituteCourseSlice.reducer

//thunks

export function createInstituteCourse(data:ICoursePostData){
    return async function createInstituteCourseThunk(dispatch:AppDispatch){
        try{
            const response = await APIWITHTOKEN.post("institute/course",data,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
            if(response.status === 201){
                dispatch(setStatus(Status.SUCCESS))
                response.data.data && dispatch(setAddCourse(response.data.data))
                dispatch(fetchInstituteCourse())
                
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchInstituteCourse(){
    return async function fetchInstituteCourseThunk(dispatch:AppDispatch){
        try{
            const response = await APIWITHTOKEN.get("institute/course")
            if(response.status ===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setFetchCourse(Array.isArray(response.data.data) ? response.data.data : []))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function deleteInstituteCourseById(id:string){
    return async function deleteInstituteCourseByIdThunk(dispatch:AppDispatch){
        try{
            const response = await APIWITHTOKEN.delete("institute/course/" + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setDeleteCourse(id))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function editInstituteCourseById(id:string, data:any){
    return async function editInstituteCourseByIdThunk(dispatch:AppDispatch){
        try{
            const response = await APIWITHTOKEN.patch("institute/course/" + id, data)
            if(response.status ===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setEditCourse({id,data}))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}