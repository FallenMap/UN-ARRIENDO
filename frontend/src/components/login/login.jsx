import { Card } from "./card";
import styles from "../../css/logIn.module.css";
import imagen from "../../Images/Logo.png";
import { changeTitle } from "../../utilities/changeTitle";
import { changeBackground } from "../../utilities/changeBackground";

export function Login() {
  changeTitle("Login");
  changeBackground('https://upload.wikimedia.org/wikipedia/commons/7/73/Plaza_Che%2C_Bogot%C3%A1.jpg');
  return (
    <>
      
      <main>  
      
        <div className={styles.container}>

          {/* Create page title */}
          

          <div className="d-flex justify-content-center h-100">
              <div className={styles.pageTitle}>
                <h1> UN-ARRIENDO </h1>
              </div>
          </div>


          {/* Call the css for general styles */}
          <link rel="stylesheet" type="text/css" href="logIn.css" />

          {/* Call the card component */}
          <div className="d-flex justify-content-center h-100">
            <Card />

          </div>

          {/* Create page icon with styles. */}

          <div className={styles.logo}>
              <img src={imagen} alt="Logo" />

          </div>



        </div>       
      </main>
    </>
  );
}
