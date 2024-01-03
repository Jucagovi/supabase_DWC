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
        <Link className='enlace' to='/listado'>
          Listado
        </Link>
      </nav>
    </Fragment>
  );
};

export default Navegacion;
