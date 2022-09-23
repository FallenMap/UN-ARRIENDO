import styles from "../../css/titleRenterRegister.module.css"

export function TitleRegister(props){
    return(
        <div className="panel-heading">
            <div class="panel-title text-center">
              <h1 className={styles.title}> {props.title} </h1>
            </div>
          </div>
    );
}