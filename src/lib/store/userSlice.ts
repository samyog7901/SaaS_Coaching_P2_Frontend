// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IUserInitialState } from "./type";
// import API from "../http";




// //36 minutes
// const userInitialState : IUserInitialState = {
//     username : null,
//     password : null
// }

// const userSlice = createSlice({
//     name : "userSlice",
//     initialState : userInitialState,
//     reducers : {
//         setName(state : IUserInitialState,action : PayloadAction<string>){
            
//         },

//         setAddress(state:IUserInitialState,action:PayloadAction<string>){
            
//         }
//     }

// })

// const {setName, setAddress} = userSlice.actions
// export default userSlice.reducer
// export { setName, setAddress }


// function registerUser(data:any){
//     return async function registerUserThunk(){
//         try{
//             const response = await API.post("user/register")
//         if(response.status === 200){
//             console.log("user registered successfully")
//         }else{
//             console.error("Registration failed")
//         }
//         }catch(error){
//             console.error("Error registering user:", error)
//         }

//     }
// }

// function loginUser(){
//     return async function loginUserThunk(){
//         try{
//             const response = await API.post("user/login")
//             if(response.status ===200){
//                 console.log("user logged in successfully")
//             }else{
//                 console.error("Login failed")
//             }
//         }catch(error){
//             console.log(error)
//         }
//     }
// }