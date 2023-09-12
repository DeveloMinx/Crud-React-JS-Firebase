import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig/Firebase";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)

const Create = () => {
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();

  const productCollection = collection(db, "products");

  const store = async (e) => {
    e.preventDefault();
    await addDoc(productCollection, { descripcion: descripcion, stock: stock });
    MySwal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado ',
      showConfirmButton: false,
      timer: 1500
    });
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
          <h1>Crear Producto</h1>

          <form onSubmit={store}>

            <div className="mb-3">
              <label className="form-label">Descripcion</label>
              <input
              value={descripcion}
              onChange={(e)=> setDescripcion(e.target.value)}
              type="text"
              className="form-control"
              >
              </input>
            </div>

            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
              value={stock}
              onChange={(e)=> setStock(e.target.value)}
              type="text"
              className="form-control"
              >
              </input>
            </div>
  
            <button type="submit" className="btn btn-primary">Guardar</button>

          </form>
      </div>
    </div>
  );
};

export default Create;
