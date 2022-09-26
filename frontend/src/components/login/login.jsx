import { Card } from "./card";
import styles from "../../css/logIn.module.css";
import imagen from "../../Images/Logo.png";
import { changeTitle } from "../../utilities/changeTitle";

export function Login() {
  changeTitle("Login");
  return (
    <>
      
      <main>  
      
        <div className={styles.container}>

          <div className="d-flex justify-content-center h-100">
              <div className={styles.pageTitle}>
                <h1> UN-ARRIENDO </h1>
              </div>
          </div>




          <div className="d-flex justify-content-center h-100">
            <Card />
          </div>

 
          <div className={styles.logo}>
              <img src={imagen} alt="Logo" />
          </div>


        </div>       
      </main>
    </>
  );
}
