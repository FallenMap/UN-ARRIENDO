
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/login/login";
import { SelectRegister } from "./components/selectRegister/selectRegister";
import { StudentRegister } from "./components/studentRegister/studentRegister";
import { RenterRegister } from "./components/renterRegister/renterRegister";
import { MainScreen } from "./components/inside/mainScreen";
import { RenterUpdate } from "./components/update/renterUpdate";
import { StudentUpdate } from "./components/update/studentUpdate";
import AuthProvider from "./auth/authProvider";
import LoggedRoute from "./components/routes/loggedRoute";
import PublicRoute from "./components/routes/publicRoute";
import LandlordRoute from "./components/routes/landlordRoute";
import TenantRoute from "./components/routes/tenantRoute";

export function App() {
  return (

    <Router>

      <main>
        <AuthProvider>
          <Routes>

            <Route path="/SelectRegister" element={<PublicRoute component={<SelectRegister />} />}> </Route>
            <Route exact path="/" element={<PublicRoute component={<Login />} />}> </Route>
            <Route path="/StudentRegister" element={<PublicRoute component={<StudentRegister />} />}> </Route>
            <Route path="/RenterRegister" element={<PublicRoute component={<RenterRegister />} />}> </Route>
            <Route path="*" element={<>NOT FOUND</>} /> {/* HAY QUE HACER UNA PAGINA PARA EL 404 */}
            <Route exact path="/MainScreen" element={<LoggedRoute component={<MainScreen />} />} />
            <Route path="/RenterUpdate" element={<LandlordRoute component={<RenterUpdate />} />}> </Route>
            <Route path="/StudentUpdate" element={<TenantRoute component={<StudentUpdate />} />}> </Route>

          </Routes>
        </AuthProvider>
      </main>

    </Router>
  );
}
