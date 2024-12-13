import React, { memo, useState } from 'react'

export const EditTodoForm = memo(({ editTodo, task }) => {
    const [value, setValue] = useState(task.task);

    const handleSubmit = e => {
        e.preventDefault();
        if (value.trim()) {
            editTodo(value.trim(), task.id);
        }
    };

    const handleChange = e => setValue(e.target.value);

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input 
                type="text"
                value={value}
                onChange={handleChange}
                className="todo-input"
                placeholder='Update task'
            />
            <button type="submit" className='todo-btn'>
                Save
            </button>
        </form>
    );
});
