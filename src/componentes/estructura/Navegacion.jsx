import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Navegacion.css";
import useUsuarios from "../../hooks/useUsuarios";

const Navegacion = () => {
  const { sesionIniciada } = useUsuarios();
  return (
    <Fragment>
      <nav>
        {sesionIniciada && (
          <>
            <Link className='enlace' to='/'>
              Inicio
            </Link>
            <Link className='enlace' to='/listado'>
              Listado
            </Link>
            <Link className='enlace' to='/creacion'>
              Creación
            </Link>
            <Link className='enlace' to='/actualizacion'>
              Actualización
            </Link>
            <Link className='enlace' to='/borrado'>
              Borrado
            </Link>
          </>
        )}
      </nav>
    </Fragment>
  );
};

export default Navegacion;
