
import Navbar from "../navbar/navbar";
import { changeTitle } from "../../utilities/changeTitle";

export function MainScreen() {
    changeTitle("Main page");
  return (
      <div className="container">
          <Navbar/>
              <div className="col-md-12 text-center">

                {/* Create main title of page, in this case, informs the user that this page are in construction */}
                  <div className="mb-4 lead">
                      La página está en construcción.
                  </div>

                  <br></br>

                  {/* Url to a video on youtube */}
                  <a href="https://www.youtube.com/watch?v=mCdA4bJAGGk" className="btn btn-link">Adelanto página principal</a>
                  
              </div>
          </div>
      
  );
}
