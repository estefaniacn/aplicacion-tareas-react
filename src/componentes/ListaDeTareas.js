import React, { useState, useEffect } from 'react';
import TareaFormulario from './TareaFormulario';
import Tarea from './Tarea';
import '../hojas-de-estilo/ListaDeTareas.css';

const estadoInicial = JSON.parse(localStorage.getItem('tareas'));

function ListaDeTareas() {

  const [tareas, setTareas] = useState(estadoInicial || []);

  useEffect(() => {
    window.localStorage.setItem('tareas', JSON.stringify(tareas))
  }, [tareas]);

  const agregarTarea = tarea => {
    if (tarea.texto.trim()) {
      tarea.texto = tarea.texto.trim();
      const tareasActualizadas = [tarea, ...tareas];
      setTareas(tareasActualizadas);
    }
  }

  const eliminarTarea = id => {
    const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
    setTareas(tareasActualizadas);
  }

  const completarTarea = id => {
    const tareasActualizadas = tareas.map(tarea => {
      if (tarea.id === id) {
        tarea.completada = !tarea.completada;
      }
      return tarea;
    });
    setTareas(tareasActualizadas);
  }
  
  return (
    <>
      <TareaFormulario onSubmit={agregarTarea} />
      <div className='tareas-lista-contenedor'>
        {
          tareas.map((tarea) =>
            <Tarea
              key={tarea.id}
              id={tarea.id} 
              texto={tarea.texto}
              completada={tarea.completada}
              completarTarea={completarTarea}
              eliminarTarea={eliminarTarea} />
          ) 
        }
      </div>
    </>
  );    
}

export default ListaDeTareas;
