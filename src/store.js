import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./slices/questionSlice";
import snackbarReducer from "./slices/snackbarSlice";

export const store = configureStore({
    reducer: {
        questions: questionReducer,
        snackbar: snackbarReducer
    },
})