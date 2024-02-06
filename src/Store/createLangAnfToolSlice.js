import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Firebase';


export const getLangOrToolfunc = createAsyncThunk(
    "addLangOrTool/getLangOrToolfunc",
    async (__, thunkAPI) => {
        try {
            const getDoc = await getDocs(collection(db, "LanguagesAndTools"));
            const result = getDoc.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            });
            return result;
        } catch (error) {
            return error
        }
    }
)



const createLangAnfToolSlice = createSlice({
    name: "addLangOrTool",
    initialState: { LangOrToolData: [], isLoading: false, error: null },
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getLangOrToolfunc.pending, (state, action) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(getLangOrToolfunc.fulfilled, (state, action) => {
            state.LangOrToolData = action.payload
            state.isLoading = false

        })
        builder.addCase(getLangOrToolfunc.rejected, (state, action) => {
            console.log(action)
            state.isLoading = false

        })
    }
})

export default createLangAnfToolSlice.reducer