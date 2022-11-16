import React, {ChangeEvent, useState, useEffect} from 'react';
import {Button, Grid, Box, Typography, TextField} from '@material-ui/core';
import {Link, useNavigate} from 'react-router-dom';
import { login} from '../../services/Service';
import './Login.css';
import UserLogin from '../../models/UserLogin';
import { addId, addToken } from '../../store/tokens/actions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Login(){
    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: '',
      });
      const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: '',
      });

        let history = useNavigate();

        // Hooks que vão manipular o nosso Local Storage para gravar o Token
        // const [token, setToken] = useLocalStorage('token');
      
        //novo metodo de login, utilizando o redux
        const dispatch = useDispatch()
      
        const [token, setToken] = useState('')
      
        // Função que junto com a setUserLogin irá atualizar o valor inicial da userLogin
        function updateModel(event: ChangeEvent<HTMLInputElement>) {
          setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value,
          });
        }
      
        // Função que irá enviar os dados de fato para o backend, interligando com o conteudo da Service.ts
        async function onSubmit(e: ChangeEvent<HTMLFormElement>){
            e.preventDefault();
            try{
                await login(`/usuarios/logar`, userLogin, setToken)

                alert('Usuário logado com sucesso!');
            }catch(error){
                alert('Dados do usuário inconsistentes. Erro ao logar!');
            }
        }

      
        // Hook de efeito colateral, sempre executa uma função quando o que estiver no seu Array é alterado
        useEffect(() => {
          if (token !== '') {
            dispatch(addToken(token))
            history('/home');
          }
        }, [token]);
      
    return(
        <>
            <Grid container>
                <Grid item xs={6}>
                    <Box padding = {20}>
                        <form onSubmit={onSubmit}>
                            <Typography variant ='h3' component='h3' align='center' className='texto'>Entrar</Typography>
                            <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>)=>updateModel(e)} id ='usuario' label='Usuário(e-mail)' name='usuario' margin ='normal' fullWidth/> 
                            <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>) => updateModel(e)} id='senha' label='senha' name='senha' margin='normal' type='password'fullWidth />
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