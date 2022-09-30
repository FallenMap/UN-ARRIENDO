import styles from "../../css/button.module.css"
export function ButtonRegister(props){
    return(
       <div>

            {/* Create button with type submit, it own classname argument and it own buttonTitle argument */}
           <button type="submit" className={styles.loginButton}>
                  {props.loginButton}
            </button>
            
       </div> 
    );
}