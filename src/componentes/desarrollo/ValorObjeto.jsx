import React, { Fragment } from "react";
import "./ValorObjeto.css";

const ValorObjeto = ({ objeto }) => {
  return (
    <Fragment>
      <div className='estado'>
        <p>Únicamente con fines informativos (no hacer nunca).</p>
        <pre>{JSON.stringify(objeto, null, 2)}</pre>
      </div>
    </Fragment>
  );
};

export default ValorObjeto;
