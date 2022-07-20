import { createSlice, current } from '@reduxjs/toolkit';

const initialStateValue = {
  listOfToDos: [],
  theme: 'light',
  filter: 'all',
};

export const appSlice = createSlice({
  name: 'app',
  initialState: { value: initialStateValue },
  reducers: {
    changeTheme: (state: any) => {
      if (state.value.theme === 'light') {
        state.value.theme = 'dark';
      } else {
        state.value.theme = 'light';
      }
    },
    changeFilter: (state: any, action: any) => {
      state.value.filter = action.payload;
    },
    addNewToDo: (state: any, action: any) => {
      const { listOfToDos } = state.value;

      listOfToDos.unshift(action.payload);
    },
    deleteToDo: (state: any, action: any) => {
      const { listOfToDos } = state.value;
      const toDo = listOfToDos.find((item: any) => item.id === action.payload);
      const indexOfTodo = listOfToDos.indexOf(toDo);
      listOfToDos.splice(indexOfTodo, 1);
    },
    completeToDo: (state: any, action: any) => {
      const { listOfToDos } = state.value;

      const toDo = listOfToDos.find((item: any) => item.id === action.payload);

      if (toDo.completed === true) {
        toDo.completed = false;
      } else {
        toDo.completed = true;
      }
    },
    clearCompleted: (state: any) => {
      const notCompletedToDos = [...current(state.value.listOfToDos)].filter(
        (todo: any) => todo.completed === false
      );

      state.value.listOfToDos = notCompletedToDos;
    },
  },
});

export const {
  changeTheme,
  changeFilter,
  addNewToDo,
  deleteToDo,
  completeToDo,
  clearCompleted,
} = appSlice.actions;

export default appSlice.reducer;
