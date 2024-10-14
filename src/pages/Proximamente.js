import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Proximamente() {
  const [convocatorias, setConvocatorias] = useState([]);

  useEffect(() => {
    async function fetchConvocatorias() {
      // Llamada a la función SQL para obtener username y fecha
      const { data: convocatoriasData, error } = await supabase.rpc('get_proximas_convocatorias1');

      if (error) {
        console.log('Error obteniendo convocatorias:', error);
        return;
      }

      setConvocatorias(convocatoriasData); // Guardamos los resultados en el estado
    }

    fetchConvocatorias();
  }, []);

  return (
    <div>
      <h2>Próximas Convocatorias</h2>
      <ul>
        {convocatorias.length === 0 ? (
          <p>No hay convocatorias próximas</p>
        ) : (
          convocatorias.map((convocatoria, index) => {
            const convocatoriaDate = new Date(convocatoria.fecha);

            return (
              <li key={index}>
                {convocatoriaDate >= new Date() ? (
                  <p>{convocatoria.username} cocinará el {convocatoriaDate.toLocaleDateString()}</p>
                ) : (
                  <p>{convocatoria.username} no tiene fecha, pero que se vaya preparando</p>
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default Proximamente;