import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Vota.css';  // Importamos el archivo CSS

function Vota({ user }) {
  const [convocatoria, setConvocatoria] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);  // Estado para saber si ya ha votado
  const [Pan, setPan] = useState(5);
  const [Carne, setCarne] = useState(5);
  const [Combinacion, setCombinacion] = useState(5);
  const [Presentacion, setPresentacion] = useState(5);
  const [Originalidad, setOriginalidad] = useState(5);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    async function fetchConvocatoriaHoy() {
      const today = formatDate(new Date());

      let { data: convocatoriaData, error } = await supabase
        .from('convocatorias')
        .select('*')
        .eq('dia', today)
        .single();  // Obtenemos la convocatoria de hoy

      if (error) {
        console.log('No hay convocatoria para hoy:', error.message);
      } else {
        setConvocatoria(convocatoriaData);

        // Verificar si el usuario ya ha votado en esta convocatoria
        const { data: votoData, error: votoError } = await supabase
          .from('voto')
          .select('*')
          .eq('id', user.id)  // Verificamos si el usuario ya votó
          .eq('convocatoria', convocatoriaData.id)
          .single();

        if (votoData) {
          setHasVoted(true);  // Si ya ha votado, cambiamos el estado
        } else if (votoError && votoError.code !== 'PGRST116') {
          console.log('Error comprobando si ha votado:', votoError.message);
        }
      }
    }

    fetchConvocatoriaHoy();
  }, [user]);

  const handleSubmit = async () => {
    if (!convocatoria || !user) return;

    const { error } = await supabase
      .from('voto')
      .insert([
        {
          id: user.id,
          convocatoria: convocatoria.id,
          Pan: Pan,
          Carne: Carne,
          Combinacion: Combinacion,
          Presentacion: Presentacion,
          Originalidad: Originalidad
        }
      ]);

    if (error) {
      console.log('Error enviando voto:', error.message);
    } else {
      console.log('Voto enviado con éxito');
      setHasVoted(true);  // Actualizamos el estado para indicar que ya votó
    }
  };

  if (!convocatoria) return <p className="no-convocatoria">No hay convocatoria hoy.</p>;

  if (hasVoted) return <p className="ya-votado">Ya has votado en la convocatoria de hoy.</p>; // Mensaje si ya votó

  return (
    <div className="vota-container">
      <h2>Vota en la convocatoria de hoy</h2>

      <label>Pan</label>
      <input type="number" value={Pan} onChange={(e) => setPan(e.target.value)} min="1" max="10" />

      <label>Carne</label>
      <input type="number" value={Carne} onChange={(e) => setCarne(e.target.value)} min="1" max="10" />

      <label>Combinación</label>
      <input type="number" value={Combinacion} onChange={(e) => setCombinacion(e.target.value)} min="1" max="10" />

      <label>Presentación</label>
      <input type="number" value={Presentacion} onChange={(e) => setPresentacion(e.target.value)} min="1" max="10" />

      <label>Originalidad</label>
      <input type="number" value={Originalidad} onChange={(e) => setOriginalidad(e.target.value)} min="1" max="10" />

      <button onClick={handleSubmit}>Enviar Voto</button>
    </div>
  );
}

export default Vota;