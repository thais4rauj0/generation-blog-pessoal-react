import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import './Navbar.css';

function Navbar(){
    return(
        <>

          <AppBar position="static">
                <Toolbar variant="dense">
                    <Box className="cursor" >
                        <Typography variant="h5" color="inherit">
                           
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="end" width="100%">
                        <Box mx={1} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Home
                            </Typography>
                        </Box>
                        <Box mx={1} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Postagens
                            </Typography>
                        </Box>
                        <Box mx={1} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Temas
                            </Typography>
                        </Box>
                        <Box mx={1} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Cadastrar tema
                            </Typography>
                        </Box>
                        <Link to='/login' className ='text-decoration-none' >
                        <Box mx={1} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Logout
                            </Typography>
                        </Box>
                        </Link>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;