
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import { Container, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, Button } from '@material-ui/core';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

const url = 'http://localhost:3000/api/users';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    background: 'none', 
    overflow: 'none'
  }
};

Modal.setAppElement('#root');

const Formulario = ({ isOpen, onRequestClose, user, actualizarTabla }) => {
    const generoOptions = [
      {
        value: '',
        label: 'Selecciona un genero',
      },
    {
      value: 'Masculino',
      label: 'Masculino',
    },
    {
      value: 'Femenino',
      label: 'Femenino',
    },
    {
      value: 'No Binario',
      label: 'No Binario',
    },
    {
      value: 'Otro',
      label: 'Otro',
    },
  ];

  let emailInvalid =false;
  let formInvalid =false;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  const updateUser = async () => {
    try {
      const respuesta = await axios.put(`${url}/${form.id}`,  form)
      .then(response => {
        toast.success('usuario actualizado correctamente')
        actualizarTabla(response.data.data, 'edit');
        handleClose()

        console.log('Usuario actualizado correctamente');
      })
      .catch(error => {
        console.error('Error al actualizar el usuario:', error);
      });
      
    } catch (error) {
      toast.error('error al actualizar el usuario', error);
    }
  };

  const createUser = async () => {
    try {
      const respuesta = await axios.post(url,  form)
      .then(response => {
        toast.success('usuario creado correctamente')
        actualizarTabla(response.data.data, 'create');
        handleClose()
      })
      .catch(error => {
        toast.error('Error al crear el usuario:', error);
      });
      
    } catch (error) {
      console.log(error);
    }
  };


  const [form, setForm ] = useState({})
  const updateFormData = (e) => {
    if (e.target) setForm({...form,[e.target.name]: e.target.value})
    else setForm({...form,['telefono']: e})
  }


  const handleSubmit = (event) => {
 
    event.preventDefault(); 

    if (Object.keys(form).length ){
      Object.keys(form).forEach(element => {
        if (element == "correo" && !(/\S+@\S+\.\S+/.test(form[element]))){
        emailInvalid = true;
        } 
      });
    } else formInvalid = true;

    
    if (formInvalid) toast.error('favor de llenar todos los campos');
    if (emailInvalid) toast.error('el email tiene un formato invalido');
    if (!formInvalid && !emailInvalid){

      console.log(formInvalid, emailInvalid, 'asd')
      if (form.id)updateUser();
      else createUser();
    }
   
  }
  const handleClose  = ()=>{
    setForm({})
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel='Example Modal'
    >
       <Container >        
        <form onSubmit={handleSubmit} className="formContainer">
    <button className='btnCerrar' onClick={handleClose}>Cerrar</button>

        <h2>¿Cuál es tu nombre?</h2>
        <FormControl className="principalInput">
          <InputLabel htmlFor="nombre">Nombre(s)*</InputLabel>
           <Input
            id="nombre"
            type="text"
            name='nombres'
            value={form.nombres}
            onChange={updateFormData}
          />

        </FormControl>
    
        <FormControl className="principalInput">
          <InputLabel htmlFor="apellidoPaterno">Apellido Paterno*</InputLabel>
          <Input
            id="apellidoPaterno"
            type="text"
            name='apellidoPaterno'
            value={form.apellidoPaterno}
            onChange={updateFormData}
          />
        </FormControl>
    
        <FormControl className="principalInput">
          <InputLabel htmlFor="apellidoMaterno">Apellido Materno*</InputLabel>
          <Input
            id="apellidoMaterno"
            name='apellidoMaterno'
            type="text"
            value={form.apellidoMaterno}
            onChange={updateFormData}
          />
        </FormControl>
        
    
        <h2 className='mt-3'>Datos de contacto</h2>
        <FormControl className="principalInput">
          <select
            // labelId="genero-label"
            id="genero"
            name='genero'
            value={form.genero}
            onChange={updateFormData}
          >
            {generoOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormControl>
    
        <FormControl className="principalInput">
          <PhoneInput
            className='phoneInput'
            name='telefono'
            placeholder="Ingrese su número de teléfono*"
            value={form.telefono}
            onChange={updateFormData}
          />
        </FormControl>

          
        <FormControl className="principalInput">
          <InputLabel htmlFor="email">Email*</InputLabel>
          <Input
            id="email"
            name='correo'
            type="text"
            value={form.correo}
            onChange={updateFormData}
          />
         {emailInvalid && <FormHelperText className="errorText">El formato es incorrecto</FormHelperText>}
        </FormControl>
    
        <Button className="btnS" variant="contained" color="primary" type="submit" >
              Guardar
        </Button>
      </form>
    </Container>
    </Modal>
    
  );
};

export default Formulario;