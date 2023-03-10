import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Formulario from './formulario2';


const UsuariosTabla = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const url = 'http://localhost:3000/api/users';
    const [users, setUsers] = useState([]);


    useEffect(() => {
        getUsers();
      }, []);
      
      const getUsers = async () => {
        try {
          const respuesta = await axios.get(url);
          setUsers(respuesta.data.data);
        } catch (error) {
          console.log(error);
        }
      };

      const deleteUser = async (user) => {
        try {
          const respuesta = await axios.delete(`${url}/${user.id}`);
          if (respuesta) {
            setUsers(users.filter((u) => u.id !== user.id));
            toast.success('usuario eliminado correctamente');
          }
        } catch (error) {
          toast.error('error eliminando', error);
        }
      };

      const [selectedUser, setSelectedUser] = useState(null);

      const handleEdit = (user) => {
        setSelectedUser(user);
        setModalIsOpen(true);
      };

      const handleCreate = () => {
        console.log('hndlcreate')
        setSelectedUser(null);

        setModalIsOpen(true);
      };

      const handleDelete = (user) => {
        deleteUser(user);
        
      };
      
      const actualizarTabla = (newData, type) => {
        if (type === 'create') setUsers([...users, newData]);
        if (type === 'edit') {
          let temporalArray = [...users]; 
          const index = temporalArray.findIndex(user=> user.id === newData.id) ;
          if (index !== -1) {
            temporalArray[index] = newData;
            setUsers([...temporalArray])
          }
        
        }
      };
      
  return (
    <div className='App'>
        <div className='container-fluid'>
            <div className='row mt-3'>
                <div className='col-md-4 offset-md-4'>
                    <div className='d-grid mx-auto'>
                        <button className='btn btn-dark' onClick={() => {handleCreate()}}>
                            <i className='fa-solid fa-circle-plus'></i> A??adir
                        </button>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                    <div className='table-responsive'>
                      <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido Paterno</th>
                                <th>Apellido Materno</th>
                                <th>Genero</th>
                                <th>Telefono</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {users.map( (user,i)=> (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nombres}</td>
                                    <td>{user.apellidoPaterno}</td>
                                    <td>{user.apellidoMaterno}</td>
                                    <td>{user.genero}</td>
                                    <td>{user.telefono}</td>
                                    <td>{user.correo}</td>
                                    <td>
                                        <button className='btn btn-warning' onClick={() => {handleEdit(user)}}>
                                            <i className='fa-solid fa-edit'></i>
                                        </button>
                                        
                                        &nbsp;
                                        <button className='btn btn-danger' onClick={() => {handleDelete(user)}}>
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))

                            }
                        </tbody>
                      </table>

                      <Formulario actualizarTabla={actualizarTabla} id='modalForm' isOpen={modalIsOpen}  onRequestClose={() => setModalIsOpen(false)} user={selectedUser}>

                      </Formulario>
                    </div>
                </div>
            </div>

        </div>

  
    </div>
  )
}

export default UsuariosTabla