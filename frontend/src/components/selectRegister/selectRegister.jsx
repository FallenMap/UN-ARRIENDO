import styles from "../../css/SelectRegister.module.css";
import { changeTitle } from "../../utilities/changeTitle";
import { ContainerLeft } from "./containerLeft";
import { ContainerRight } from "./containerRight";
import { Link } from "react-router-dom";
import { changeBackground } from "../../utilities/changeBackground";
import { Box } from "@mui/material";

export function SelectRegister() {
  changeTitle("Seleccion");
  changeBackground('https://ingenieria.bogota.unal.edu.co/images/recursos/noticias/viejito-01.png');
  return (
    <>
      {/* Use for more image warmth */}
      <div className={styles.color}>

        {/* Use background image */}
        <div className={styles.backgroundPage}>

          {/* Create class for use of grid css */}
          <div className={styles.wrapped}>

            {/* Create page title with styles and use of grid css */}
            <div className={styles.containerCenter}>
              <h1 className={styles.pageTitle}> Selecciona tu registro </h1>
            </div>

            <div className={styles.containerLeft}>

              {/* Call containerLeft componet */}
              <ContainerLeft />

            </div>


            <div className={styles.containerRight}>

              {/* Call containerRight component */}
              <ContainerRight />

            </div>
          </div>
        </div>
        <Box sx={{
          width: "100%"
        }}
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Link to="/">
            <button className={styles.btn} style={{padding:"0px", margin:"0px", marginRight: "500px"}}> Volver</button>
          </Link>
        </Box>
      </div>

    </>
  );
}
