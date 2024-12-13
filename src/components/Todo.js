import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = memo(({ task: { id, completed, task }, deleteTodo, editTodo, toggleComplete }) => (
  <div className="Todo">
    <p 
      className={completed ? "completed" : "incompleted"}
      onClick={() => toggleComplete(id)}
    >
      {task}
    </p>
    <div>
      <FontAwesomeIcon 
        className="edit-icon" 
        icon={faPenToSquare} 
        onClick={() => editTodo(id)} 
      />
      <FontAwesomeIcon 
        className="delete-icon" 
        icon={faTrash} 
        onClick={() => deleteTodo(id)} 
      />
    </div>
  </div>
));
