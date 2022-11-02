import React from 'react';
import {Button, Grid, Box, Typography, TextField} from '@material-ui/core';
import {Link} from 'react-router-dom';
import './Login.css';

function Login(){
    return(
        <>
            <Grid container>
                <Grid item xs={6}>
                    <Box padding = {20}>
                        <form >
                            <Typography variant ='h3' component='h3' align='center' className='texto'>Entrar</Typography>
                            <TextField label='Usuário(e-mail)' name='usuario' margin ='normal' fullWidth/> 
                            <TextField  label='Senha' name='usuario' type='password' margin='normal' fullWidth/> 
                          <Box marginTop = {5} textAlign = 'center'>
                            <Link to='/home' className = 'text-decoration-none'>
                            
                                <Button type = 'submit' variant='contained' className='botao'>Entrar</Button>
                            </Link>
                          </Box>
                        </form>
                        <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>

                        <Typography variant="subtitle1" gutterBottom align="center">Ainda não tem uma conta? </Typography>
                        </Box>
                        <Typography variant="subtitle1" gutterBottom align="center" className='texto'>Cadastra-se</Typography>

                        </Box>

                    </Box>
                </Grid>

                <Grid item xs={6} className ='fundoLogin'>

                </Grid>
            </Grid>
        </>
    );
}
export default Login;