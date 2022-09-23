import { Card } from "./card";
import styles from "../../css/logIn.module.css";

export function Login() {
  return (
    <>
      
      <main>  
      
        <div class={styles.container}>

          <div class="d-flex justify-content-center h-100">
              <div class={styles.pageTitle}>
                <h1> UN-ARRIENDO </h1>
              </div>
          </div>



          <link rel="stylesheet" type="text/css" href="logIn.css" />

          <div class="d-flex justify-content-center h-100">
            <Card />
          </div>

        </div>       
      </main>
    </>
  );
}
