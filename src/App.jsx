import React, { Fragment } from "react";
import "./App.css";
import Cabecera from "./componentes/estructura/Cabecera.jsx";
import ProveedorFeos from "./contextos/ProveedorFeos.jsx";
import Navegacion from "./componentes/estructura/Navegacion.jsx";
import Principal from "./componentes/estructura/Principal.jsx";
import Pie from "./componentes/estructura/Pie.jsx";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <ProveedorFeos>
          <main>
            <Cabecera />
            <Navegacion />
            <Principal />
            <Pie />
          </main>
        </ProveedorFeos>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
