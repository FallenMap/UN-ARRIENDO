
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Login } from "./login/login";
import { SelectRegister } from "./selectRegister/selectRegister";
import{ StudentRegister } from "./studentRegister/studentRegister";
import{ RenterRegister } from "./renterRegister/renterRegister";
import { MainPage } from "./mainPage/mainPage";

export function App() {
  return (

    <Router>

        <main>

          <Routes>

              <Route path="/SelectRegister" element={<SelectRegister/>}/>

              <Route path="/" element={<Login/>}/>

              <Route path="/StudentRegister" element={<StudentRegister/>}/>

              <Route path="/RenterRegister" element={<RenterRegister/>}/>

              <Route path="/MainPage" element={<MainPage/>}/>


          </Routes> 
          
        </main>

     </Router>
  );
}
