import React, { useState, useEffect } from 'react';
import ToDoService from './services/ToDoService';
import './styles/App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ title: '', description: '', completed: false });

  useEffect(() => {
    fetchToDos();
  }, []);

  const fetchToDos = async () => {
    const response = await ToDoService.getAllToDos();
    setTodos(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todo.id) {
      await ToDoService.updateToDo(todo.id, todo);
    } else {
      await ToDoService.createToDo(todo);
    }
    setTodo({ title: '', description: '', completed: false });
    fetchToDos();
  };

  const handleEdit = (todo) => {
    setTodo(todo);
  };

  const handleDelete = async (id) => {
    await ToDoService.deleteToDo(id);
    fetchToDos();
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-control">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-control">
          <label>Description:</label>
          <textarea
            name="description"
            value={todo.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn">{todo.id ? 'Update' : 'Add'}</button>
      </form>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                <button onClick={() => handleEdit(todo)} className="btn edit-btn">Edit</button>
                <button onClick={() => handleDelete(todo.id)} className="btn delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
