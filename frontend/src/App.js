
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { Login } from "./login/login";
import { SelectRegister } from "./selectRegister/selectRegister";

export function App() {
  return (

    <Router>

        <main>

          <Routes>

              <Route path="/SelectRegister" element={<SelectRegister/>}> </Route>

              <Route path="/" element={<Login/>}> </Route>

          </Routes> 
          
        </main>

     </Router>
  );
}
