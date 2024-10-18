
import { supabase } from './supabaseClient';  // Ajusta la ruta si es necesario




import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Clasificacion from './pages/Clasificacion';
import Proximamente from './pages/Proximamente';
import Vota from './pages/Vota';
import MisVotos from './pages/MisVotos'; // Importar MisVotos

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga inicial

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));  // Convertimos el string de vuelta a objeto
    }
    setLoading(false);  // Marcamos que la carga ha finalizado
  }, []);

  const handleLogin = (user) => {
    setUser(user);  // Guardamos el usuario en el estado
    localStorage.setItem('user', JSON.stringify(user));  // Guardamos la sesión en localStorage
  };

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Cerramos sesión en Supabase
    localStorage.removeItem('user'); // Eliminamos el usuario de localStorage
    setUser(null); // Actualizamos el estado
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Login setUser={handleLogin} />} />
        <Route path="/clasificacion" element={<Clasificacion />} />
        <Route path="/proximamente" element={<Proximamente />} />
        <Route path="/vota" element={user ? <Vota user={user} /> : <Navigate to="/" />} />
        {/* Ruta protegida: Solo accesible si el usuario ha iniciado sesión */}
        <Route path="/misvotos" element={user ? <MisVotos user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;