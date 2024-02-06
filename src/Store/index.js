import { configureStore } from "@reduxjs/toolkit";

import addLangOrTool from "./createLangAnfToolSlice"
import getProjects from './projectsSlice'

export default configureStore({
    reducer: {
        addLangOrTool,
        getProjects,
    }
})