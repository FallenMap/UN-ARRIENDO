import styles from "../../css/textForm.module.css"

export function TextForm(props){
    return(
        <div >

            {/* Create input with its our arguments for re-use in multiple calls */}
            <input className={styles.input+ " form-control"}                    
                    type={props.type}
                    name= {props.name}
                    id={props.name}
                      placeholder={props.placeholder }
                    onChange={(e) => {props.handleChange(e)}}
                    />
                    
        </div>
    );
}