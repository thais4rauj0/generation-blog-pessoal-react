import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@material-ui/core';
import {Link, useNavigate} from 'react-router-dom';
import './Navbar.css';
import useLocalStorage from 'react-use-localstorage';

function Navbar(){
    const [token, setToken] = useLocalStorage('token');
    let navigate = useNavigate();

    function goLogout(){
        setToken('')
        alert ('Você saiu')
        navigate('/login')
    }
    return(
        <>

          <AppBar position="static">
                <Toolbar variant="dense">
                    <Box className="cursor" >
                        <Typography variant="h5" color="inherit" className='nomeBlog'>
                          ViaSP
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="end" width="100%">
                            <Link to='/home' className='text-decoration-none'>
                        <Box mx={1} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Home
                            </Typography>
                        </Box>
                            </Link>
                        <Link to='/posts' className='text-decoration-none'>

                        <Box mx={1} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Postagens
                            </Typography>
                        </Box>

                        </Link>
                        <Link to='/temas' className='text-decoration-none'>

                        <Box mx={1} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Temas
                            </Typography>
                        </Box>

                        </Link>

                        <Link to='/formularioTema' className='text-decoration-none'>

                        <Box mx={1} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Cadastrar tema
                            </Typography>
                        </Box>
                        </Link>
                        
                        <Box mx={1} className="cursor" onClick={goLogout}>
                            <Typography variant="h6" color="inherit">
                               Sair
                            </Typography>
                        </Box>
                      
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;