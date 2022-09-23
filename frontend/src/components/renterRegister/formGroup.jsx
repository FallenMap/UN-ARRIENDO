import { TextForm } from "./text";

export function FormGroup(props){
    return(
        <div>
            <label htmlFor={props.name} className="cols-sm-2 control-label">
                  {props.title}
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className= {props.image} aria-hidden="true" />
                    </span>
                    <TextForm title={props.title} placeholder={props.placeholder} type={props.type}/>
                  </div>
                </div>
        </div>
    );
}