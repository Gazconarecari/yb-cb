import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, handleLogout }) {
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
              <Link to="/misvotos">MIS VOTOS</Link> {/* Nuevo enlace */}
            </li>
            <li>
              <button onClick={handleLogout}>LOGOUT</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/">LOGIN</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;