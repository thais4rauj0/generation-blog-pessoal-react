import React from "react";
import "./Home.css";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

function Home() {
  return (
    <>
      <Grid
        container
        className="caixa"
      >
        <Grid alignItems="center" item xs={6}>
          <Box paddingX={20}>
            <Typography
              variant="h3"
              gutterBottom
              component="h3"
              align="center"
              className="titulo"
            >
              Bem vindo(a) ao meu blog!
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              color="textPrimary"
              component="h5"
              align="center"
              className="apresentacao"
            >
              Meu nome é Thais e vou compartilhar minha experiência em restaurantes e passeios pela cidade de São Paulo!
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}></Box>
            <Button
              variant="outlined"
              className = "botao"
            >
              Ver Postagens
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <img
            src="https://i.imgur.com/9KkVpTB.png"
            alt=""
            width="500px"
            height="500px"
          />
        </Grid>
        <Grid xs={12} style={{ backgroundColor: "white" }}></Grid>
      </Grid>
    </>
  );
}

export default Home;
