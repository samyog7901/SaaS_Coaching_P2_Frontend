import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialStudentData, IStudent } from "./studentSlice.type";
import { Status } from "@/lib/types/type";


const initialStudentState : IInitialStudentData =  {
   student : {
    studentName : "",
    studentEmail : "",
    studentPhoneNumber : "",
    studentAddress : "",
   },
   status : Status.LOADING
}

const studentSlice = createSlice({
    name : "studentSlice",
    initialState : initialStudentState,
    reducers : {
        setStudent(state:IInitialStudentData,action:PayloadAction<IStudent>){
            state.student = action.payload
        },
        setStatus(state:IInitialStudentData,action:PayloadAction<Status>){
            state.status = action.payload
        }

    }
})
const {setStudent, setStatus} = studentSlice.actions
export default studentSlice.reducer
export { setStudent, setStatus }
