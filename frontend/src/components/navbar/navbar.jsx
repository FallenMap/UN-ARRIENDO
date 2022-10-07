import React from 'react'
import { Link } from 'react-router-dom';
import styles from "../../css/renterRegister.module.css";
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import useAuth from '../../auth/useAuth';
import { logOutAPI } from "../../api/userAPI";

function Navbar() {
    const changeImage= () => {
        document.body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/7/73/Plaza_Che%2C_Bogot%C3%A1.jpg')";
      }

    const auth = useAuth();

    const logoutHandler = (e) => {
        logOutAPI().then(res => {
            auth.logOut();
            changeImage();
        }).catch(e => {
            console.log("Something bad happened while logging out..." + e);
            auth.logOut();
        });
    }


    return (
        <div>
            <AppBar sx={{
                backgroundColor:"#1a1a1a"
            }}>

                <Toolbar>
                    <Typography className={styles.title}>
                        UN-ARRIENDO
                    </Typography> 
                    <br></br>
                    <Link to="/MainScreen"><button className={styles.btnHome}> Inicio </button> </Link>  

                    <Box sx={{
                        flexGrow: 1
                    }} />
                    
                   

                    <Link to={auth.user.type === "Landlord" ? "/RenterUpdate" : "/StudentUpdate"}>
                        <button className={styles.btn}> Actualizar datos</button>
                    </Link>
                    {auth.user.type==="Landlord" && <Link to="/Historial"><button className={styles.btn}> Historial</button></Link>}
        
                    {auth.isLogged() && <button className={styles.btn} onClick={logoutHandler}> Cerrar sesion</button>}


                


                        

                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    )
}

export default Navbar