import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstitute, IInstituteInitialData } from "./instituteSlice.type";
import { Status } from "@/lib/types/type";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
import API from "@/lib/http/API";




const initialState: IInstituteInitialData = {
    institute : {
        instituteName: "",
        instituteEmail: "",
        institutePhoneNumber: "",
        instituteAddress: "",


    },
    currentInstitute : null,
    status : Status.LOADING

}
export const instituteSlice = createSlice({
    name : "institute",
    initialState : initialState,
    reducers : {
        setInstitute(state:IInstituteInitialData,action:PayloadAction<IInstitute>){
            state.institute = action.payload
        },
        setCurrentInstitute(state, action: PayloadAction<IInstitute | null>) {
            state.currentInstitute = action.payload;
          },
        setInstituteStatus(state:IInstituteInitialData,action:PayloadAction<Status>){
            state.status = action.payload
        }
    }
})

export const {setInstitute,setCurrentInstitute, setInstituteStatus} = instituteSlice.actions
export default instituteSlice.reducer
// export { setInstitute, setStatus }

export function createInstitute(data:IInstitute){
    return async function createInstituteThunk(dispatch:AppDispatch){
        try{
            const response = await APIWITHTOKEN.post("institute",data)

            if(response.status === 201){
             
                dispatch(setInstituteStatus(Status.SUCCESS));
            }else{
                dispatch(setInstituteStatus(Status.ERROR));
            }
        }catch(error){
            dispatch(setInstituteStatus(Status.ERROR));
        }
    }
}


export function fetchInstitutes(){
    return async function fetchInstitutesThunk(dispatch:AppDispatch){
        try{
            const response = await APIWITHTOKEN.get("institute")

            if(response.status === 200){
                const institutes : IInstitute[] = response.data.data
                dispatch(setInstituteStatus(Status.SUCCESS))
                
                const currentInstituteNumber = response.data.currentInstituteNumber
                const current = institutes.find((inst)=>inst.instituteNumber === currentInstituteNumber) || null
                if(current){
                dispatch(setInstitute(current))
                dispatch(setCurrentInstitute(current))
                }
            }else{
                dispatch(setInstituteStatus(Status.ERROR));
            }
        }catch(error){
            dispatch(setInstituteStatus(Status.ERROR));
        }
    }
}