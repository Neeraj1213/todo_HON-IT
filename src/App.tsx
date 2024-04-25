import React, { useState } from 'react';
import './App.css';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}


function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    const inputTrimmed = input.trim();
    if (inputTrimmed !== '' && !todos.some(todo => todo.text === inputTrimmed)) {
      const newTodo: TodoItem = { id: Date.now(), text: inputTrimmed, completed: false };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };
  
  

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };
  
  const toggleTodoCompletion = (id: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      handleAddTodo();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO List</h1>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTodo}>Add Task</button>
        <ul>
          {todos.map(todo => (
            <li key={todo.id} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span 
                onClick={() => toggleTodoCompletion(todo.id)}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none', flex: 1 }}>
                {todo.text}
              </span>
              <button onClick={(e) => {
                e.stopPropagation(); 
                handleDeleteTodo(todo.id);
              }} style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
  
}           

export default App;
