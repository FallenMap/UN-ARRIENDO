import React from 'react'
import { Link } from 'react-router-dom';
import styles from "../../css/renterRegister.module.css";
import { useState } from 'react'
import { AppBar, Container, Box, Toolbar, Typography, Avatar,
        Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip, Button } from '@mui/material';
import { Logout, History, Person } from '@mui/icons-material';
import useAuth from '../../auth/useAuth';
import { logOutAPI } from "../../api/userAPI";
import { changeBackground } from '../../utilities/changeBackground';
import { formAllDataUser } from '../../adapters/formAdapters';


function Navbar() {

    const auth = useAuth();

    const logoutHandler = (e) => {
        logOutAPI().then(res => {
            auth.logOut();
            changeBackground( "url('https://upload.wikimedia.org/wikipedia/commons/7/73/Plaza_Che%2C_Bogot%C3%A1.jpg')");
        }).catch(e => {
            console.log("Something bad happened while logging out..." + e);
            auth.logOut();
        });
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <AppBar sx={{
                backgroundColor: "#17202A"
            }}>
                <Container>
                    <Toolbar>
                        <Typography className={styles.title}>
                            UN-ARRIENDO
                        </Typography>
                        <Link to="/MainScreen" style={{textDecoration:"none"}}><Button variant="outlined" sx={{marginLeft:"20px"}}> Inicio </Button></Link>
                        <Box sx={{
                            flexGrow: 1
                        }} />

                        {
                         auth?.user?.type==="Landlord" ? <Link to="/ListingRegister" style={{textDecoration:"none"}}><Button variant="outlined">¡Publicar!</Button></Link> : <></>  
                        }
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }} src={`http://localhost:5000/images/profile/${auth.user?.[formAllDataUser.link]}`} />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            {auth.isLogged() &&
                                <Link to={auth.user?.type === "Landlord" ? "/RenterUpdate" : "/StudentUpdate"} style={{textDecoration:"none"}}>
                                    <MenuItem>
                                        <ListItemIcon>
                                        <Person fontSize='medium' />
                                        </ListItemIcon> Actualizar datos
                                    </MenuItem>
                                </Link>
                            }


                            <Divider style={{
                                width: "100%"
                            }} />
                            {auth.user?.type === "Landlord" && <Link to="/Historial" style={{textDecoration:"none"}}>
                                <MenuItem>
                                    <ListItemIcon>
                                        <History fontSize='medium' />
                                    </ListItemIcon>
                                    Tus publicaciones
                                </MenuItem>
                            </Link>}
                            {auth.isLogged() &&
                                <MenuItem onClick={logoutHandler}>
                                    <ListItemIcon>
                                        <Logout fontSize='medium' />
                                    </ListItemIcon>
                                    Cerrar sesión
                                </MenuItem>
                            }
                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </div>
    )
}

export default Navbar