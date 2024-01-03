import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Navegacion.css";

const Navegacion = () => {
  return (
    <Fragment>
      <nav>
        <Link className='enlace' to='/'>
          Inicio
        </Link>
      </nav>
    </Fragment>
  );
};

export default Navegacion;
