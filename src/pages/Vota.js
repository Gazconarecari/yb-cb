import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Vota({ user }) {  // Recibimos el usuario autenticado como prop
  const [convocatoria, setConvocatoria] = useState(null);
  const [Param1, setParam1] = useState(5);
  const [Param2, setParam2] = useState(5);
  const [Param3, setParam3] = useState(5);

  // Función para formatear la fecha en 'YYYY-MM-DD'
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

      let { data, error } = await supabase
        .from('convocatorias')
        .select('*')
        .eq('dia', today)
        .single();  // Obtenemos la convocatoria de hoy

      if (error) {
        console.log('No hay convocatoria para hoy:', error.message);
      } else {
        setConvocatoria(data);
      }
    }

    fetchConvocatoriaHoy();
  }, []);

  const handleSubmit = async () => {
    if (!convocatoria || !user) return;

    const { error } = await supabase
      .from('voto')
      .insert([
        {
          id: user.id,
          convocatoria: convocatoria.id,
          Param1,
          Param2,
          Param3
        }
      ]);

    if (error) {
      console.log('Error enviando voto:', error.message);
    } else {
      console.log('Voto enviado con éxito');
      setConvocatoria(null);  // Limpiamos la convocatoria para ocultar el formulario
    }
  };

  if (!convocatoria) return <p>No hay convocatoria hoy.</p>;

  return (
    <div>
      <h2>Vota en la convocatoria de hoy</h2>
      <label>Param1</label>
      <input type="number" value={Param1} onChange={(e) => setParam1(e.target.value)} min="1" max="10" />
      <label>Param2</label>
      <input type="number" value={Param2} onChange={(e) => setParam2(e.target.value)} min="1" max="10" />
      <label>Param3</label>
      <input type="number" value={Param3} onChange={(e) => setParam3(e.target.value)} min="1" max="10" />
      <button onClick={handleSubmit}>Enviar Voto</button>
    </div>
  );
}

export default Vota;