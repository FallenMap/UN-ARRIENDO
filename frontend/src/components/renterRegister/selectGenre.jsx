import styles from "../../css/textForm.module.css"
import { formAllDataUser } from "../../adapters/formAdapters";
export function ListGenre(){
    return(
        
        <div>
            <label htmlFor="Genre" className="cols-sm-2 control-label">
                  Your Genre
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-male fa-lg" aria-hidden="true"  />
                    </span>
                      <select className={styles.select} name={formAllDataUser.gender} id="Genre" >

                        <option>Male</option>
                        <option>Female</option>

                      </select>
                  </div>
                </div>
        </div>
    );
}