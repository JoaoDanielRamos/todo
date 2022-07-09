import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { todos: [], theme: 'light', filter: 'all' };

export const todoSlice = createSlice({
  name: 'todo',
  initialState: { value: initialStateValue },
  reducers: {
    changeTheme: (state: any) => {
      if (state.value.theme === 'light') {
        state.value.theme = 'dark';
      } else {
        state.value.theme = 'light';
      }

      console.log(state.value.theme);
    },
    changeFilter: (state: any, action: any) => {
      state.value.filter = action.payload;

      console.log(state.value.filter);
    },
    addTodo: (state: any, action: any) => {
      let todoList = state.value.todos;

      todoList.unshift(action.payload);
    },
  },
});

export const { changeTheme, changeFilter, addTodo } = todoSlice.actions;

export default todoSlice.reducer;
