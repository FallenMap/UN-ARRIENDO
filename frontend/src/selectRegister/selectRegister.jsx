import { Link } from "react-router-dom";
import styles from "../css/SelectRegister.module.css";

export function SelectRegister() {
  return (
    <>
    <div class={styles.color}>
    <div class={styles.backgroundPage}> 
      <div class= {styles.wrapped}>
        <div class={styles.containerCenter}>
            <h1 className={styles.pageTitle}> Selecciona tu registro </h1>
          </div>
        <div class={styles.container}>
          <div>
                <h1 className={styles.titleLeft}> Arrendador </h1>
                <h2 className={styles.questionLeft}>
                  ¿Buscas publicar un apartamento o habitacion?
                </h2>

                <Link to="/RenterRegister">
                  <button className={styles.buttonLeft}> Crear cuenta</button>
                </Link>
              </div>
        </div>

        <div class={styles.containerRight}>
          <h1 class={styles.titleRight}> Estudiante</h1>
          <h2 className={styles.questionRight}>
            ¿Buscas una habitación o apartamento para arrendar?
          </h2>
          <Link to="/StudentRegister">
            <button className={styles.buttonRight}> Crear cuenta</button>
          </Link>
        </div>
      </div>
    
    </div>
    </div>
    
    </>
  );
}
