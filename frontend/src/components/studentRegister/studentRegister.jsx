import { Link } from "react-router-dom";
import styles from "../../css/studentRegister.module.css";
import { ButtonRegister } from "../renterRegister/buttonRegister";
import { FormGroup } from "../renterRegister/formGroup";
import { LinksPage } from "../renterRegister/linksPage";
import { ListGenre } from "../renterRegister/selectGenre";
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

  changeTitle("Student Register");

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
          <TitleStudent title="Stundent Register" />
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
                <FormGroup name={formAllDataUser.name} placeholder="Enter your Name" title="Your Name" image="fa fa-user fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of LastName*/}
                <FormGroup name={formAllDataUser.lastName} placeholder="Enter your Last Name" title="Your Last Name" image="fa fa-user fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of email*/}
                <FormGroup name={formAllDataUser.email} placeholder="Enter your Email" title="Your Email" image="fa fa-envelope fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of username*/}
                <FormGroup name={formAllDataUser.username} placeholder="Enter your Username" title="Username" image="fa fa-users fa" type="text" />

              </div>

              <div className={styles.formGroup}>

                {/* Call ListGenre component */}
                <ListGenre />

              </div>

              <div className={styles.formGroup}>

                {/* Call FormGroup compontent with its own arguments of password*/}
                <FormGroup name={formAllDataUser.password} placeholder="Enter your password" title="Password" image="fa fa-lock fa" type="password" />

              </div>

              <div className={styles.formGrup}>

                {/* Call ButtonUploadPhoto component with it own photo */}
                <ButtonUploadPhoto name={formAllDataUser.photo} />

              </div>

              <div className={styles.formGroup}>

                {/* Call ButtonRegister component with one argument */}
                <ButtonRegister loginButton="Register" />

              </div>

              <div className={styles.loginRegister}>
                {/* Create redirect text to login */}
                <Link to="/">Login</Link>
                
              </div>

            </form>
          </Container>
        </Stack>
      </Container>
    </>
  );
}

