
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Login } from "./login/login";
import { SelectRegister } from "./selectRegister/selectRegister";
import{ StudentRegister } from "./studentRegister/studentRegister";
import{ RenterRegister } from "./renterRegister/renterRegister";

export function App() {
  return (

    <Router>

        <main>

          <Routes>

              <Route path="/SelectRegister" element={<SelectRegister/>}> </Route>
              <Route path="/" element={<Login/>}> </Route>
              <Route path="/StudentRegister" element={<StudentRegister/>}> </Route>
              <Route path="/RenterRegister" element={<RenterRegister/>}> </Route>
              <Route path="*" element={<>NOT FOUND</>}/>

          </Routes> 
          
        </main>

     </Router>
  );
}
