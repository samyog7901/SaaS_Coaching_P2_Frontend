import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstituteTeacherInitialData, IInstituteTeacherInitialDataTeacher} from "./institute-teacher-type";
import { Status } from "@/lib/types/type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
import { ITeacherPostData } from "../../teacher/teacherSlice.type";




const initialState:IInstituteTeacherInitialData = {//55 minutes
    teachers: [],
    status: Status.LOADING
}
const instituteTeacherSlice = createSlice({
    name: "institute-teacher",
    initialState: initialState,
    reducers : {
        setTeacher(state:IInstituteTeacherInitialData,action:PayloadAction<IInstituteTeacherInitialDataTeacher[]>){
            state.teachers = action.payload //47 minutes
        },
        setStatus(state:IInstituteTeacherInitialData,action:PayloadAction<Status>){
            state.status = action.payload
        },
        resetTeacherStatus(state:IInstituteTeacherInitialData){
            state.status = Status.LOADING
        },
        removeTeacherById(state:IInstituteTeacherInitialData,action:PayloadAction<string>){
            const index = state.teachers.findIndex(teacher => teacher.id === action.payload)
            if(index !== -1){
                state.teachers.splice(index,1)
            }
        }
    }
   
})

export const {setTeacher,setStatus,resetTeacherStatus,removeTeacherById} = instituteTeacherSlice.actions
export default instituteTeacherSlice.reducer

export function createInstituteTeacher(data: ITeacherPostData) {
    return async function createInstituteTeacherThunk(dispatch: AppDispatch) {
      try {
        const response = await APIWITHTOKEN.post("institute/teacher", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        if (response.status === 201) {
          dispatch(setStatus(Status.SUCCESS));
          dispatch(fetchInstituteTeacher());
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

export function fetchInstituteTeacher(){
    return async function fetchInstituteTeacherThunk(dispatch:AppDispatch){
        try{
            const response = await APIWITHTOKEN.get("institute/teacher")
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                response.data.data.length > 0 && dispatch(setTeacher(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function deleteInstituteTeacherById(id:string){
    return async function deleteInstituteTeacherByIdThunk(dispatch:AppDispatch){
        try{
            const response = await APIWITHTOKEN.delete("institute/teacher/" + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                //popout the teacher from slice
                dispatch(removeTeacherById(id))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}