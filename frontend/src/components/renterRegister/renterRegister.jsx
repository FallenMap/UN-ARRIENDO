import { Link } from "react-router-dom";
import styles from "../../css/renterRegister.module.css";
import { ButtonRegister } from "./buttonRegister";
import { Description } from "./description";
import { FormGroup } from "./formGroup";
import { LinksPage } from "./linksPage";
import { ListGender } from "./selectGender";
import { TitleRegister } from "./titleRenterRegister";
import ButtonUploadPhoto from "./buttonUploadPhoto";
import { userRegisterHandlerOnSubmit } from "../../controllers/userActionsController";

import { Stack } from "@mui/material";
import { Container } from "@mui/system";

import useAuth from "../../auth/useAuth";
import { changeTitle } from "../../utilities/changeTitle";
import { changeBackground } from "../../utilities/changeBackground";
import { useNavigate } from "react-router-dom";
import { formAllDataUser } from "../../adapters/formAdapters";
import { useState } from "react";


const validate = (data) => {
  const errors = {};

  if (!data[formAllDataUser.name]) {
    errors[formAllDataUser.name] = "*Este campo no puede estar vacio";
  } else if (/\d/.test(data[formAllDataUser.name])) {
    errors[formAllDataUser.name] = "*Este campo no puede contener numeros";
  } else {
    delete errors[formAllDataUser.name];
  }

  if (!data[formAllDataUser.lastName]) {
    errors[formAllDataUser.lastName] = "*Este campo no puede estar vacio";
  } else if (/\d/.test(data[formAllDataUser.lastName])) {
    errors[formAllDataUser.lastName] = "*Este campo no puede contener numeros";
  } else {
    delete errors[formAllDataUser.lastName];
  }

  if (!data[formAllDataUser.lastName]) {
    errors[formAllDataUser.lastName] = "*Este campo no puede estar vacio";
  } else if (/\d/.test(data[formAllDataUser.lastName])) {
    errors[formAllDataUser.lastName] = "*Este campo no puede contener numeros";
  } else {
    delete errors[formAllDataUser.lastName];
  }

  if (!data[formAllDataUser.email]) {
    errors[formAllDataUser.email] = "*Este campo no puede estar vacio";
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(data[formAllDataUser.email])) {
    errors[formAllDataUser.email] = "*El valor ingresado no corresponde con el formato de un correo electronico. Ejemplo: user@example.com";
  } else {
    delete errors[formAllDataUser.email];
  }

  if (!data[formAllDataUser.phone]) {
    errors[formAllDataUser.phone] = "*Este campo no puede estar vacio";
  } else if (!/3[0-9]{9}/.test(data[formAllDataUser.phone])) {
    errors[formAllDataUser.phone] = "*El numero ingresado no es valido. Recuerde que debe tener una longitud minima de 10 numeros y debe empezar por 3.";
  } else {
    delete errors[formAllDataUser.phone];
  }

  if (!data[formAllDataUser.username]) {
    errors[formAllDataUser.username] = "*Este campo no puede estar vacio";
  } else if (!/[A-Za-z][A-Za-z0-9_]{7,29}/.test(data[formAllDataUser.username])) {
    errors[formAllDataUser.username] = "*El usuario debe ser de minimo 7 y maximo 20 caracteres de longitud.";
  } else {
    delete errors[formAllDataUser.username];
  }

  if (!data[formAllDataUser.username]) {
    errors[formAllDataUser.username] = "*Este campo no puede estar vacio";
  } else if (!/[A-Za-z][A-Za-z0-9_]{7,29}/.test(data[formAllDataUser.username])) {
    errors[formAllDataUser.username] = "*El usuario debe ser de minimo 7 y maximo 20 caracteres de longitud.";
  } else {
    delete errors[formAllDataUser.username];
  }

  if (!data[formAllDataUser.password]) {
    errors[formAllDataUser.password] = "*Este campo no puede estar vacio";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(data[formAllDataUser.password])) {
    errors[formAllDataUser.password] = "*La contraseña debe tener minimo 8 caracteres de longitud, de los cuales minimo uno debe ser una letra y uno un numero.";
  } else {
    delete errors[formAllDataUser.password];
  }

  if (!data[formAllDataUser.description]) {
    errors[formAllDataUser.description] = "*La descripcion no puede estar vacia.";
  } else if (data[formAllDataUser.description]?.split(" ").length < 5) {
    errors[formAllDataUser.description] = "*La descripcion debe tener minimo 5 palabras.";
  } else {
    delete errors[formAllDataUser.description];
  }

  if (!data[formAllDataUser.birthDate]) {
    errors[formAllDataUser.birthDate] = "*Debes seleccionar una fecha";
  } else {
    delete errors[formAllDataUser.birthDate];
  }

  if (!data[formAllDataUser.photo]) {
    errors[formAllDataUser.photo] = "*Debes seleccionar una foto";
  } else {
    delete errors[formAllDataUser.photo];
  }

  return errors;
}


export function RenterRegister() {
  changeTitle("Registro de Arrendador");
  changeBackground("https://ingenieria.bogota.unal.edu.co/images/recursos/noticias/viejito-01.png");

  const [control, setControl] = useState({ errors: {} });

  const auth = useAuth();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const { errors, ...data } = control;
    const result = validate(data);
    if (Object.keys(result).length > 0) {
      return setControl({ ...control, errors: result });
    } else {
      setControl({ ...control, errors: result });
    }
    userRegisterHandlerOnSubmit(e, auth, navigate, "landlord");
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setControl({ ...control, [name]: value });
  }


  return (
    <>

      <LinksPage />
      <Container style={{
        maxWidth: "500px"
      }}>
        <Stack spacing={2}>
          <TitleRegister title="Registro de Arrendador" />
          <Container style={{
            maxWidth: "400px",
            margin: "5% auto",
            background: "rgba(0, 0, 0, 0.8)",
            borderRadius: "10px",
            padding: "40px 40px"
          }} display="flex">
            <form className="form-horizontal" onSubmit={submitHandler}>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of name*/}
                <FormGroup handleChange={handleChange} errors={control.errors} name={formAllDataUser.name} placeholder="Ingresa tu nombre" title="Nombres" image="fa fa-user fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of lastName*/}
                <FormGroup handleChange={handleChange} errors={control.errors} name={formAllDataUser.lastName} placeholder="Ingresa tus apellidos" title="Apellidos" image="fa fa-user fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of Email*/}
                <FormGroup handleChange={handleChange} errors={control.errors} name={formAllDataUser.email} placeholder="Ingresa tu correo electrónico" title="Tu correo electrónico" image="fa fa-envelope fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of Phone*/}
                <FormGroup handleChange={handleChange} errors={control.errors} name={formAllDataUser.phone} placeholder="Ingresa tu número de contacto" title="Número de contacto" image="fa fa-phone fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call Description component */}
                <Description handleChange={handleChange} errors={control.errors} />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of username*/}
                <FormGroup handleChange={handleChange} errors={control.errors} name={formAllDataUser.username} placeholder="Ingresa tu usuario" title="Usuario" image="fa fa-users fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call ListGenre component */}
                <ListGender />
              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of password with type different for security*/}
                <FormGroup handleChange={handleChange} errors={control.errors} name={formAllDataUser.password} placeholder="Ingresa tu contraseña" title="Contraseña" image="fa fa-lock fa" type="password" />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of password with type different for security*/}
                <FormGroup handleChange={handleChange} errors={control.errors} name={formAllDataUser.birthDate} title="Nacimiento" image="fa fa-birthday-cake" type="date" />

              </div>

              <div className={styles.formGrup}>

                {/* Call ButtonUploadPhoto component with it own photo */}
                <ButtonUploadPhoto handleChange={handleChange} name={formAllDataUser.photo} />
                {control.errors?.[formAllDataUser.photo] && <p style={{ color: "red" }}>{`${control.errors?.[formAllDataUser.photo]}`}</p>}
              </div>

              <div className={styles.formGroup}>

                {/* Call ButtonRegister component with one argument */}
                <ButtonRegister loginButton="Registrar" />

              </div>

              <div className={styles.loginRegister}>

                {/* Create redirect text to login */}
                <Link to="/">Regresar </Link>

              </div>

            </form>
          </Container>
        </Stack>
      </Container>
    </>
  );
}
