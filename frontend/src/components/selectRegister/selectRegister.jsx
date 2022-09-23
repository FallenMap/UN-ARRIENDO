import styles from "../../css/SelectRegister.module.css";
import { ContainerLeft } from "./containerLeft";
import { ContainerRight } from "./containerRight";

export function SelectRegister() {
  return (
    <>
    <div class={styles.color}>
    <div class={styles.backgroundPage}> 
      <div class= {styles.wrapped}>

        <div class={styles.containerCenter}>
            <h1 class={styles.pageTitle}> Selecciona tu registro </h1>
          </div>
          
        <div class={styles.container}>
          <ContainerLeft/>
        </div>

        <div class={styles.containerRight}>
          <ContainerRight/>
        </div>
      </div>
    
    </div>
    </div>
    
    </>
  );
}
