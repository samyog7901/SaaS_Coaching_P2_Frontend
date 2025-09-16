import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "@/lib/types/type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
import { IInstituteStudentInitialData, IInstituteStudentInitialDataStudent, IStudentPostData } from "./institute-student-type";




const initialState:IInstituteStudentInitialData = {
    students: [],
    status: Status.LOADING
}
const instituteStudentSlice = createSlice({
    name: "institute-student",
    initialState: initialState,
    reducers : {
        setStudent(state:IInstituteStudentInitialData,action:PayloadAction<IInstituteStudentInitialDataStudent[]>){
            state.students = action.payload //47 minutes
        },
        setStatus(state:IInstituteStudentInitialData,action:PayloadAction<Status>){
            state.status = action.payload
        },
        resetStudentStatus(state:IInstituteStudentInitialData){
            state.status = Status.LOADING
        },
        removeStudentById(state:IInstituteStudentInitialData,action:PayloadAction<string>){
            const index = state.students.findIndex(student => student.id === action.payload)
            if(index !== -1){
                state.students.splice(index,1)
            }
        }
    }
   
})

export const {setStudent,setStatus,resetStudentStatus,removeStudentById} = instituteStudentSlice.actions
export default instituteStudentSlice.reducer

export function createInstituteStudent(data: IStudentPostData) {
    return async function createInstituteStudentThunk(dispatch: AppDispatch) {
      try {
        const response = await APIWITHTOKEN.post("institute/student", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        if (response.status === 201) {
          dispatch(setStatus(Status.SUCCESS));
          dispatch(fetchInstituteStudent());
          return true; // success
        } else {
          dispatch(setStatus(Status.ERROR));
          return false;
        }
      } catch (error) {
        console.log(error);
        dispatch(setStatus(Status.ERROR));
        return false;
      }
    };
  }

export function fetchInstituteStudent(){
    return async function fetchInstituteStudentThunk(dispatch:AppDispatch){
        try{
            const response = await APIWITHTOKEN.get("institute/student")
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                response.data.data.length > 0 && dispatch(setStudent(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function deleteInstituteStudentById(id:string){
    return async function deleteInstituteStudentByIdThunk(dispatch:AppDispatch){
        try{
            const response = await APIWITHTOKEN.delete("institute/student/" + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                //popout the teacher from slice
                dispatch(removeStudentById(id))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}