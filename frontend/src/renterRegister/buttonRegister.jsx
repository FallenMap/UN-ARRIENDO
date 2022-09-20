import styles from "../css/button.module.css"
export function ButtonRegister(){
    return(
        
       <div>
           <button type="button" className={styles.loginButton}>
                  Register
            </button>
       </div> 
    );
}