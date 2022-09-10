import { Card } from "./login/card";
import styles from "./css/logIn.module.css";

export function App() {
  return (
    <>
      <div className={styles.pageTitle}>
        <h1> UN-ARRIENDO </h1>
      </div>
      
      <link rel="stylesheet" type="text/css" href="logIn.css" />
<<<<<<< HEAD
      
      <div className= {styles.container}>
=======
      <div className="container">
      <div className="title">
            <h1>UN-ARRIENDO</h1>
          </div>
>>>>>>> a359185f6f1a7f6f00f4b74d090272045262eb41
        <div className="d-flex justify-content-center h-100">
          <Card/>
        </div>
      </div>
    </>
  );
}
