import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from "uuid";

const todoSlice = createSlice({
  name: 'todo',
  initialState: { todoList: [] },
  reducers: {
    addTodoFun: (state,action) => {
        state.todoList = [...state.todoList, { id: uuidv4(), task: action.payload, completed: false, isEditing: false }]
    },
    deleteTodoFun: (state, action) => {
        state.todoList = state.todoList.filter((todo) => todo.id !== action.payload);
    },
    toggleCompleteFun: (state, action) => {
        const index = state.todoList((item) => item.id === action.payload);
        if (index > -1) {
            state.todoList[index] = {...state.todoList[index], completed:!state.todoList[index].completed };
        }   
    },
    editTodoFun: (state, action) => {
        const index = state.todoList.findIndex((item) => item.id === action.payload);
        if (index > -1) {
            state.todoList[index] = {...state.todoList[index], isEditing:!state.todoList[index].isEditing };
        }
    },
    editTaskFun: (state, action) => {
        const index = state.todoList.findIndex((item) => item.id === action.payload.id);
        if (index > -1) {
            state.todoList[index].task = action.payload.task;
            state.todoList[index].isEditing = false;
        }
    }
  }
});

export const {addTodoFun, deleteTodoFun, toggleCompleteFun, editTodoFun, editTaskFun} = todoSlice.actions;

export default todoSlice.reducer;
