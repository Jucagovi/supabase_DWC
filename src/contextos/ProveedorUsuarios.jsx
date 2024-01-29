import React, { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";
import { useNavigate } from "react-router-dom";

const ContextoUsuarios = createContext();

const ProveedorUsuarios = ({ children }) => {
  /** Hook para redirigir las rutas de la biblioteca react-router-dom. */
  const navegar = useNavigate();

  /** Valores iniciales para los estados */

  // Objeto para el formulario de creación de usuario.
  const datosSesionInicial = {
    email: "",
    password: "",
  };
  const sesionInicial = false;
  const usuarioInicial = {};
  // Variable para la gestión de errores con los usuarios.
  const errorUsuarioInicial = "";

  /** Estados para proveer. */
  const [datosSesion, setDatosSesion] = useState(datosSesionInicial);
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [errorUsuario, setErrorUsuario] = useState(errorUsuarioInicial);
  const [sesionIniciada, setSesionIniciada] = useState(sesionInicial);

  /**
   * Función para reenviar a la pantalla de inicio de sesión.
   */
  const navegarLogin = () => {
    navegar("/login");
  };

  // Antes de empezar -> configurar el servidor de Supabase.

  /**
   * Función para crear cuenta.
   * Se usa  el nombre de usuario y contraseña.
   */
  const crearCuenta = async () => {
    try {
      const { data, error } = await supabaseConexion.auth.signUp({
        email: datosSesion.email,
        password: datosSesion.password,
      });

      if (error) {
        throw error;
      } else {
        setErrorUsuario(
          "Recibirás un correo para la confirmación de la cuenta."
        );
      }
      // Se revisa el objeto data por consola.
      //console.log(data);
    } catch (error) {
      setErrorUsuario(error.message);
    }
    /**
     * El valor de session depende de la configuración del servidor y del valor de la opción
     * Authentication -> Providers -> Email -> Confirm email:
     *    - Si está activada, se devuelve el objeto "user" y "session" es null (no hay sesión),
     *    - Si está desactivada, se devuelve tanto "user" como "session" (sesión iniciada).
     */
  };

  /**
   * Función para iniciar sesión o crear usuario.
   * Si el usuario existe se inicia la sesión en lugar de crearla.
   */
  const iniciarSesionMagicLink = async () => {
    setErrorUsuario(errorUsuarioInicial);
    // Algo más de información en https://supabase.com/docs/guides/auth/auth-magic-link
    try {
      // Función asíncrona para iniciar sesion con el usuario (MagicLink).
      const { data, error } = await supabaseConexion.auth.signInWithOtp({
        email: datosSesion.email,
        /**
         *  No es necesario especificar la ruta de redirección
         *  ya que se encuentra especificada en el servidor.
         *  Es posible indicar una redirección diferente desde aquí si
         *  el diseño de la aplicación así lo requiere.
         * */
        options: {
          emailRedirectTo: "http://localhost:5173/",
        },
      });
      if (error) {
        throw error;
      }
      // Lo reviso por consola.
      //console.log(data);
    } catch (error) {
      setErrorUsuario(error.message);
    }
  };

  /**
   * Función para cerrar la sesión.
   * Funciona con cualquier método de inicio de sesión.
   */
  const cerrarSesion = async () => {
    try {
      // Se cierra la sesión en el servidor de Supabase.
      await supabaseConexion.auth.signOut();
      // Se redirige la aplicación a la parte pública (<Login>).
      navegarLogin();
      setSesionIniciada(false);
    } catch (error) {
      setErrorUsuario(error.message);
    }
  };

  /**
   * Función para obtener los datos del usuario que ha iniciado
   * la sesión y actualizar el estado.
   */
  const obtenerUsuario = async () => {
    try {
      const { data, error } = await supabaseConexion.auth.getUser();

      if (error) {
        throw error;
      }

      setUsuario(data.user);

      /* Imprimir usuarios por consola (data y estado).
      console.log(estado);
      console.log(data.user); */
    } catch (error) {
      setErrorUsuario(error.message);
      navegarLogin();
    }
  };

  /**
   * Función para actualizar los datos de un formulario
   * al estado "datosSesion".
   * Diseño -> ¿importar desde otro contexto?
   */
  const actualizarDato = (evento) => {
    const { name, value } = evento.target;
    setDatosSesion({ ...datosSesion, [name]: value });
    console.log(datosSesion);
  };

  /** useEffect con las tareas a realizar en la carga del componente. */
  useEffect(() => {
    /**
     * Al iniciar la aplicación (carga de este componente) se debe comprobar
     * si la sesión de usuario está activa. La mejor manera es crear un monitor
     * (listener) hacia la sesión de los servidores de Supabase.
     *
     * El monitor se carga sólo una vez durante el montaje del contexto y queda a la escucha.
     * Por eso se realiza una vez en el useEffect sin dependencias y no es necesario
     * controlar si hay sesión cada vez que se carga un documento
     * (a no ser que se requiera el acceso a una página en concreto).
     *
     * Cada vez que se produzca un cambio en la sesión, se ejecuta el código contenido
     * en la función pasada como parámetro.
     *
     * Son dos los parámetros que recibe esa función (como buen callback que es):
     *    -> session, objeto con los datos de la sesión activa.
     *    -> event, cadena de texto con el nombre del evento que ha ocurrido,
     *       Posibles valores:
     *          -> "INITIAL_SESSION"
     *          -> "SIGNED_IN"
     *          -> "SIGNED_OUT"
     *          -> "PASSWORD_RECOVERY"
     *          -> "TOKEN_REFRESHED"
     *          -> "USER_UPDATED"
     * */
    const suscripcion = supabaseConexion.auth.onAuthStateChange(
      (event, session) => {
        // Se puede utilizar el operador negación para invertir el orden.
        if (session) {
          // Si hay sesión se carga la parte privada de la web.
          navegar("/");
          // Se imprime por consola con fines formativos.
          //console.log(session);
          setSesionIniciada(true);
          // Información del usuario que tiene sesión iniciada.
          obtenerUsuario();
        } else {
          // Si no hay sesión, se redirige a la parte pública de la web.
          navegar("login");
          setSesionIniciada(false);
        }
      }
    );
    // Se revisa el objeto por consola (sólo con fines formativos).
    //console.log(suscripcion);
  }, []);

  // Objeto con la información a exportar.

  const datosAExportar = {
    sesionIniciada,
    errorUsuario,
    crearCuenta,
    iniciarSesionMagicLink,
    cerrarSesion,
    actualizarDato,
  };

  return (
    <ContextoUsuarios.Provider value={datosAExportar}>
      {children}
    </ContextoUsuarios.Provider>
  );
};

export default ProveedorUsuarios;
export { ContextoUsuarios };
