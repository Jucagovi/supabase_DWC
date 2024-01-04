import React, { Fragment } from "react";
import "./ListadoFeosSencillo.css";
import ListadoFeoSencillo from "./ListadoFeoSencillo.jsx";
import useFeos from "../hooks/useFeos.js";

const ListadoFeosSencillo = () => {
  const {
    listadoFeos,
    situacion,
    obtenerListadoSencillo,
    filtrarFeos,
    ordenarFeos,
  } = useFeos();

  return (
    <Fragment>
      <div id='listadoSencillo'>
        <div className='lis-caja'>
          <h3>Listado de Feos.</h3>
          {listadoFeos.length
            ? listadoFeos.map((valor, indice, array) => {
                return <ListadoFeoSencillo key={valor.id} datos={valor} />;
              })
            : situacion}
        </div>
        <div className='lis-caja'>
          <button
            onClick={() => {
              obtenerListadoSencillo();
            }}
          >
            Cargar feos
          </button>
          <button
            onClick={() => {
              ordenarFeos(true);
            }}
          >
            Ordenar feos ascendentemente
          </button>
          <button
            onClick={() => {
              ordenarFeos(false);
            }}
          >
            Ordenar feos descendentemente
          </button>
          <button
            onClick={() => {
              filtrarFeos();
            }}
          >
            Filtrar feos de Burkina Faso
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ListadoFeosSencillo;
