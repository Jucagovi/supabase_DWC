import React, { Fragment } from "react";
import "./App.css";
import Cabecera from "./componentes/estructura/Cabecera.jsx";
import ProveedorFeos from "./contextos/ProveedorFeos.jsx";
import Navegacion from "./componentes/estructura/Navegacion.jsx";
import Principal from "./componentes/estructura/Principal.jsx";
import Pie from "./componentes/estructura/Pie.jsx";
import { BrowserRouter } from "react-router-dom";
import Login from "./paginas/Login.jsx";
import ProveedorUsuarios from "./contextos/ProveedorUsuarios.jsx";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <ProveedorUsuarios>
          <main>
            <Cabecera />
            <Navegacion />
            <ProveedorFeos>
              <Principal />
            </ProveedorFeos>
            <Pie />
          </main>
        </ProveedorUsuarios>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
