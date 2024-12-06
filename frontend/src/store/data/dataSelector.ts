import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectData = (state: RootState) => state.data;

const questionsSelector = createSelector(selectData, (data) => data.questions);
const examsSelector = createSelector(selectData, (data) => data.exams);

export { selectData, questionsSelector, examsSelector };
