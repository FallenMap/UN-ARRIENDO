
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
import { ListingDetails } from "./components/listingDetails/listingDetails";
import ListingUpdate from "./components/update/listingUpdate/listingUpdate";
import Profile from "./components/profile/profile";

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
            <Route path="*" element={<h1>NOT FOUND</h1>} /> {/* HAY QUE HACER UNA PAGINA PARA EL 404 */}
            <Route exact path="/MainScreen" element={<LoggedRoute component={<MainScreen />} />} /> 
            <Route path='/listing/details/:id' element={<LoggedRoute component={<ListingDetails/>} />}> </Route>
            <Route path="/RenterUpdate" element={<LandlordRoute component={<RenterUpdate />} />}> </Route>
            <Route path="/StudentUpdate" element={<TenantRoute component={<StudentUpdate />} />}> </Route>
            <Route exact path="/Historial" element={<LandlordRoute component={ <Historial /> } />}> </Route>
            <Route exact path="/ListingRegister" element={<LandlordRoute component={ <ListingRegister /> } />} />
            <Route exact path="/listing/update/:id" element={<LandlordRoute component={ <ListingUpdate /> } />} />

            {/*Testing routes*/}
            <Route exact path="/profile/:user" element={<Profile></Profile>} />

          </Routes>

        </AuthProvider>
      </main>

    </Router>
  );
}
