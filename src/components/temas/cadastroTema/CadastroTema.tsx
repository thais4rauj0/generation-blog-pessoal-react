import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import {useNavigate, useParams } from 'react-router-dom'
import './CadastroTema.css';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';


function CadastroTema() {
    let navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const [token, setToken] = useLocalStorage('token');
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            navigate("/login")
    
        }
    }, [token])

    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/tema/${id}`, setTema, {
            headers: {
              'Authorization': token
            }
          })
        }

        function updatedTema(e: ChangeEvent<HTMLInputElement>) {

            setTema({
                ...tema,
                [e.target.name]: e.target.value,
            })
    
        }
        
        async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
            e.preventDefault()

    if(id !== undefined) {
      try {
        await put('/temas', tema, setTema, {
          headers: {
            Authorization: token,
          },
        })

        alert('Tema atualizado com sucesso')
      } catch (error) {
        alert('Falha ao atualizar o tema')
      }
    } else {
      try {
        await post('/temas', tema, setTema, {
          headers: {
            Authorization: token,
          },
        })

        alert('Tema cadastrado com sucesso')
      } catch (error) {
        alert('Falha ao cadastrar o tema')
      }
    }

    back()
        }
    
        function back() {
            navigate('/temas')
        }
  
    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3"  component="h1" align="center" className='titulo1' >Formulário de cadastro tema</Typography>
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" className='descricao' fullWidth />
                <Button type="submit" variant="contained" className='botao'>
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;