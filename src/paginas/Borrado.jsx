import React, { Fragment } from "react";
import ListadoFeos from "../componentes/ListadoFeos.jsx";

const Borrado = () => {
  return (
    <Fragment>
      <h2>Borrado de feos.</h2>
      <ListadoFeos borrado={true} />
    </Fragment>
  );
};

export default Borrado;
