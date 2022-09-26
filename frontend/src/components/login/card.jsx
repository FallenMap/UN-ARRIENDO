import { CardBody } from "./cardBody";
import { CardFooter } from "./cardFooter";
import { CardHeader } from "./cardHeader";
import styles from "../../css/card.module.css"

export function Card(){
    return(
    <div className= {styles.card}>

            <CardHeader/>
            <CardBody/>
            <CardFooter/>


    </div>


    );
}