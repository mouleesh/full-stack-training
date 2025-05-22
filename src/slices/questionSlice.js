import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    questions: [],
}

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setQuestionsInStore: (state, action) => {
            state.questions = action.payload
        },
    }
})

export const { setQuestionsInStore } = questionSlice.actions;

export default questionSlice.reducer;