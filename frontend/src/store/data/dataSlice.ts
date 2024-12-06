import { createSlice } from '@reduxjs/toolkit';

/** DUMMY DATA */
import { answers, exams, questions } from '@/data/data';

const initialState = {
  exams: exams.filter((e) => e.license_ids.includes(1)),
  questions: questions
    .filter((q) => q.license_ids.includes(1))
    .map((q) => {
      return {
        ...q,
        answers: answers.filter((a) => a.question_id === q.id),
      };
    }),
};

const questionsSlice = createSlice({
  name: 'setting',
  initialState: initialState,
  reducers: {
    changeQuestions: (state, action) => {
      state.exams = exams.filter((e) =>
        e.license_ids.includes(action.payload.licenseId)
      );
      state.questions = questions
        .filter((q) => q.license_ids.includes(action.payload.licenseId))
        .map((q) => {
          return {
            ...q,
            answers: answers.filter((a) => a.question_id === q.id),
          };
        });
    },
  },
});

export const { changeQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
