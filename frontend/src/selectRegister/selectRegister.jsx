import { Link } from "react-router-dom";
import styles from "../css/SelectRegister.module.css";
import imagen1 from "../Images/Arrendador.png";
import imagen2 from "../Images/Estudiantes.jpg";
export function SelectRegister() {
  return (
    <main>
      <div className={styles.picture}>
        <img src={imagen1} alt="Arrendador" />
      </div>
      <div className={styles.picture2}>
        <img src={imagen2} alt="Estudiante" />
      </div>

      <div className={styles.container}>
        <div className={styles.left}>
          <div>
            <h1 className={styles.pageTitle}> UN-ARRIENDO </h1>
          </div>
          <div>
            <h1 className={styles.titleLeft}> Arrendador </h1>
            <h2 className={styles.questionLeft}>
              {" "}
              ¿Buscas publicar un apartamento o habitacion?
            </h2>

            <Link to="/RenterRegister">
              <button className={styles.buttonLeft}> Crear cuenta</button>
            </Link>
          </div>
        </div>

        <div className={styles.right}>
          <div>
            <h1 className={styles.titleRight}> Estudiante</h1>
            <h2 className={styles.questionRight}>
              {" "}
              ¿Buscas una habitación o apartamento para arrendar?
            </h2>
            <Link to="/StudentRegister">
              <button className={styles.buttonRight}> Crear cuenta</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
