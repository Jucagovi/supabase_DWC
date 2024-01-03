import { useContext } from "react";
import { ContextoFeos } from "../contextos/ProveedorFeos.jsx";

const useFeos = () => {
  const contexto = useContext(ContextoFeos);
  return contexto;
};

export default useFeos;
