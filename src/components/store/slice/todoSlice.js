import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from "uuid";

const todoSlice = createSlice({
  name: 'todo',
  initialState: { todoList: [] },
  reducers: {
    addTodoFun: (state, action) => {
      state.todoList.push({
        id: uuidv4(),
        task: action.payload,
        completed: false,
        isEditing: false
      });
    },
    deleteTodoFun: (state, action) => {
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload);
    },
    toggleCompleteFun: (state, action) => {
      const todo = state.todoList.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodoFun: (state, action) => {
      const todo = state.todoList.find(item => item.id === action.payload);
      if (todo) {
        todo.isEditing = !todo.isEditing;
      }
    },
    editTaskFun: (state, action) => {
      const todo = state.todoList.find(item => item.id === action.payload.id);
      if (todo) {
        todo.task = action.payload.task;
        todo.isEditing = false;
      }
    }
  }
});

export const {
  addTodoFun,
  deleteTodoFun,
  toggleCompleteFun,
  editTodoFun,
  editTaskFun
} = todoSlice.actions;

export default todoSlice.reducer;
