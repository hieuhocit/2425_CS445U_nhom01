import { IExam, IQuestion } from '@/types/definitions';
import { createSlice } from '@reduxjs/toolkit';

type State = {
  exams: IExam[];
  questions: IQuestion[];
};

const initialState: State = {
  exams: [],
  questions: [],
};

const questionsSlice = createSlice({
  name: 'setting',
  initialState: initialState,
  reducers: {
    changeQuestionsAndExams: (state, action) => {
      state.exams = action.payload.exams;
      state.questions = action.payload.questions;
    },
  },
});

export const { changeQuestionsAndExams } = questionsSlice.actions;
export default questionsSlice.reducer;
