import React from 'react'
import { Link } from 'react-router-dom';
import styles from "../../css/renterRegister.module.css";
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import useAuth from '../../auth/useAuth';
import { logOutAPI } from "../../api/userAPI";

function Navbar() {

    const auth = useAuth();

    const logoutHandler = (e) => {
        logOutAPI().then(res => {
            auth.logOut();
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
                    <Typography variant='h6'>
                        UN-ARRIENDO
                    </Typography>
                    <Box sx={{
                        flexGrow: 1
                    }} />
                    {/* <Link to={auth.user.type === "Landlord" ? "/RenterUpdate" : "/StudentUpdate"}>
                        <button className={styles.button}> Actualizar datos</button>
                    </Link>
                    {auth.isLogged() && <button className={styles.button} onClick={logoutHandler}> Cerrar sesion</button>} */}
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    )
}

export default Navbar