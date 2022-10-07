
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/login/login";
import { SelectRegister } from "./components/selectRegister/selectRegister";
import { StudentRegister } from "./components/studentRegister/studentRegister";
import { RenterRegister } from "./components/renterRegister/renterRegister";
import { MainScreen } from "./components/inside/mainScreen";
import { RenterUpdate } from "./components/update/renterUpdate";
import { StudentUpdate } from "./components/update/studentUpdate";
import { Historial } from "./components/inside/historial";
import ListingRegister from "./components/register/listingRegister/listingRegister";
import AuthProvider from "./auth/authProvider";
import LoggedRoute from "./components/routes/loggedRoute";
import PublicRoute from "./components/routes/publicRoute";
import LandlordRoute from "./components/routes/landlordRoute";
import TenantRoute from "./components/routes/tenantRoute";
import { ListingDetails } from "./components/idontknow/listingDetails";

export function App() {
  return (

    <Router>

      <main>
        <AuthProvider>

          {/* Depending of url change the component */}
          <Routes>


            {/* Create multiple routes of this page */}

            <Route exact path="/SelectRegister" element={<PublicRoute component={<SelectRegister />} />}> </Route>
            <Route exact path="/" element={<PublicRoute component={<Login />} />}> </Route>
            <Route exact path="/StudentRegister" element={<PublicRoute component={<StudentRegister />} />}> </Route>
            <Route exact path="/RenterRegister" element={<PublicRoute component={<RenterRegister />} />}> </Route>
            <Route path="*" element={<>NOT FOUND</>} /> {/* HAY QUE HACER UNA PAGINA PARA EL 404 */}
            <Route exact path="/MainScreen" element={<LoggedRoute component={<MainScreen />} />} /> 
            <Route path="/pepe" element={ < ListingDetails/>} />
            <Route path="/federico" element={ < MainScreen />} />
            <Route path="/RenterUpdate" element={<LandlordRoute component={<RenterUpdate />} />}> </Route>
            <Route path="/StudentUpdate" element={<TenantRoute component={<StudentUpdate />} />}> </Route>
            <Route exact path="/Historial" element={<LoggedRoute component={<Historial />} />}> </Route>
            {/*<Route exact path="/Historial" element={<LoggedRoute component={<Historial />} />}> </Route>*/}
            <Route exact path="/Historial" element={<Historial />}> </Route>
            <Route exact path="/ListingRegister" element={<LandlordRoute component={ <ListingRegister /> } />} />


          </Routes>

        </AuthProvider>
      </main>

    </Router>
  );
}
