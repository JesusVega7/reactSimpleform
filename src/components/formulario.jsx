
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

  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  
  useEffect(() => {
    if (user) {
      setNombre(user.nombres);
      setApellidoPaterno(user.apellidoPaterno);
      setApellidoMaterno(user.apellidoMaterno);
      setGenero(user.genero);
      setEmail(user.correo);
      setTelefono(user.telefono);
    }
  }, [user]);

  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const [touchedFields, setTouchedFields] = useState({});

  const handleBlur = (event) => {
    const fieldName = event?.target?.name || '';
    // setTouchedFields(prevTouchedFields => ({ ...prevTouchedFields, [fieldName]: true }));
    trigger(fieldName); // Actualizar el estado de formState.touched
  };

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
            onBlur={handleBlur}
            value={nombre }
            onChange={(event) => setNombre(event.target.value)}
            
            {...register("nombre", { required: true })}
          />
          {errors.nombre?.type === 'required' && <FormHelperText className="errorText">Este campo es requerido</FormHelperText>}

        </FormControl>
    
        <FormControl className="principalInput">
          <InputLabel htmlFor="apellidoPaterno">Apellido Paterno*</InputLabel>
          <Input
            id="apellidoPaterno"
            type="text"
            onBlur={handleBlur}
            value={apellidoPaterno}
            onChange={(event) => setApellidoPaterno(event.target.value)}
            {...register("apellidoPaterno", { required: true })}
          />
          {errors.apellidoPaterno?.type === 'required' && <FormHelperText className="errorText">Este campo es requerido</FormHelperText>}

        </FormControl>
    
        <FormControl className="principalInput">
          <InputLabel htmlFor="apellidoMaterno">Apellido Materno*</InputLabel>
          <Input
            id="apellidoMaterno"
            type="text"
            onBlur={handleBlur}
            value={apellidoMaterno}
            onChange={(event) => setApellidoMaterno(event.target.value)}
            {...register("apellidoMaterno", { required: true })}
          />
          {errors.apellidoMaterno?.type === 'required' && <FormHelperText className="errorText">Este campo es requerido</FormHelperText>}

        </FormControl>
        
    
        <h2>Datos de contacto</h2>
        <FormControl className="principalInput">
          <InputLabel id="genero-label">Género*</InputLabel>
          <Select
            labelId="genero-label"
            id="genero"
            onBlur={handleBlur}
            value={genero}
            onChange={(event) => setGenero(event.target.value)}
            {...register("genero", { required: true })}
          >
            {generoOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors.genero?.type === 'required' && <FormHelperText className="errorText">Este campo es requerido</FormHelperText>}

        </FormControl>
    
        <FormControl className="principalInput">
          <PhoneInput
            className='phoneInput'
            placeholder="Ingrese su número de teléfono*"
            onBlur={handleBlur}
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
            {...register("telefono", { required: true })}
          />
          {errors.telefono?.type === 'required' && <FormHelperText className="errorText">Este campo es requerido</FormHelperText>}
        </FormControl>

          
        <FormControl className="principalInput">
          <InputLabel htmlFor="email">Email*</InputLabel>
          <Input
            id="email"
            type="text"
            onBlur={handleBlur}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            {...register("email", {required: true,  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
          />
          {errors.email?.type === 'required' && <FormHelperText className="errorText">Este campo es requerido</FormHelperText>}
          {errors.email?.type === 'pattern' && <FormHelperText className="errorText">El formato es incorrecto</FormHelperText>}

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