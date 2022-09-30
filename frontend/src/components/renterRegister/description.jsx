import {formAllDataUser} from "../../adapters/formAdapters";

export function Description(){
    return(
        <div>

            {/* Create title of this register section */}
            <label htmlFor="description" className="cols-sm-2 control-label">
                Tu descripción
            </label>

            <div className="cols-sm-10">
                
                <div className="input-group">

                {/* Create a textarea for enter the user description */}
                <textarea name={formAllDataUser.description} id="description" cols="30" rows="3" style={{
                    width:"100%"
                }}></textarea>

                </div>
            </div>
        </div>
    );
}