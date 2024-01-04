import React, { useState, useEffect, createContext } from "react";
/** Se importa la conexión al servicio Supabase. */
import { supabaseConexion } from "../config/supabase.js";

/** Nuevo enfoque a la hora de crear contextos:
 *
 *  ->  se crea el contexto con la palabra "contexto"
 *      y una referencia a los datos que contiene (esto no cambia).
 *
 *  ->  al componente que provee la información
 *      se le cambia el nombre a "Proveedor" seguido de una
 *      referencia al tipo de datos que contiene. De este modo
 *      quedan diferenciadas las funcionalidades a través del nombre.
 */

/**
 * Se crea el contexto en el ámbito global (fuera del componente).
 */
const ContextoFeos = createContext();

const ProveedorFeos = ({ children }) => {
  /** Valores iniciales para los estados */

  /** Estados para proveer. */

  /** useEffect con las tareas a realizar en la carga del documento. */
  useEffect(() => {}, []);

  /**
   * Objeto con la información a exportar
   */
  const datosAExportar = {};

  return (
    <ContextoFeos.Provider value={datosAExportar}>
      {children}
    </ContextoFeos.Provider>
  );
};

export default ProveedorFeos;
export { ContextoFeos };
