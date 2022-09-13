import { Link } from "react-router-dom";
import styles from "../css/SelectRegister.module.css"

export function SelectRegister() {
    return (
      
      <main>
        <div className={styles.container}>
          
          <div className={styles.left}>
            <div>
              <h1 className={styles.pageTitle}> UN-ARRIENDO </h1>
            </div>
            <div> 
              <h1 className= {styles.titleLeft}> Arrendador </h1>
              <h2 className={styles.questionLeft}> ¿Buscas publicar un apartamento o habitacion?</h2>

              <Link to= "/">
                <button className={styles.buttonLeft}> Crear cuenta</button>
              </Link>
              
            </div>
            
          </div>
          
          <div className={styles.right}>
          <div> 
              <h1 className= {styles.titleRight}> Estudiante</h1>
              <h2 className={styles.questionRight}> ¿Buscas una habitación o apartamento para arrendar?</h2>
              <Link to="/">
                <button className={styles.buttonRight} > Crear cuenta</button>
              </Link>
            </div>
          </div>
      </div>
      
      </main>

      
    );
  }