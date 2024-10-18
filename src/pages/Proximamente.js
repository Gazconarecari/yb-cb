import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Proximamente.css'; // Importar el archivo de estilos

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

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="container">
      <h2>Próximas Convocatorias</h2>
      <ul>
        {convocatorias.length === 0 ? (
          <p className="no-convocatorias">No hay convocatorias próximas</p>
        ) : (
          convocatorias.map((convocatoria, index) => {
            const convocatoriaDate = new Date(convocatoria.fecha);

            return (
              <li key={index}>
                {isToday(convocatoriaDate) ? (
                  <p>{convocatoria.username} cocina hoy</p>  // Si es hoy
                ) : convocatoriaDate >= new Date() ? (
                  <p>{convocatoria.username} cocinará el {convocatoriaDate.toLocaleDateString()}</p>  // Si es una fecha futura
                ) : (
                  <p>{convocatoria.username} no tiene fecha, pero que se vaya preparando</p>  // Si es una fecha pasada
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