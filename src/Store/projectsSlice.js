import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Firebase';






export const getProjectsFunc = createAsyncThunk(
    "getProjects/getProjectsFunc",
    async (__, thunkAPI) => {
        try {
            const getDoc = await getDocs(collection(db, "Projects"));
            const result = getDoc.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            });
            return result;
        } catch (error) {
            return error
        }
    }
)



const projectsSlice = createSlice({
    name: "getProjects",
    initialState: { projectsData: [], isLoading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProjectsFunc.pending, (state, action) => {
            state.error = null
            state.isLoading = true;
        })
        builder.addCase(getProjectsFunc.fulfilled, (state, action) => {
            state.projectsData = action.payload
            state.isLoading = false;
        })
        builder.addCase(getProjectsFunc.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false;
        })
    }
})

export default projectsSlice.reducer