import { Card } from "./card";
import styles from "../css/logIn.module.css";

export function Login() {
    return (
      <>
      <main>
        <div className={styles.pageTitle}>
          <h1> UN-ARRIENDO </h1>
        </div>
        <link rel="stylesheet" type="text/css" href="logIn.css" />
        
        <div className= {styles.container}>
            </div>
          <div className="d-flex justify-content-center h-100">
            <Card/>
          </div>
         </main>
      </>
    );
  }