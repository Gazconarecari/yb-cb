import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Username y contraseña son obligatorios');
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error) {
      setErrorMessage('Error al iniciar sesión: ' + error.message);
    } else if (data) {
      console.log('Inicio de sesión exitoso:', data);
      setUser(data);
      setErrorMessage('');
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/vota');
    } else {
      setErrorMessage('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      {/* Nuevo encabezado estilizado */}
      <div className="welcome-header">
        <h1>BIENVENIDOS A</h1>
        <h2>YB CHAMPIONS BURGER</h2>
      </div>

    
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Referencia"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Login;