import styles from "../../css/textForm.module.css"

export function TextForm(props){
    return(
        <div >
            <input className={styles.input+ " form-control"}                    
                    type={props.type}
                    name= {props.name}
                    id={props.name}
                      placeholder={props.placeholder }
                    />
        </div>
    );
}