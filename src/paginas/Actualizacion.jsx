import React, { Fragment } from "react";
import "./Actualizacion.css";
import ListadoFeos from "../componentes/LIstadoFeos.jsx";
import FormularioFeo from "../componentes/FormularioFeo.jsx";

const Actualizacion = () => {
  return (
    <Fragment>
      <h2>Actualización de feos.</h2>
      <div id='act'>
        <ListadoFeos />
        <FormularioFeo />
      </div>
    </Fragment>
  );
};

export default Actualizacion;
