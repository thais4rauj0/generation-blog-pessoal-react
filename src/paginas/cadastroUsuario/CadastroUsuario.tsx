import React , {useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import { Grid, Box, Typography, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './CadastroUsuario.css';

function CadastroUsuario(){
    let navigate = useNavigate();
    const [confirmarSenha,setConfirmarSenha] = useState<String>("") //verifica se o valor que o usuario digitou no confirmar senha é igual ao campo senha
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto:''
        })

    const [userResult, setUserResult] = useState<User>( //armazena os valores do retorno da API - JSON com usuário cadastrado
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto:''
        })

    useEffect(() => {
        if (userResult.id != 0) { //verifica se o id é diferente de 0 e direciona para a página de login
            navigate("/login")
        }
    }, [userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){ // captura o valor do campo confirmar senha e armazena no status de confirmar senha
        setConfirmarSenha(e.target.value) // será comparado com a senha na funçao onSubmit
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if(confirmarSenha == user.senha){ //verifica se o confirmar senha é igual a senha
        cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
        alert('Usuario cadastrado com sucesso')
        }else{
            alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
        }
    }
    return(
       <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
            <form onSubmit={onSubmit}>
                            <Typography variant ='h3' component='h3' align='center' className='texto'>Cadastrar</Typography>
                            <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedModel(e)} id= 'nome' label='Nome' name='nome' margin ='normal' fullWidth/> 
                            <TextField value={user.usuario} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='Usuário' name='usuario' margin='normal' fullWidth/> 
                            <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha'  name='senha' margin='normal' type='password' fullWidth />
                            <TextField value={confirmarSenha} onChange={(e:ChangeEvent<HTMLInputElement>)=> confirmarSenhaHandle(e)} id='confirmarSenha' label='Confirmar Senha' name='confirmarSenha' type = 'password' margin ='normal' fullWidth/> 
                          <Box marginTop = {5} textAlign = 'center'>
                           
                                <Button type = 'submit' variant='contained' className='botao'>Cadastrar</Button>
                                <Link to='/login' className = 'text-decoration-none'>
                                <Button variant='contained' className='botaoCancelar'>Cancelar</Button>
                                </Link>
                          </Box>
                        </form>
                </Box>

            </Grid>
       </Grid>
    );
}

export default CadastroUsuario;