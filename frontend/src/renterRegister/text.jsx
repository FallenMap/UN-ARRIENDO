import styles from "../css/textForm.module.css"

export function TextForm(props){
    return(
        <div >
            <input class={styles.input}                    
                    type={props.type}
                    className="form-control"
                    name= {props.name}
                    id= {props.name}
                      placeholder={props.placeholder }
                    />
        </div>
    );
}