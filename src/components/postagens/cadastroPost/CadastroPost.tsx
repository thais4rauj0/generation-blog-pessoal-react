import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import './CadastroPost.css';
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';
import Postagem from '../../../models/Postagem';
import { busca, buscaId, post, put } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import User from '../../../models/User';
import { useSelector } from 'react-redux';

function CadastroPost() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [temas, setTemas] = useState<Tema[]>([])
  const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
    );

  useEffect(() => {
      if (token == "") {
          alert("Você precisa estar logado")
          navigate("/login")

      }
  }, [token])

  const [tema, setTema] = useState<Tema>(
      {
          id: 0,
          descricao: ''
      })
  const [postagem, setPostagem] = useState<Postagem>({
    id:0,
    titulo: '',
    texto: '',
    data: '',
    tema: null,
    usuario: null
  })

  useEffect(() => { 
      setPostagem({
          ...postagem,
          tema: tema
      })
  }, [tema])

  useEffect(() => {
      getTemas()
      if (id !== undefined) {
          findByIdPostagem(id)
      }
  }, [id])

  async function getTemas() {
      await busca("/temas", setTemas, {
          headers: {
              'Authorization': token
          }
      })
  }

  async function findByIdPostagem(id: string) {
      await buscaId(`postagens/${id}`, setPostagem, {
          headers: {
              'Authorization': token
          }
      })
  }

  function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {

      setPostagem({
          ...postagem,
          [e.target.name]: e.target.value,
          tema: tema
      })

  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault()

      if (id !== undefined) {
          put(`/postagens`, postagem, setPostagem, {
              headers: {
                  'Authorization': token
              }
          })
          alert('Postagem atualizada com sucesso');
      } else {
          post(`/postagens`, postagem, setPostagem, {
              headers: {
                  'Authorization': token
              }
          })
          alert('Postagem cadastrada com sucesso');
      }
      back()

  }

  function back() {
      navigate('/posts')
  }

    return (
        <Container maxWidth='sm' className='topo'>
        <form onSubmit={onSubmit}>
          <Typography variant='h3' align='center'>Formulário de cadastro de postagem</Typography>

          <TextField
            id='titulo'
            value={postagem.titulo}
            onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event) }
            name='titulo'
            label='Titulo da postagem'
            variant='outlined'
            margin='normal'
            fullWidth />

          <TextField 
            id='texto' 
            value={postagem.texto}
            onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event) }
            name='texto' 
            label='Texto da postagem' 
            variant='outlined' 
            margin='normal' 
            fullWidth
            multiline
            required
            minRows={4}
            />

          <FormControl fullWidth>
            <InputLabel id='temaSelect'>Tema</InputLabel>
            <Select labelId='temaSelect' id='tema' 
            onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
              headers: {
                Authorization: token
              }
            })}>
              
              {temas.map((tema) => (
                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
              ))}

              
            </Select>
            <FormHelperText>Escolha um tema para a postagem</FormHelperText>

            <Button type='submit' variant='contained' color='primary' disabled={tema.id === 0}>Finalizar</Button>
          </FormControl>
        </form>
      </Container>
    
    )
}
export default CadastroPost;