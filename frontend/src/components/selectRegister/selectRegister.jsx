import styles from "../../css/SelectRegister.module.css";
import { changeTitle } from "../../utilities/changeTitle";
import { ContainerLeft } from "./containerLeft";
import { ContainerRight } from "./containerRight";

export function SelectRegister() {
  changeTitle("Select register");
  return (
    <>
    {/* Use for more image warmth */}
    <div class={styles.color}>
    
    {/* Use background image */}
    <div class={styles.backgroundPage}> 
    
      {/* Create class for use of grid css */}
      <div class= {styles.wrapped}>

        {/* Create page title with styles and use of grid css */}
        <div class={styles.containerCenter}>
            <h1 class={styles.pageTitle}> Selecciona tu registro </h1>
          </div>
          
        <div class={styles.containerLeft}>

          {/* Call containerLeft componet */}
          <ContainerLeft/>

        </div>


        <div class={styles.containerRight}>

          {/* Call containerRight component */}
          <ContainerRight/>

        </div>
      </div>
    
    </div>
    </div>
    
    </>
  );
}
