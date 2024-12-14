import React, { useCallback, memo } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { useDispatch, useSelector } from "react-redux";
import { addTodoFun, deleteTodoFun, editTaskFun, editTodoFun, toggleCompleteFun } from "./store/slice/todoSlice";

export const TodoWrapper = memo(() => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoList);

  const addTodo = useCallback(
    (todo) => dispatch(addTodoFun(todo)),
    [dispatch]
  );

  const deleteTodo = useCallback(
    (id) => dispatch(deleteTodoFun(id)),
    [dispatch]
  );

  const toggleComplete = useCallback(
    (id) => dispatch(toggleCompleteFun(id)),
    [dispatch]
  );

  const editTodo = useCallback(
    (id) => dispatch(editTodoFun(id)),
    [dispatch]
  );

  const editTask = useCallback(
    (task, id) => dispatch(editTaskFun({ id, task })),
    [dispatch]
  );

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos?.map((todo) => (
        todo.isEditing ? (
          <EditTodoForm 
            key={todo.id} 
            editTodo={editTask} 
            task={todo} 
          />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      ))}
    </div>
  );
});
