export function RedirectingQuestion(props){
    return(
        <div className="d-flex justify-content-center links">

                {props.Question}
                
                <a href={props.url}>{props.text}</a>
        </div>
    );
}