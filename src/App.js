import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Clasificacion from './pages/Clasificacion';
import Proximamente from './pages/Proximamente';
import Vota from './pages/Vota';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga inicial

  // Cargar la sesión desde localStorage cuando el componente se monta
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

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');  // Limpiamos la sesión de localStorage
  };

  // Si estamos cargando la sesión, mostramos un mensaje o pantalla de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    
    <Router>
      <Navbar />  
      <Routes>
        {/* Ruta de Login */}
        <Route path="/" element={<Login setUser={handleLogin} />} />

        {/* Rutas sin protección de sesión */}
        <Route path="/clasificacion" element={<Clasificacion />} />
        <Route path="/proximamente" element={<Proximamente />} />

        {/* Ruta protegida: Solo accesible si el usuario ha iniciado sesión */}
        <Route path="/vota" element={user ? <Vota user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;