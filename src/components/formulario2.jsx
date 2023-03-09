
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import { Container, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, Button } from '@material-ui/core';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';

const url = 'http://localhost:3000/api/users';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

const Formulario = ({ isOpen, onRequestClose, user }) => {
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

  const updateUser = async () => {
    try {
      const respuesta = await axios.put(`${url}/${form.id}`,  form)
      .then(response => {
        console.log('Usuario actualizado correctamente');
      })
      .catch(error => {
        console.error('Error al actualizar el usuario:', error);
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  // const {  handleSubmit, setValue,  formState: { errors } } = useForm();

  const [form, setForm ] = useState({})
  const updateFormData = (e) => {
    if (e.target) setForm({...form,[e.target.name]: e.target.value})
    else setForm({...form,['telefono']: e})
  }

  // const onSubmit = (data) => {
  //   console.log(data);
  //   return false;
  // };
  const handleSubmit = (event) => {
    event.preventDefault(); // previene el comportamiento predeterminado del evento
    // Código para manejar la acción de enviar el formulario
    if (form.id){

      updateUser();
    }
    else {

    }

  }


  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel='Example Modal'
    >
       <Container >        
        <form onSubmit={handleSubmit} className="formContainer">
    <button className='btnCerrar' onClick={onRequestClose}>Cerrar</button>

        <h2>¿Cuál es tu nombre?</h2>
        <FormControl className="principalInput">
          <InputLabel htmlFor="nombre">Nombre(s)*</InputLabel>
           <Input
            id="nombre"
            type="text"
            name='nombre'
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
            // {...register("email", {required: true,  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
          />

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