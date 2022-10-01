import styles from "../../css/SelectRegister.module.css";
import { changeTitle } from "../../utilities/changeTitle";
import { ContainerLeft } from "./containerLeft";
import { ContainerRight } from "./containerRight";
import { Link } from "react-router-dom";

export function SelectRegister() {
  changeTitle("Select register");
  return (
    <>
    {/* Use for more image warmth */}
    <div className={styles.color}>
    
    {/* Use background image */}
    <div className={styles.backgroundPage}> 
    
      {/* Create class for use of grid css */}
      <div className= {styles.wrapped}>

        {/* Create page title with styles and use of grid css */}
        <div className={styles.containerCenter}>
            <h1 className={styles.pageTitle}> Selecciona tu registro </h1>
            <Link to="/">
              <button className={styles.btn}> Volver</button>
            </Link>
          </div>
          
        <div className={styles.containerLeft}>

          {/* Call containerLeft componet */}
          <ContainerLeft/>

        </div>


        <div className={styles.containerRight}>

          {/* Call containerRight component */}
          <ContainerRight/>

        </div>
      </div>
    
    </div>
    </div>
    
    </>
  );
}
