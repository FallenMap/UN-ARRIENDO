
import { Link } from "react-router-dom";
import styles from "../../css/renterRegister.module.css";
export function MainScreen() {
  return (
      <div className="container">
              <div className="col-md-12 text-center">
                  <span className="display-1 d-block">( ͡❛ ͜ʖ ͡❛)👌</span>
                  <div className="mb-4 lead">
                      La página está en construcción mamahuevo
                  </div>
                  <Link to="/">Login</Link>
                  <br></br>
                  <a href="https://www.youtube.com/watch?v=mCdA4bJAGGk" class="btn btn-link">Adelanto página principal</a>
                  
              </div>

              <Link to="/RenterUpdate">
              <button className={styles.button}> Actualizar datos</button>
            </Link>
          </div>
      
  );
}
