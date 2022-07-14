import { createSlice } from "@reduxjs/toolkit";


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
            role: (innitialData) ? innitialData.role : null,
            id: (innitialData) ? innitialData.id : null,
        },
        attendence: (attd)? attd: [],
        today: {}
    },
    reducers: {
        login: (state,action) =>{
            state.user = action.payload
        },
        attendence: (state,action) =>{
            state.attendence = action.payload
        },
        today: (state,action) =>{
            state.today =action.payload;
        }
    }
});
export const {login, attendence, today} = userSlice.actions;

export const selectUser = (state)=> state.user;
export const selectAttendance = (state) => state.user.attendence;
export const selectToday = (state) => state.user.today;

export default userSlice.reducer;