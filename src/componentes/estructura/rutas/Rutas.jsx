import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../../../paginas/Inicio.jsx";
import Error from "../../../paginas/Error.jsx";
import Listado from "../../../paginas/Listado.jsx";
import Creacion from "../../../paginas/Creacion.jsx";

const Rutas = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='listado' element={<Listado />} />
        <Route path='creacion' element={<Creacion />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Fragment>
  );
};

export default Rutas;
