import { createSlice} from "@reduxjs/toolkit";


export const adminSlice = createSlice({
     name: "admin",
     initialState: {
        data: [],
        attendance: []
     },
     reducers: {
      attendance: (state,action)=>{
         state.attendance = action.payload
      },
        data: (state,action) =>{
        state.data = action.payload
    }}
})

export const { data,attendance } = adminSlice.actions;

export const selectData = (state) => state.admin.data;
export const selectAttendance = (state)=> state.admin.attendance

export default adminSlice.reducer;