import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import styles from "../../css/renterRegister.module.css";
import { useState } from 'react'
import {
    AppBar, Container, Box, Toolbar, Typography, Avatar,
    Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip, Button, Paper, InputBase, Tab, Tabs, ClickAwayListener, MenuList, Grow, Popper
} from '@mui/material';
import { Logout, History, Person, Create, Search, People, Home } from '@mui/icons-material';
import useAuth from '../../auth/useAuth';
import { logOutAPI, searchAPI } from "../../api/userAPI";
import { changeBackground } from '../../utilities/changeBackground';
import { formAllDataUser } from '../../adapters/formAdapters';
import { URL_BACKEND } from '../../constantes';
import { UserResult, ListingResult } from "./dataResult";


function Navbar() {

    const auth = useAuth();
    const [FoundUsers, setFoundUsers] = useState([]);
    const [FoundListings, setFoundListings] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    const [showResults, setShowResults] = useState(false);
    const anchorRef = useRef(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const logoutHandler = (e) => {
        logOutAPI().then(res => {
            auth.logOut();
            changeBackground("url('https://upload.wikimedia.org/wikipedia/commons/7/73/Plaza_Che%2C_Bogot%C3%A1.jpg')");
        }).catch(e => {
            console.log("Something bad happened while logging out..." + e);
            auth.logOut();
        });
    }

    const handleCloseResults = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setShowResults(false);
    };

    const handleChangeTab = (event, newActiveTab) => {
        setActiveTab(newActiveTab);
        setShowResults(true);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const search = (event) => {
        event.preventDefault();
        if (event.key === 'Tab') {
            setShowResults(false);
        } else if (event.key === 'Escape') {
            setShowResults(false);
        }

        let input = document.getElementById('value').value

        if (input !== "") {
            searchAPI(input).then(res => {
                setFoundUsers(res.data.users);
                setFoundListings(res.data.listings);
            }).catch(e => {
                console.log("Something bad happened while search" + e);
            });
        } else {
            setFoundUsers([]);
            setFoundListings([]);
        }
        setShowResults(true);

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
                        <Link to="/MainScreen" style={{ textDecoration: "none" }}><Button variant="outlined" sx={{ marginLeft: "20px" }}> Inicio </Button></Link>
                        <Box sx={{
                            flexGrow: 1
                        }} />




                        <div ref={anchorRef} style={{marginRight: 10}}>
                            <Box sx={{
                                flexGrow: 0.1
                            }}>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, height: 30 }}
                                >
                                    <InputBase
                                        id="value"
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Realiza una busqueda"
                                        inputProps={{ 'aria-label': 'Realiza una busqueda' }}
                                        onSubmit={e => {
                                            e.preventDefault()
                                        }}
                                        onKeyUp={search}
                                        onFocus={search}
                                        type="text"
                                        autoComplete='off'
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <Search />
                                    </IconButton>
                                </Paper>
                            </Box>

                            {showResults && (FoundListings.length > 0 || FoundUsers.length > 0) ? (
                                <Popper
                                    open={showResults}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
                                    sx={{ width: 300 }}
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                        >
                                            <Paper sx={{ mt: 1 }}>
                                                <Box sx={{ width: '100%', backgroundColor: 'white' }}>
                                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                        <Tabs value={activeTab} onChange={handleChangeTab} aria-label="icon label tabs example" sx={{
                                                            width: "100%"
                                                        }}>
                                                            <Tab icon={<Home />} label="Publicaciones" sx={{
                                                                width: "50%"
                                                            }} />
                                                            <Tab icon={<People />} label="Personas" sx={{
                                                                width: "50%"
                                                            }} />
                                                        </Tabs>
                                                    </Box>
                                                </Box>
                                                <ClickAwayListener onClickAway={handleCloseResults}>
                                                    <MenuList
                                                        autoFocusItem={showResults}
                                                        id="composition-menu"
                                                        aria-labelledby="composition-button"
                                                        sx={{
                                                            overflowY: "auto",
                                                            maxHeight: 300
                                                        }}
                                                    >
                                                        {activeTab === 0 ? (FoundListings.map((data) => {
                                                            if (data?.active) {
                                                                return <MenuItem key={data?._id}><ListingResult key={data?._id} data={data} /></MenuItem>
                                                            } else { return "" }
                                                        })) : (FoundUsers.map((data) => {
                                                            return <MenuItem key={data?._id}><UserResult key={data?._id} data={data} /></MenuItem>
                                                        }))}
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            ) : (
                                <></>
                            )}

                        </div>
                        {
                            auth?.user?.type === "Landlord" ? <Link to="/ListingRegister" style={{ textDecoration: "none" }}><Button variant="outlined">¡Publicar!</Button></Link> : <></>
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
                                    <Avatar sx={{ width: 32, height: 32 }} src={`${URL_BACKEND}/images/profile/${auth.user?.[formAllDataUser.link]}`} />
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

                            {<Link to={`/profile/${auth?.user?._id}`} style={{ textDecoration: "none" }}>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Person fontSize='medium' />
                                    </ListItemIcon>
                                    Perfil
                                </MenuItem>
                            </Link>}

                            {auth.isLogged() &&
                                <Link to={auth.user?.type === "Landlord" ? "/RenterUpdate" : "/StudentUpdate"} style={{ textDecoration: "none" }}>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Create fontSize='medium' />
                                        </ListItemIcon> Actualizar datos
                                    </MenuItem>
                                </Link>
                            }


                            <Divider style={{
                                width: "100%"
                            }} />

                            {auth.user?.type === "Landlord" && <Link to="/Historial" style={{ textDecoration: "none" }}>
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