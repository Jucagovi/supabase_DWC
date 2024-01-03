import React, { Fragment } from "react";
import ListadoFeosSencillo from "../componentes/ListadoFeosSencillo.jsx";

const Listado = () => {
  return (
    <Fragment>
      <h2>Listado</h2>
      <p>Un listado sencillo de la tabla Feos desde Supabase.</p>
      <ListadoFeosSencillo />
    </Fragment>
  );
};

export default Listado;
