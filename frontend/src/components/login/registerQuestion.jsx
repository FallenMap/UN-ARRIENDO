import { Link } from "react-router-dom";

export function RedirectingQuestion(props){
    return(


        <div className="d-flex justify-content-center links">
            {/* Use question argument like redirect body */}
                {props.Question}

                {/* Use url argument for redirect without recharge page */}
                <Link to={props.url}> {props.text} </Link>
        </div>
    );
}