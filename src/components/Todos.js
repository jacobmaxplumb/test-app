import axios from "axios";
import { useEffect, useState } from "react";

const apiEndpoint = `${process.env.REACT_APP_API_URL}/todos`;

export const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const getTodos = async () => {
    if (localStorage.getItem('todos')) {
        console.log(localStorage.getItem('todos'));
        const todos = JSON.parse(localStorage.getItem('todos'));
        setTodos(JSON.parse(localStorage.getItem('todos')));
    }
    else {
        const { data } = await axios.get(apiEndpoint);
        setTodos(data);
    }
  };

  const addTodo = async () => {
    const todo = {text: text, completed: false}
    const { data } = await axios.post(apiEndpoint, todo);
    setTodos([...todos, data]);
    setText('');
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <h1>Todos</h1>
      <input value={text} onChange={(e) => setText(e.target.value)}/>
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
};
