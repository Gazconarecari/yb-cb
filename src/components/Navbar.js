import { Link } from 'react-router-dom'; // Asume que estás usando react-router-dom para manejar las rutas
import './Navbar.css';

function Navbar({ user, handleLogout }) {  // Recibimos el usuario y la función de logout como props

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