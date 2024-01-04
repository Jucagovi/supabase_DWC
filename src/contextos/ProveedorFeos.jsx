import React, { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";

const ContextoFeos = createContext();

const ProveedorFeos = ({ children }) => {
  /** Valores iniciales para los estados */
  const objetoInicial = {};
  const arrayInicial = [];
  const cadenaCargando = "Cargando datos...";
  const cadenaInicial = "";
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
   * Función para filtrar el listado de "feos"
   * usando el operador eq().
   */
  const filtrarFeos = async () => {
    try {
      const { data, error } = await supabaseConexion
        .from("Feos")
        .select("*")
        .eq("country", "Burkina Faso");
      setListadoFeos(data);
    } catch (fallo) {
      setSituacion(fallo.message);
    }
  };

  /**
   * Función para ordenar el listado de "feos"
   * usando la cláusula order.
   */
  const ordenarFeos = async (orden) => {
    try {
      const { data, error } = await supabaseConexion
        .from("Feos")
        .select("*")
        .order("name", { ascending: orden });
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
      /**
       * El objeto data es un array que contiene un objeto con los
       * datos por cada ocurrencia de la búsqueda. En este caso
       * sólo puede ser una ya que se ha filtrado por "id".
       */
      //console.log(data);
      /**
       * Al estado, por tanto, se le debe asignar la primera (y única)
       * posición de ese array.
       */
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
      /**
       * Se actualiza el estado compartido "listadofeos", de ese
       * modo el resto de componentes que lo utilicen tendrán
       * una versión actualizada.
       */
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

      /**
       * Si se lanza la consulta sin "id" se trata de un error,
       * pero no salta el catch ya que la comunicación se ha
       * producido con éxito. Para casos así se dispone del
       * objeto "error". Si éste contiene datos, lanzamos el
       * error y se activa el catch.
       */
      if (error) throw error;

      /**
       * Si todo ha ido bien, se actualizan los datos en el estado
       * "listadoFeos" para que aparezcan los cambios en pantalla.
       * Hay dos posibilidades: volver a pedir los datos al servidor
       * (poco eficiente), o actualizar el estado (más eficiente).
       * Todo dependerá del tipo de datos y aplicación que se esté
       * programando. Ambas posibilidades son asumibles.
       * Además, al compartir estado, esta tarea también hay que realizarla
       * en la función "crearFeo".
       * */

      // Se crea un nuevo array con los cambios del formulario.
      const feosCambiados = listadoFeos.map((feoAntiguo) => {
        return feoAntiguo.id === feo.id ? feo : feoAntiguo;
      });
      // Se actualiza el estado con los nuevos datos.
      setListadoFeos(feosCambiados);
      // Se borra el formulario tras el cambio.
      setFeo(valoresInicialesFeo);
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
    obtenerListadoSencillo,
    filtrarFeos,
    ordenarFeos,
    actualizarDato,
    crearFeo,
    actualizarFeo,
    obtenerFeo,
  };

  return (
    <ContextoFeos.Provider value={datosAExportar}>
      {children}
    </ContextoFeos.Provider>
  );
};

export default ProveedorFeos;
export { ContextoFeos };
