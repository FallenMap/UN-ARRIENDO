export function TextForm(props){
    return(
        <div>
            <input
                    type={props.type}
                    className="form-control"
                    name= {props.name}
                    id= {props.name}
                      placeholder={props.placeholder }
                    />
        </div>
    );
}