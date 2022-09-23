import { Link } from "react-router-dom";

export function RedirectingQuestion(props){
    return(
        <div className="d-flex justify-content-center links">

                {props.Question}

                <Link to={props.url}> {props.text} </Link>
        </div>
    );
}