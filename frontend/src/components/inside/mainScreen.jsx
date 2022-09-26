
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { changeTitle } from "../../utilities/changeTitle";

export function MainScreen() {
    changeTitle("Main page");
  return (
      <div className="container">
          <Navbar/>
              <div className="col-md-12 text-center">
                  <span className="display-1 d-block">( ͡❛ ͜ʖ ͡❛)👌</span>
                  <div className="mb-4 lead">
                      La página está en construcción querido usuario
                  </div>
                  <br></br>
                  <a href="https://www.youtube.com/watch?v=mCdA4bJAGGk" className="btn btn-link">Adelanto página principal</a>
                  
              </div>
          </div>
      
  );
}
