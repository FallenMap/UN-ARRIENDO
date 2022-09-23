
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Login } from "./components/login/login";
import { SelectRegister } from "./components/selectRegister/selectRegister";
import{ StudentRegister } from "./components/studentRegister/studentRegister";
import{ RenterRegister } from "./components/renterRegister/renterRegister";
import { MainScreen } from "./components/inside/mainScreen";
import{RenterUpdate} from "./components/update/renterUpdate";
import{ StudentUpdate } from "./components/update/studentUpdate";
export function App() {
  return (

    <Router>

        <main>

          <Routes>

              <Route path="/SelectRegister" element={<SelectRegister/>}> </Route>
              <Route path="/" element={<Login/>}> </Route>
              <Route path="/StudentRegister" element={<StudentRegister/>}> </Route>
              <Route path="/RenterRegister" element={<RenterRegister/>}> </Route>
              <Route path="/MainScreen" element={<MainScreen/>}> </Route>
              <Route path="/RenterUpdate" element={<RenterUpdate/>}> </Route>
              <Route path="/StudentUpdate" element={<StudentUpdate/>}> </Route>
             

          </Routes> 
          
        </main>

     </Router>
  );
}
