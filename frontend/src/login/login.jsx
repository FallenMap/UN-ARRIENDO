import { Card } from "./card";
import styles from "../css/logIn.module.css";
import imagen from "../Images/Logo.png";

export function Login() {
  return (
    <>
      <main>
        <div className={styles.logo}>
          <img src={imagen} alt="Logo" />
        </div>
        <div className="d-flex justify-content-center h-100">
          <div className={styles.pageTitle}>
            <h1> UN-ARRIENDO </h1>
          </div>
        </div>
        <link rel="stylesheet" type="text/css" href="logIn.css" />

        <div className="d-flex justify-content-center h-100">
          <Card />
        </div>
      </main>
    </>
  );
}
