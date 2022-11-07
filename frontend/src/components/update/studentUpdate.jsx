import { Link } from "react-router-dom";
import styles from "../../css/studentRegister.module.css";
import { ButtonRegister } from "../renterRegister/buttonRegister";
import { FormGroup } from "../renterRegister/formGroup";
import { LinksPage } from "../renterRegister/linksPage";
import { TitleRegister } from "../renterRegister/titleRenterRegister";
import { changeTitle } from "../../utilities/changeTitle";

import { Stack } from "@mui/material";
import { Container } from "@mui/system";

import { formAllDataUser } from "../../adapters/formAdapters";
import { fieldsFilled } from "../../utilities/fillFieldsUpdate";
import useAuth from "../../auth/useAuth"
import { useEffect } from "react";
import { userUpdateHandlerOnSubmit } from "../../controllers/userActionsController";
import { changeBackground } from "../../utilities/changeBackground";

export function StudentUpdate() {
  changeTitle("Actulizacion estudiante");
  changeBackground('https://caracoltv.brightspotcdn.com/dims4/default/a881810/2147483647/strip/true/crop/889x500+220+0/resize/1200x675!/quality/90/?url=http%3A%2F%2Fcaracol-brightspot.s3.amazonaws.com%2Ff1%2F0c%2Fe81ace1d411bb8b27f96bd7fcc7c%2Fviejito-01.png');
  
  const auth = useAuth();

  useEffect(() => {
    fieldsFilled(auth)
    console.log(auth.user);
  });

  const sumbitHandler = (e) => {
    userUpdateHandlerOnSubmit(e, auth);
  };

  return (
    <>

      <LinksPage />
      <Container style={{
        maxWidth: "500px"
      }}>
        <Stack spacing={2}>
          <TitleRegister title="Actulización estudiante" />
          <Container style={{
            maxWidth: "400px",
            margin: "5% auto",
            background: "rgba(0, 0, 0, 0.8)",
            borderRadius: "10px",
            padding: "40px 40px"
          }} display="flex">
            <form className="form-horizontal" onSubmit={sumbitHandler}>

              <div className={styles.formGroup}>
                <FormGroup name={formAllDataUser.name} placeholder="Ingresa tu nombre" title="Nombre" image="fa fa-user fa" type="text" />
              </div>

              <div className={styles.formGroup}>
                <FormGroup name={formAllDataUser.lastName} placeholder="Ingresa tu apellidos" title="Apellidos" image="fa fa-user fa" type="text" />
              </div>

              <div className={styles.formGroup}>
                <FormGroup name={formAllDataUser.email} placeholder="Ingresa tu correo electrónico" title="Tu correo electrónico" image="fa fa-envelope fa" type="text" />
              </div>
              <div className={styles.formGroup}>

                <label htmlFor="description" className="cols-sm-2 control-label">
                Tu descripción
                </label>
                <textarea name={formAllDataUser.description} id="description" title="Descripción" placeholder=" Ingresa tu descripción" cols="30" rows="3" style={{
                    width:"100%"
                }}></textarea>
                
              </div>

              <div className={styles.formGroup}>
                <ButtonRegister loginButton="Actualizar" />
              </div>

              <div className={styles.loginRegister}>
                <Link to="/MainScreen">Inicio</Link>
              </div>

              

            </form>
  </Container>
</Stack>
</Container>
</>
  );
}

/*

<>

      <LinksPage />
      <Container style={{
        maxWidth: "500px"
      }}>
        <Stack spacing={2}>
          <TitleRegister title="Renter Register" />
          <Container style={{
            maxWidth: "400px",
            margin: "5% auto",
            background: "rgba(0, 0, 0, 0.8)",
            borderRadius: "10px",
            padding: "40px 40px"
          }} display="flex">
            <form className="form-horizontal" onSubmit={sumbitHandler}>

              <div className={styles.formGroup}>
                <FormGroup name={formAllDataUser.name} placeholder="Enter your Name" title="Your Name" image="fa fa-user fa" type="text" />
              </div>

              <div className={styles.formGroup}>
                <FormGroup name={formAllDataUser.lastName} placeholder="Enter your Last Name" title="Your Last Name" image="fa fa-user fa" type="text" />
              </div>

              <div className={styles.formGroup}>
                <FormGroup name={formAllDataUser.email} placeholder="Enter your Email" title="Your Email" image="fa fa-envelope fa" type="text" />
              </div>

              <div className={styles.formGroup}>
                <ButtonRegister />
              </div>

              <div className={styles.loginRegister}>
                <Link to="/MainScreen">Home</Link>
              </div>

            </form>
  </Container>
</Stack>
</Container>
</>

*/