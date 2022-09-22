import styles from "../css/button.module.css"
export function ButtonRegister(props){
    return(
        
       <div>
           <button type="button" className={styles.loginButton}>
                  {props.loginButton}
            </button>
       </div> 
    );
}