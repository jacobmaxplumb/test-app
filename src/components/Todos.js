import { useItems } from "../utils/useItems";

const initalFormValues = {
    text: '',
    completed: false
}

export const Todos = () => {
  const [todos, formValues, addTodo, handleInputChange] = useItems('todos', initalFormValues);

  return (
    <>
      <h1>Todos</h1>
      <input name="text" value={formValues.text} onChange={handleInputChange}/>
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
};
