export function TextForm(props){
    return(
        <div>
            <input
                    type="text"
                    className="form-control"
                    name= {props.name}
                    id= {props.name}
                      placeholder={props.placeholder }
                    />
        </div>
    );
}