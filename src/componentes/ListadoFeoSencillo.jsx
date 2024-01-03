import React, { Fragment } from "react";
import "./ListadoFeoSencillo.css";

const ListadoFeoSencillo = (props) => {
  const { id, name, email, country } = props.datos;

  return (
    <Fragment>
      <div className='feo' id={id}>
        {name} - {email} ({country})
      </div>
    </Fragment>
  );
};

export default ListadoFeoSencillo;
