import styles from "../../css/cardHeader.module.css"

export function CardHeader(){
    return(
    <>
        {/* Create Card title */}
        
        <div className= {styles.cardHeader}>
            <h3>Inicio de sesión</h3>
        </div>

    </>
    
    );
}