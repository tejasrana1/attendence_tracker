import { createSlice} from "@reduxjs/toolkit";


export const adminSlice = createSlice({
     name: "admin",
     innitialState: {
        admin: {
            
        }
     },
     reducers: {
        login: (state,action) =>{
        state.user = action.payload
    }}
})

export const { login } = adminSlice.actions;

export const selectAdmin = (state) = state.admin.admin;

export default adminSlice.reducer;