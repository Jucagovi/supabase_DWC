import React, { Fragment } from "react";
import InicioSesion from "./InicioSesion";
import "./Cabecera.css";

const Cabecera = () => {
  return (
    <Fragment>
      <header>
        <h1>UT06 Almacenamiento con Supabase</h1>
        <div className='inicioSesion'>
          <InicioSesion />
        </div>
      </header>
    </Fragment>
  );
};

export default Cabecera;
