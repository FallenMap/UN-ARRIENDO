import { TextForm } from "./text";

export function FormGroup(props){
    return(
        <div>

          {/* Create label title for each formgroup */}
            <label className="cols-sm-2 control-label">
                  {props.title}
                </label>

                <div className="cols-sm-10">

                  <div className="input-group">

                    {/* Import icon */}
                    <span className="input-group-addon">
                      <i className= {props.image} aria-hidden="true" />
                    </span>

                    {/* Call TextForm component with its own arguments */}
                    <TextForm name={props.name} title={props.title} placeholder={props.placeholder} type={props.type}/>
                    
                  </div>
                </div>
        </div>
    );
}