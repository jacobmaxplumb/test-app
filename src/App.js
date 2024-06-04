import { Route, Routes, useNavigate } from "react-router-dom";
import { Todos } from "./components/Todos";
import { Contacts } from "./components/Contacts";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <button onClick={() => navigate('')}>Todos</button>
        <button onClick={() => navigate('contacts')}>Contacts</button>
      </div>
      <Routes>
        <Route path="" element={<Todos />}/>
        <Route path="contacts" element={<Contacts />}/>
      </Routes>
    </>
  );
}

export default App;
