import { Link } from "react-router-dom";
import styles from "../../css/containerRightSelectRegister.module.css"

export function ContainerRight(){
    return(
        <div>
            <h1 class={styles.titleRight}> Estudiante</h1>
            <h2 className={styles.questionRight}>
                ¿Buscas una habitación o apartamento para arrendar?
            </h2>
            <Link to="/StudentRegister">
                <button className={styles.buttonRight}> Crear cuenta</button>
            </Link>
        </div>
    );
}