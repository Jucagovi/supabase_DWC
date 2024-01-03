import React, { Fragment } from "react";
import useFeos from "../hooks/useFeos.js";
import ListadoFeoSencillo from "./ListadoFeoSencillo.jsx";

const ListadoFeos = ({ borrado }) => {
  const { listadoFeos, situacion, obtenerFeo, borrarFeo } = useFeos();
  return (
    <Fragment>
      <div
        id='act-listado'
        /**
         * Se utilia un parámetro en el componente para indicar la acción a
         * realizar cuando se pulse sobre algún registro.
         *
         * De esta forma se consiguen componentes reutilizables. Ahora bien,
         * no hay que abusar de este método y llenar los componentes
         * de parámetros. A veces es mejor crear un componente nuevo que
         * realice la nueva acción.
         *
         * Otra solución es pasarle la función que se va a ejecutar en el
         * evento. Es buen opción si hay más de dos opciones ya que, de no
         * ser así, la lógica se complicaría (la sentencia alternativa de abajo).
         */
        onClick={(e) => {
          // Si se ha elegido la opción de "borrado=true"...
          if (borrado) {
            if (e.target.classList.contains("feo")) {
              // Se confirma la acción de borrado.
              const aceptado = confirm(
                `¿Desea borrar al feo ${e.target.innerHTML}?`
              );
              if (aceptado) {
                borrarFeo(e.target.id);
              }
            }
            borrarFeo(e.target.id);
            // Si no se ha elegido la opción de borrado...
          } else {
            if (e.target.classList.contains("feo")) obtenerFeo(e.target.id);
          }
        }}
      >
        <h3>Listado feos.</h3>
        {listadoFeos.length
          ? listadoFeos.map((valor, indice, array) => {
              return <ListadoFeoSencillo key={valor.id} datos={valor} />;
            })
          : situacion}
      </div>
    </Fragment>
  );
};

export default ListadoFeos;
