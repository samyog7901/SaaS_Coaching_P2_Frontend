import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryData, ICategoryInitialData } from "./category.types";
import { Status } from "@/lib/types/type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";



const initialState :ICategoryInitialData = {
    data : [],
    status : Status.LOADING
    
}
export const categorySlice = createSlice({
    name : "categorySlice",
    initialState : initialState,
    reducers : {
        setStatus(state:ICategoryInitialData,action:PayloadAction<Status>){
            state.status = action.payload
        },
        setFetchData(state: ICategoryInitialData, action: PayloadAction<ICategoryData[]>) {
           state.data = action.payload
        },
        setAddData(state: ICategoryInitialData, action: PayloadAction<ICategoryData>) {
            state.data.push(action.payload)
         },
        
        
        setCategoryDelete(state:ICategoryInitialData,action:PayloadAction<string>){
            const categoryId = action.payload
            //mathiko data vanne array ma categoryId ko data vako ko index find garera tyo index ma vako data lai remove garne
            const index = state.data.findIndex((category=>category.id === categoryId))
            if(index !== -1){
                state.data.splice(index,1)
            }
         
        }
    }
})

const {setStatus, setFetchData,setAddData, setCategoryDelete} = categorySlice.actions
export default categorySlice.reducer

export function fetchCategories(){
    return async function fetchCategoriesThunk(dispatch:AppDispatch){
        try{
            const response = await APIWITHTOKEN.get("institute/category")
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setFetchData(Array.isArray(response.data.data) ? response.data.data : []))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            dispatch(setStatus(Status.ERROR))

        }
    }
}


export function addCategories(category: {
    categoryName : string,
    categoryDescription : string
}){
    return async function addCategoriesThunk(dispatch:AppDispatch, getState:any){
        try{
            const response = await APIWITHTOKEN.post("institute/category",category)
            if(response.status === 201){
                dispatch(setStatus(Status.SUCCESS))
                
                response.data.data && dispatch(setAddData(response.data.data));
                dispatch(fetchCategories())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}

export function deleteCategories(id:string){
    return async function deleteCategoriesThunk(dispatch:AppDispatch){
        try{
            const response = await APIWITHTOKEN.delete("institute/category/" + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setCategoryDelete(id))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(error){
            console.log(error)
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}