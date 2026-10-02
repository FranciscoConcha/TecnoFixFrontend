import { useState } from "react";
import { BrowserRouter, Link, Navigate,  Route, Routes } from "react-router-dom";
import { Login } from "./Page/Login/Login";
import { Register } from "./Page/Register/Register";

interface UserLogin{
  name: string;
  rol: string;
}
function App() {
  const [user, setUser] = useState<UserLogin | null>(null);
  const handleLoginSuccess = (
    name: string, 
    rol: string
  ) => {
    setUser({ name, rol });
  };
  function handleLogout() {
    setUser(null);
  }
  
  return (
    <BrowserRouter>
      <nav style= {{padding: 12, borderBottom: "1px solid #ccc"}}>
        <Link to="/login" style={{ marginRight: 12 }}>Iniciar Sesión</Link>
        <Link to="/Register">Registrarse</Link>
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/login" element={
          user ? 
            <Navigate to = "/" replace/>
          : 
            <Login onLoginSuccess={handleLoginSuccess} />
        }
        />
        <Route path="/Register" element={<Register/>}/>

        <Route path="/" element = {
          user ?
            <p style={{ padding: 12 }}>¡Bienvenido, {user.name}!</p>
            : <Navigate to="/login" replace />
        }/>
          
      </Routes>
    </BrowserRouter>

  )
}


export default App;