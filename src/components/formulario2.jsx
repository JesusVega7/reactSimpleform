
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import { Container, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, Button } from '@material-ui/core';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { useForm } from 'react-hook-form';


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

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [form, setForm ] = useState({})
  let buttonLabel;
  const updateFormData = (e) => {
    if (e.target) setForm({...form,[e.target.name]: e.target.value})
    else setForm({...form,['telefono']: e})
  }

  const onSubmit = (data) => {
    console.log(data);
  };


  useEffect(() => {
    if (user) {
      setForm(user);
      buttonLabel= 'Guardar';
    } else {
      buttonLabel= 'Crear';
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
        <form onSubmit={handleSubmit(onSubmit)} className="formContainer">
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
            // {...register("nombre", { required: true })}
          />
          {errors.nombre?.type === 'required' && <FormHelperText className="errorText">Este campo es requerido</FormHelperText>}

        </FormControl>
    
        <FormControl className="principalInput">
          <InputLabel htmlFor="apellidoPaterno">Apellido Paterno*</InputLabel>
          <Input
            id="apellidoPaterno"
            type="text"
            name='apellidoPaterno'
            value={form.apellidoPaterno}
            onChange={updateFormData}
            {...register("apellidoPaterno", { required: true })}
          />
          {errors.apellidoPaterno?.type === 'required' && <FormHelperText className="errorText">Este campo es requerido</FormHelperText>}
        </FormControl>
    
        <FormControl className="principalInput">
          <InputLabel htmlFor="apellidoMaterno">Apellido Materno*</InputLabel>
          <Input
            id="apellidoMaterno"
            name='apellidoMaterno'
            type="text"
            value={form.apellidoMaterno}
            onChange={updateFormData}
            {...register("apellidoMaterno", { required: true })}
          />
          {errors.apellidoMaterno?.type === 'required' && <FormHelperText className="errorText">Este campo es requerido</FormHelperText>}
        </FormControl>
        
    
        <h2 className='mt-3'>Datos de contacto</h2>
        <FormControl className="principalInput">
          <select
            // labelId="genero-label"
            id="genero"
            name='genero'
            value={form.genero}
            onChange={updateFormData}
            {...register("genero", { required: true })}
          >
            {generoOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.genero?.type === 'required' && <FormHelperText className="errorText">Este campo es requerido</FormHelperText>}
        </FormControl>
    
        <FormControl className="principalInput">
          <PhoneInput
            className='phoneInput'
            name='telefono'
            placeholder="Ingrese su número de teléfono*"
            value={form.telefono}
            onChange={updateFormData}
            {...register("telefono", { required: true })}
          />
          {errors.telefono?.type === 'required' && <FormHelperText className="errorText">Este campo es requerido</FormHelperText>}
        </FormControl>

          
        <FormControl className="principalInput">
          <InputLabel htmlFor="email">Email*</InputLabel>
          <Input
            id="email"
            name='correo'
            type="text"
            value={form.correo}
            onChange={updateFormData}
            {...register("email", {required: true,  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
          />
          {errors.email?.type === 'required' && <FormHelperText className="errorText">Este campo es requerido</FormHelperText>}
          {errors.email?.type === 'pattern' && <FormHelperText className="errorText">El formato es incorrecto</FormHelperText>}
        </FormControl>
    
        <Button className="btnS" variant="contained" color="primary" type="submit" >
          {buttonLabel}
        </Button>
      </form>
    </Container>
    </Modal>
  );
};

export default Formulario;