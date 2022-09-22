import { Link } from "react-router-dom";

export function SubmitButton(){
    return(
        <div className="form-group">
          <Link to="/MainScreen">
                  <input
                    type="submit"
                    defaultValue="Login"
                    className="btn float-right login_btn" 
                  />
            </Link>
                </div>
    );
}