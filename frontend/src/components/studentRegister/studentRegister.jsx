import { Link } from "react-router-dom";
import styles from "../../css/studentRegister.module.css";
import { ButtonRegister } from "../renterRegister/buttonRegister";
import { FormGroup } from "../renterRegister/formGroup";
import { LinksPage } from "../renterRegister/linksPage";
import { ListGender } from "../renterRegister/selectGender";
import { TitleStudent } from "./titleStudent";
import ButtonUploadPhoto from "../renterRegister/buttonUploadPhoto";
import {userRegisterHandlerOnSubmit} from "../../controllers/userActionsController";

import { Stack } from "@mui/material";
import { Container } from "@mui/material";

import useAuth from "../../auth/useAuth";
import { changeTitle } from "../../utilities/changeTitle";
import { useNavigate } from "react-router-dom";
import { formAllDataUser } from "../../adapters/formAdapters";


export function StudentRegister() {

  changeTitle("Registro de estudiante");

  const auth = useAuth();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    userRegisterHandlerOnSubmit(e, auth, navigate, "tenant");
  };

  return (
    <>

      <LinksPage />
      <Container style={{
        maxWidth: "500px"
      }}>
        <Stack spacing={2}>

          {/* Call titleStudent component */}
          <TitleStudent title="Registro de estudiante" />
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
                <FormGroup name={formAllDataUser.name} placeholder="Ingresa tu nombre" title="Nombre" image="fa fa-user fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of LastName*/}
                <FormGroup name={formAllDataUser.lastName} placeholder="Ingresa tu apellidos" title="Apellidos" image="fa fa-user fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of email*/}
                <FormGroup name={formAllDataUser.email} placeholder="Ingresa tu correo electrónico" title="Tu correo electrónico" image="fa fa-envelope fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of username*/}
                <FormGroup name={formAllDataUser.username} placeholder="Ingresa tu usuario" title="Usuario" image="fa fa-users fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call ListGender component */}
                <ListGender />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of password*/}
                <FormGroup name={formAllDataUser.password} placeholder="Ingresa tu contraseña" title="Contraseña" image="fa fa-lock fa" type="password" />

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
                <Link to="/">Regresar</Link>
                
              </div>

            </form>
          </Container>
        </Stack>
      </Container>
    </>
  );
}

