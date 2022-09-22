import styles from "../css/textForm.module.css"
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
                      <select class={styles.select} name="Genre" id="Genre" >

                        <option>Masculino</option>
                        <option>Femenino</option>

                      </select>
                  </div>
                </div>
        </div>
    );
}