import React, { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";

const ContextoFeos = createContext();

const ProveedorFeos = ({ children }) => {
  /** Valores iniciales para los estados */
  const objetoInicial = {};
  const arrayInicial = [];
  const cadenaCargando = "Cargando datos...";
  const cadenaInicial = "";
  const booleanInicial = false;
  const valoresInicialesFeo = {
    name: "",
    phone: "",
    email: "",
    address: "",
    country: "",
  };

  /** Estados para proveer. */
  const [listadoFeos, setListadoFeos] = useState(arrayInicial);
  const [situacion, setSituacion] = useState(cadenaCargando);
  const [feo, setFeo] = useState(valoresInicialesFeo);
  const [error, setError] = useState(cadenaInicial);

  /**
   * Función para obtener el listado de "feos"
   * usando la conexión al servicio supabase.
   */
  const obtenerListadoSencillo = async () => {
    try {
      const { data, error } = await supabaseConexion.from("Feos").select("*");
      setListadoFeos(data);
    } catch (fallo) {
      setSituacion(fallo.message);
    }
  };

  /**
   * Función para obtener los datos de un registro.
   */
  const obtenerFeo = async (id) => {
    // Por si se ha producido un error previo.
    setError(cadenaInicial);
    try {
      const { data, error } = await supabaseConexion
        .from("Feos")
        .select("*")
        .eq("id", id);
      setFeo(data[0]);
    } catch (fallo) {
      setSituacion(fallo.message);
    }
  };

  /**
   * Función para actualizar los datos de un formulario
   * al estado "feo".
   */
  const actualizarDato = (evento) => {
    const { name, value } = evento.target;
    setFeo({ ...feo, [name]: value });
  };

  /**
   * Función para insertar el estado "feo" en la
   * base de datos de supabase.
   */
  const crearFeo = async () => {
    // Se intenta insertar los datos.
    try {
      const respuesta = await supabaseConexion.from("Feos").insert(feo);
      console.log(respuesta);
      setFeo(valoresInicialesFeo);
      setListadoFeos([...listadoFeos, feo]);
    } catch (error) {
      setError(error.message);
    }
  };

  const actualizarFeo = async () => {
    // Se intentan actualizar los datos.
    try {
      const { data, error } = await supabaseConexion
        .from("Feos")
        .update(feo)
        .eq("id", feo.id);

      if (error) throw error;

      const feosCambiados = listadoFeos.map((feoAntiguo) => {
        return feoAntiguo.id === feo.id ? feo : feoAntiguo;
      });
      setListadoFeos(feosCambiados);
      setFeo(valoresInicialesFeo);
    } catch (error) {
      setError(error.message);
    }
  };

  /**
   * Función para borrar un registro de la
   * base de datos.
   */
  const borrarFeo = async (id) => {
    // Se intenta borrar el elemento.
    try {
      const { data, error } = await supabaseConexion
        .from("Feos")
        .delete()
        .eq("id", id);

      /**
       * Si todo ha ido bien, se actualiza el estado del contexto.
       * Para ello se recorre el estado "listadoFeos" y se
       * devuelven todos los objetos cuyo "id" sea diferente
       * al que se ha eliminado.
       */
      const feosFiltrados = listadoFeos.filter((feo) => {
        if (feo.id !== id) {
          return feo;
        }
      });
      // Se actualiza el estado.
      setListadoFeos(feosFiltrados);
    } catch (error) {
      setError(error.message);
    }
  };

  /** useEffect con las tareas a realizar en la carga del documento. */
  useEffect(() => {
    obtenerListadoSencillo();
  }, []);

  /**
   * Objeto con la información a exportar
   */
  const datosAExportar = {
    listadoFeos,
    situacion,
    feo,
    error,
    actualizarDato,
    crearFeo,
    actualizarFeo,
    obtenerFeo,
    borrarFeo,
  };

  return (
    <ContextoFeos.Provider value={datosAExportar}>
      {children}
    </ContextoFeos.Provider>
  );
};

export default ProveedorFeos;
export { ContextoFeos };
