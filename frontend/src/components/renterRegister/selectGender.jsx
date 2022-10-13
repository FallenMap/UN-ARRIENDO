import styles from "../../css/textForm.module.css"
import { formAllDataUser } from "../../adapters/formAdapters";
export function ListGender(){
    return(
        
        <div>

          {/* Create label for genreList title */}
            <label htmlFor="Gender" className="cols-sm-2 control-label">
                  Tu género
                </label>
            
                <div className="cols-sm-10">

                  <div className="input-group">

                    {/* Import icon */}
                    <span className="input-group-addon">
                      <i className="fa fa-male fa-lg" aria-hidden="true"  />
                    </span>

                    {/* Create list with two options and its own arguments */}
                      <select className={styles.select} name={formAllDataUser.gender} id="Genre" >

                        <option>Masculino</option>
                        <option>Femenino</option>
                        <option>Prefiero no especificar</option>

                      </select>

                  </div>
                  
                </div>
        </div>
    );
}