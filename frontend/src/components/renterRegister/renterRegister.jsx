import { Link } from "react-router-dom";
import styles from "../../css/renterRegister.module.css";
import { ButtonRegister } from "./buttonRegister";
import { Description } from "./description";
import { FormGroup } from "./formGroup";
import { LinksPage } from "./linksPage";
import { ListGender } from "./selectGender";
import { TitleRegister } from "./titleRenterRegister";
import ButtonUploadPhoto from "./buttonUploadPhoto";
import {userRegisterHandlerOnSubmit} from "../../controllers/userActionsController";

import { Stack } from "@mui/material";
import { Container } from "@mui/system";

import useAuth from "../../auth/useAuth";
import { changeTitle } from "../../utilities/changeTitle";
import { useNavigate } from "react-router-dom";
import { formAllDataUser } from "../../adapters/formAdapters";


export function RenterRegister() {
  changeTitle("Registro de Arrendador");

  const auth = useAuth();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    userRegisterHandlerOnSubmit(e, auth, navigate, "landlord");
  };

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
                <FormGroup name={formAllDataUser.name} placeholder="Ingresa tu nombre" title="Nombres" image="fa fa-user fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of lastName*/}
                <FormGroup name={formAllDataUser.lastName} placeholder="Ingresa tus apellidos" title="Apellidos" image="fa fa-user fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of Email*/}
                <FormGroup name={formAllDataUser.email} placeholder="Ingresa tu correo electrónico" title="Tu correo electrónico" image="fa fa-envelope fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of Phone*/}
                <FormGroup name={formAllDataUser.phone} placeholder="Ingresa tu número de contacto" title="Número de contacto" image="fa fa-phone fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call Description component */}
                <Description />
                
              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of username*/}
                <FormGroup name={formAllDataUser.username} placeholder="Ingresa tu usuario" title="Usuario" image="fa fa-users fa" type="text" />
                
              </div>

              <div className={styles.formGroup}>

                {/* Call ListGenre component */}
                <ListGender />
              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of password with type different for security*/}
                <FormGroup name={formAllDataUser.password} placeholder="Ingresa tu contraseña" title="Contraseña" image="fa fa-lock fa" type="password" />

              </div>
              
              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of password with type different for security*/}
                <FormGroup name={formAllDataUser.birthDate} placeholder="Ingresa tu fecha de nacimiento" title="Nacimiento" image="fa fa-birthday-cake" type="date" />

              </div>

              <div className={styles.formGrup}>

                {/* Call ButtonUploadPhoto component with it own photo */}
                <ButtonUploadPhoto name={formAllDataUser.photo} />

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
