import styles from "../../css/titleRenterRegister.module.css"

export function TitleRegister(props){
    return(
        <div className="panel-heading">

            <div className="panel-title text-center">

              {/* Create title of RegisterPage */}
              <h1 className={styles.title}> {props.title} </h1>
              
            </div>
          </div>
    );
}