import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Asume que estás usando react-router-dom para manejar las rutas
import { supabase } from '../supabaseClient';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificamos si el usuario está guardado en localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Si existe, lo guardamos en el estado
    } else {
      // Obtenemos la sesión actual de Supabase correctamente con getSession()
      const getUserSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null); // Si hay una sesión activa, guardamos el usuario
      };
      getUserSession();
    }
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Cerramos sesión en Supabase
    localStorage.removeItem('user'); // Eliminamos el usuario de localStorage
    setUser(null); // Actualizamos el estado
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/proximamente">PRÓXIMAMENTE...</Link>
        </li>
        <li>
          <Link to="/clasificacion">CLASIFICACIÓN</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/vota">VOTA</Link>
            </li>
            <li>
              <button onClick={handleLogout}>LOGOUT</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">LOGIN</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;