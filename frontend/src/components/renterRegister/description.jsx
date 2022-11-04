import {formAllDataUser} from "../../adapters/formAdapters";

export function Description(props){
    return(
        <div>

            {/* Create title of this register section */}
            <label htmlFor="description" className="cols-sm-2 control-label">
                Tu descripción
            </label>

            <div className="cols-sm-10">
                
                <div className="input-group">

                {/* Create a textarea for enter the user description */}
                <textarea name={formAllDataUser.description} onChange={props.handleChange} id="description" cols="30" rows="3" style={{
                    width:"100%"
                }}></textarea>
                {props.errors?.[formAllDataUser.description] && <p style={{ color: "red" }}>{`${props.errors?.[formAllDataUser.description]}`}</p>}
                </div>
            </div>
        </div>
    );
}