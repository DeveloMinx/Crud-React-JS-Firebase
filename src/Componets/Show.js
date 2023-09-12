import {useState,useEffect, Fragment} from 'react';

//Importamos la libreria de rutas
import {Link} from 'react-router-dom';
import{doc,getDocs,deleteDoc, collection} from 'firebase/firestore';
import {db} from '../FirebaseConfig/Firebase';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)


const Show = () => {
    //Configuramos los hooks
    const [products,setProducts] =useState([]);
    //referenciamos la db de firestore
    const productsColectios = collection(db,"products")
    ///funcion para mostrar todo el contenido del doc
    const getProducts = async ()=>{
       const data = await getDocs(productsColectios)
       setProducts(
        data.docs.map((doc) => ({...doc.data(),id:doc.id}))
       )
    }
    ///Funcion para confirmar eliminar
    const confirmDelete = (id,descripcion)=>{
        MySwal.fire({
            title: 'Esta seguro?',
            text: `Vas a eliminar el producto "${descripcion}"`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
                MySwal.fire(
                'Eliminado!',
                'El producto fue eliminado.',
                'success'
              )
            }
          })
    }
    ///Funcion para eliminar
    const deleteProduct = async (id) =>{
        const prodctDoc = doc(db, "products",id)
        await deleteDoc(prodctDoc)
        getProducts()
    }

    //Usamos UseEfects
    useEffect(()=>{
        getProducts()
    },[])



  return (
    <>
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='d-grid- gap-2'>
                    <Link to="/crear" className='btn btn-secondary mt-2 mb-2'>Crear</Link>
                    </div>
                
                <table className='table table-dark table-hover'>
                    <thead>
                        <tr>
                            <td>Descripcion</td>
                            <td>Stock</td>
                            <td>Accion</td>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) =>(
                            <tr key={product.id}>
                                <td>{product.descripcion}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <Link to={`/editar/${product.id}`} className='btn btn-light'><i className="fa-solid fa-pen-to-square"></i></Link>
                                    <button onClick={() =>{confirmDelete(product.id,product.descripcion)}} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>

                        ))}
                    </tbody>

                </table>

                </div>
            </div>
        </div>

    </>

  )
}

export default Show