import React from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { useDispatch, useSelector } from "react-redux";
import { addTodoFun, deleteTodoFun, editTaskFun, editTodoFun, toggleCompleteFun } from "./store/slice/todoSlice";

export const TodoWrapper = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoList);

  const addTodo = (todo) => dispatch(addTodoFun(todo));
  const deleteTodo = (id) => dispatch(deleteTodoFun(id));
  const toggleComplete = (id) => dispatch(toggleCompleteFun(id));
  const editTodo = (id) => dispatch(editTodoFun(id));
  const editTask = (task, id) => dispatch(editTaskFun({ id, task }));

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {todos?.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id || index} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id || index}
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
