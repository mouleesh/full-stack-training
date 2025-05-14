import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./slices/questionSlice";

export const store = configureStore({
    reducer: {
        questions: questionReducer
    },
})