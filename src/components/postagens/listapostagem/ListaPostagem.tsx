import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaPostagem.css';
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([]);
  
  const userId = useSelector<TokenState, TokenState['id']>(
    (state) => state.id
  )
  
  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado")
      navigate("/login")

    }
  }, [token])

  async function getPost() {
    await busca('/postagens', setPosts, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {

    getPost()
  }, [posts.length])

  return (
    <>

      {posts.map((post) => (
        <Box m={2}>
        <Card variant="outlined" className='fundo-card'>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Postagens
            </Typography>

            <Typography variant="h5" component="h2" className='tituloPostagem'>
              {post.titulo}
            </Typography>

            <Typography variant="body2" component="p" className='textoPost'>
              {post.texto}
            </Typography>
            
            <Typography variant="body2" component="p" className='descricao'>
              Data: {new Date(Date.parse(post.data)).toLocaleDateString()} <br />
              {/* Mostar data e hora: {new Date(Date.parse(post.data)).toLocaleString()} <br />
              Mostrar apenas hora: {new Date(Date.parse(post.data)).toLocaleTimeString()} */}
            </Typography>

            <Typography variant="body2" component="p" className='descricao'>
              Tema: {post.tema?.descricao}
            </Typography>
          </CardContent>

          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>
              <Link to={`/formularioPostagem/${post.id}`} className="text-decoration-none">
                <Box mx={1}>
                  <Button
                    variant="contained"
                    size="small"
                    className='botao'
                  >
                    Atualizar
                  </Button>
                </Box>
              </Link>

              <Link to={`/deletarPostagem/${post.id}`} className="text-decoration-none">
                <Box mx={1}>
                  <Button variant="contained" size="small" className='botaoCancelar'>
                    Deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
      ))}
      
    </>
    );
}

export default ListaPostagem;