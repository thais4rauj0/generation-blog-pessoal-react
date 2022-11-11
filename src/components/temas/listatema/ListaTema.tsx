import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Box, Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import './ListaTema.css';
import Tema from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';
import { getTokenSourceMapRange } from 'typescript';
import { busca } from '../../../services/Service';

function ListaTema(){
    const [temas, setTemas] = useState<Tema[]>([]);
    const [token,setToken] = useLocalStorage('token');
    let navigate = useNavigate(); 

    useEffect(()=>{
        if(token==''){
            alert('Você precisa estar logado!');
            navigate('/login')
        }
    }, [token])

    async function getTema(){
        await busca('/temas', setTemas, {
            headers: {
              Authorization: token
            }
          })
    }

    useEffect(()=>{
        getTema()
        console.log('tema');
    }, [temas.length]
    )

    return (
        <>

         {/* o Map irá percorrer o array de temas, e gerar um card novo para cada tema existente */}
      {temas.map((tema, index) => (
        <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tema {index + 1}
            </Typography>

            <Typography variant="h5" component="h2">
              {tema.descricao}
            </Typography>
          </CardContent>

          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>
              <Link to={`/editarTema/${tema.id}`} className="text-decoration-none">
                <Box mx={1}>
                  <Button
                    variant="contained"
                    className="botao"
                    size="small"
                    color="primary"
                  >
                    Atualizar
                  </Button>
                </Box>
              </Link>

              <Link to={`/apagarTema/${tema.id}`} className="text-decoration-none">
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
    )
}
export default ListaTema;