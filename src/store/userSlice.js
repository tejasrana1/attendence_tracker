import { createSlice } from "@reduxjs/toolkit";
import $ from "jquery";


const innitialData = JSON.parse(sessionStorage.getItem("login"))
const attd = JSON.parse(sessionStorage.getItem("attd"))
export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            name: (innitialData) ? innitialData.name : null,
            email: (innitialData) ? innitialData.email : null,
            eid: (innitialData) ? innitialData.eid : null,
            phone: (innitialData) ? innitialData.phone : null,
        },
        attendence: (attd)? attd: []
    },
    reducers: {
        login: (state,action) =>{
            state.user = action.payload
        },
        attendence: (state,action) =>{
            state.attendence = action.payload
        }
    }
});
export const {login, attendence} = userSlice.actions;

export const selectUser = (state)=> state.user;
export const selectAttendance = (state) => state.user.attendence;

export default userSlice.reducer;