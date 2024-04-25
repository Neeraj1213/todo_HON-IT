import React, { useState } from 'react';
import './App.css';

interface TodoItem {
  id: number;
  text: string;
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim() !== '') {
      const newTodo: TodoItem = { id: Date.now(), text: input.trim() };
      setTodos([...todos, newTodo]);
      setInput(''); 
    }
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
        <h1>Todo App</h1>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
