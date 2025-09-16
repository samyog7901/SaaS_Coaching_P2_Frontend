import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IInitialState, IRegisterData, IUserData } from "./authSlice.types"
import { Status } from "@/lib/types/type"
import { AppDispatch } from "../store"
import { ILoginData } from "@/app/auth/login/login.types"
import API from "@/lib/http/API"
import { fetchCategories } from "../institute/category/categorySlice"





const initialState:IInitialState = {
    user :  typeof window !== "undefined" && localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
    status : Status.LOADING
}

const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {
        setUser(state:IInitialState,action:PayloadAction<IUserData>){
            state.user = action.payload
            localStorage.setItem("user",JSON.stringify(action.payload))
        },
        setStatus(state:IInitialState,action:PayloadAction<Status>){
            state.status = action.payload
        },
        resetStatus(state:IInitialState){
            state.status = Status.LOADING
        }
    }
})
export const {setUser, setStatus,resetStatus} = authSlice.actions
export default authSlice.reducer



export function registerUser(data:IRegisterData){
    return async function registerUserThunk(dispatch:AppDispatch){
        try{
            const response = await API.post("auth/register",data)
        if(response.status === 201){
            dispatch(setStatus(Status.SUCCESS))
            
        }else{
            dispatch(setStatus(Status.ERROR))
           
        }
        }catch(error){
            dispatch(setStatus(Status.ERROR))
           
        }

    }
}

export function loginUser(data:ILoginData){
    return async function loginUserThunk(dispatch:AppDispatch){
        
        try{
           
            const response = await API.post("auth/login",data)// 40 minutes
            if(response.status ===200){
                dispatch(setUser(response.data.data))
                localStorage.setItem("token",response.data.data.token)
                dispatch(setStatus(Status.SUCCESS))
                
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            dispatch(setStatus(Status.ERROR))
        }
    }
}