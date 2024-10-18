import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Clasificacion.css'; // Importar los estilos

function Clasificacion() {
  const [convocatorias, setConvocatorias] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Llamamos a la función RPC para obtener el nombre del usuario y el promedio
      const { data: convocatoriasData, error } = await supabase
        .rpc('get_promedio_por_convocatoria'); // Llamamos a la función SQL actualizada

      if (error) {
        console.log('Error obteniendo los datos:', error);
        return;
      }

      // Guardamos los resultados en el estado
      setConvocatorias(convocatoriasData);
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Clasificación</h2>
      {convocatorias.length === 0 ? (
        <p className="no-data">Todavía nadie tiene valoración</p>  // Mostrar el mensaje si no hay datos
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Promedio de Puntuación</th>
            </tr>
          </thead>
          <tbody>
            {convocatorias.map((convocatoria, index) => (
              <tr key={index}>
                <td>{convocatoria.username}</td>
                <td>{convocatoria.promedio.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Clasificacion;