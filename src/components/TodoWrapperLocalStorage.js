import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState(() => {
        // Initialize state from localStorage only once
        return JSON.parse(localStorage.getItem('todos')) || [];
    });

    // Save to localStorage whenever todos change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = useCallback(task => {
        setTodos(prevTodos => [...prevTodos, {
            id: uuidv4(),
            task,
            completed: false,
            isEditing: false
        }]);
    }, []);

    const toggleComplete = useCallback(id => {
        setTodos(prevTodos => 
            prevTodos.map(todo => 
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        );
    }, []);

    const deleteTodo = useCallback(id => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }, []);

    const editTodo = useCallback(id => {
        setTodos(prevTodos => 
            prevTodos.map(todo => 
                todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo
            )
        );
    }, []);

    const editTask = useCallback((task, id) => {
        setTodos(prevTodos => 
            prevTodos.map(todo => 
                todo.id === id ? {...todo, task, isEditing: false} : todo
            )
        );
    }, []);

    const renderedTodos = useMemo(() => (
        todos.map((todo) => (
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
                    toggleComplete={toggleComplete} 
                    deleteTodo={deleteTodo} 
                    editTodo={editTodo} 
                />
            )
        ))
    ), [todos, editTask, toggleComplete, deleteTodo, editTodo]);

    return (
        <div className='TodoWrapper'>
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo} />
            {renderedTodos}
        </div>
    );
};
