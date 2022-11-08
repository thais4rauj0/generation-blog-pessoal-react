import React, {ChangeEvent, useState, useEffect} from 'react';
import {Button, Grid, Box, Typography, TextField} from '@material-ui/core';
import {Link, useNavigate} from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { login} from '../../services/Service';
import './Login.css';
import UserLogin from '../../models/UserLogin';
import { setTokenSourceMapRange } from 'typescript';

function Login(){
        let navigate = useNavigate();
        const[token, setToken] = useLocalStorage('token');
        const[userLogin, setUserLogin]= useState <UserLogin> (
            {
            id:0,
            usuario:'',
            senha: '',
            token: ''
            }
        )

        function updatedModel(e: ChangeEvent<HTMLInputElement>){

            setUserLogin({
                ...userLogin,
                [e.target.name]: e.target.value
            })
        }

        useEffect(()=>{
            if(token != ''){
                navigate('/home')
             }
             }, [token])

        async function onSubmit(e:ChangeEvent<HTMLFormElement>){
            e.preventDefault();

           try {
                await login('/usuarios/logar',userLogin,setToken)
                alert('Usuario logado com sucesso!');
           } catch (error) {
            alert('Dados do usuario inconsistentes. Erro ao Logar!');
           }
        }
    return(
        <>
            <Grid container>
                <Grid item xs={6}>
                    <Box padding = {20}>
                        <form onSubmit={onSubmit}>
                            <Typography variant ='h3' component='h3' align='center' className='texto'>Entrar</Typography>
                            <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>)=>updatedModel(e)} id ='usuario' label='Usuário(e-mail)' name='usuario' margin ='normal' fullWidth/> 
                            <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' name='senha' margin='normal' type='password'fullWidth />
                          <Box marginTop = {5} textAlign = 'center'>  

                                <Button type = 'submit' variant='contained' className='botao'>Entrar</Button>
                                
                          </Box>
                        </form>
                        <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>

                        <Typography variant="subtitle1" gutterBottom align="center">Ainda não tem uma conta? </Typography>
                        </Box>
                        
                        <Link to='/cadastrousuario' >
                        <Typography variant="subtitle1" gutterBottom align="center" className='texto'>Cadastra-se</Typography>
                        </Link>

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