import { Link } from "react-router-dom";
import styles from "../../css/containerRightSelectRegister.module.css"

export function ContainerRight(){
    return(
        <div>

            {/* Create student subtitle */}
            <h1 class={styles.titleRight}> Estudiante</h1>

            {/* Create main question of this section */}
            <h2 className={styles.questionRight}>
                ¿Buscas una habitación o apartamento para arrendar?
            </h2>

            {/* Create redirect button to StudentRegister */}
            <Link to="/StudentRegister">
                <button className={styles.buttonRight}> Crear cuenta</button>
            </Link>

        </div>
    );
}