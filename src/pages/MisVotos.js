import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './MisVotos.css'; // Crea un archivo CSS para estilos si es necesario

function MisVotos({ user }) {
  const [votos, setVotos] = useState([]);
  const [convocatoriasCount, setConvocatoriasCount] = useState(0);

  useEffect(() => {
    async function fetchVotos() {
      if (!user) return;

      // Obtenemos los votos del usuario actual
      const { data: votosData, error } = await supabase
        .from('voto')
        .select('convocatoria, Pan, Carne, Combinacion, Presentacion, Originalidad, convocatoria(id, username)')
        .eq('id', user.id); // Filtramos por el ID del usuario

      if (error) {
        console.log('Error obteniendo los votos:', error.message);
        return;
      }

      setVotos(votosData);
      setConvocatoriasCount(votosData.length); // Contamos cuántas convocatorias ha participado
    }

    fetchVotos();
  }, [user]);

  return (
    <div className="container">
      <h2>Mis Votos</h2>
      <p>Has participado en {convocatoriasCount} convocatorias.</p>

      {votos.length === 0 ? (
        <p>No has votado en ninguna convocatoria todavía.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Convocatoria</th>
              <th>Pan</th>
              <th>Carne</th>
              <th>Combinación</th>
              <th>Presentación</th>
              <th>Originalidad</th>
            </tr>
          </thead>
          <tbody>
            {votos.map((voto, index) => (
              <tr key={index}>
                <td>{voto.convocatoria.username}</td> {/* Nombre del usuario votado */}
                <td>{voto.Pan}</td>
                <td>{voto.Carne}</td>
                <td>{voto.Combinacion}</td>
                <td>{voto.Presentacion}</td>
                <td>{voto.Originalidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MisVotos;