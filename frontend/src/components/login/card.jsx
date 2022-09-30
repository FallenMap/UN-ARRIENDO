import { CardBody } from "./cardBody";
import { CardFooter } from "./cardFooter";
import { CardHeader } from "./cardHeader";
import styles from "../../css/card.module.css"

export function Card(){
    return(
    <div className= {styles.card}>

        {/* Call CardHeader component */}
            <CardHeader/>

        {/* Call CardBody component */}
            <CardBody/>

        {/* Call CardFooter component */}
            <CardFooter/>


    </div>


    );
}