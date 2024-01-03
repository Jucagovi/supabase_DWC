import React, { Fragment, useState, useEffect } from "react";
import { supabaseConexion } from "../../config/supabase.js";
import ValorObjeto from "./ValorObjeto.jsx";

/**
 * El código contenido en este
 */

const PruebaConexion = () => {
  return (
    <Fragment>
      <h3>Prueba para comprobar la conexión a la base de datos.</h3>
      <ValorObjeto objeto={supabaseConexion} />
    </Fragment>
  );
};

export default PruebaConexion;
