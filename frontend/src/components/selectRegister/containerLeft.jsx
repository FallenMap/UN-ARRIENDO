import { Link } from "react-router-dom";
import styles from "../../css/containerLeftSelectRegister.module.css"

export function ContainerLeft(){
    return(
        <div>
            
            <h1 className={styles.titleLeft}> Arrendador </h1>
            <h2 className={styles.questionLeft}>
                ¿Buscas publicar un apartamento o habitacion?
            </h2>

            <Link to="/RenterRegister">
                <button className={styles.buttonLeft}> Crear cuenta</button>
            </Link>

        </div>
    );
}