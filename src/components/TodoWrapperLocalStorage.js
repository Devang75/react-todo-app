import React, { useState, useEffect, useCallback } from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    const updateTodosAndStorage = useCallback((newTodos) => {
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }, []);

    const addTodo = useCallback(todo => {
        const newTodos = [...todos, {
            id: uuidv4(),
            task: todo,
            completed: false,
            isEditing: false
        }];
        updateTodosAndStorage(newTodos);
    }, [todos, updateTodosAndStorage]);

    const toggleComplete = useCallback(id => {
        const newTodos = todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        );
        updateTodosAndStorage(newTodos);
    }, [todos, updateTodosAndStorage]);

    const deleteTodo = useCallback(id => {
        const newTodos = todos.filter(todo => todo.id !== id);
        updateTodosAndStorage(newTodos);
    }, [todos, updateTodosAndStorage]);

    const editTodo = useCallback(id => {
        setTodos(todos.map(todo => 
            todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo
        ));
    }, [todos]);

    const editTask = useCallback((task, id) => {
        const newTodos = todos.map(todo => 
            todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo
        );
        updateTodosAndStorage(newTodos);
    }, [todos, updateTodosAndStorage]);

    return (
        <div className='TodoWrapper'>
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo) => (
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
            ))}
        </div>
    );
};
