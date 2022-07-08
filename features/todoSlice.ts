import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: { value: initialStateValue },
  reducers: {},
});

export const {} = todoSlice.actions;

export default todoSlice.reducer;
