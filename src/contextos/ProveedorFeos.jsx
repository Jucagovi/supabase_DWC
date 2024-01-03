import React, { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";

/**
 * Se crea el contexto en el ámbito global (fuera del componente).
 */
const ContextoFeos = createContext();

const ProveedorFeos = ({ children }) => {
  /** Valores iniciales para los estados */
  const objetoInicial = {};
  const arrayInicial = [];
  const cadenaCargando = "Cargando datos...";

  /** Estados para proveer. */
  const [listadoFeos, setListado] = useState(arrayInicial);
  const [situacion, setSituacion] = useState(cadenaCargando);

  /**
   * Función para obtener el listado de "feos"
   * usando la conexión al servicio supabase.
   */
  const obtenerListadoSencillo = async () => {
    try {
      const { data, error } = await supabaseConexion.from("Feos").select("*");
      setListado(data);
    } catch (fallo) {
      setSituacion(fallo.message);
    }
  };

  /** useEffect con las tareas a realizar en la carga del documento. */
  useEffect(() => {
    obtenerListadoSencillo();
  }, []);

  /**
   * Objeto con la información a exportar
   */
  const datosAExportar = { listadoFeos, situacion };

  return (
    <ContextoFeos.Provider value={datosAExportar}>
      {children}
    </ContextoFeos.Provider>
  );
};

export default ProveedorFeos;
export { ContextoFeos };
