import { Link } from "react-router-dom";
import styles from "../../css/containerLeftSelectRegister.module.css"

export function ContainerLeft(){
    return(
        <div>
            
            {/* Create lessor subtitle */}
            <h1 className={styles.titleLeft}> Arrendador </h1>

            {/* Create main question of this section */}
            <h2 className={styles.questionLeft}>
                ¿Buscas publicar un apartamento o habitacion?
            </h2>

            {/* Create redirect button to RenterRegister */}
            <Link to="/RenterRegister">
                <button className={styles.buttonLeft}> Crear cuenta</button>
            </Link>

        </div>
    );
}