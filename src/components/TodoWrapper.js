import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { useDispatch, useSelector } from "react-redux";
import { addTodoFun, deleteTodoFun, editTaskFun, editTodoFun, toggleCompleteFun } from "./store/slice/todoSlice";

export const TodoWrapper = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoList);

  const addTodo = (todo) => {
    dispatch(addTodoFun(todo));
  }

  const deleteTodo = (id) => dispatch(deleteTodoFun(id));

  const toggleComplete = (id) => {
    dispatch(toggleCompleteFun(id));
  }

  const editTodo = (id) => {
    dispatch(editTodoFun(id));
  }

  const editTask = (task, id) => {
    const data = {
      id: id,
      task: task,
    }
    dispatch(editTaskFun(data));
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos && todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm key={index} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={index}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
