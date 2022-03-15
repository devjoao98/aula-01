import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MenuAdmin from '../../../components/menu.admin';
import Footer from '../../../components/footer-admin'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { getProduct, updateProduct } from '../../../services/products';
import { useParams } from 'react-router-dom';

const mdTheme = createTheme();

function ProdutoEditar() {

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [qtde, setQtde] = useState('')
  const [preco, setPreco] = useState('')

  const { idProduto } = useParams()

  
  useEffect( () => {
    async function getProduto(){
      var response = await getProduct(idProduto);
      console.log(response);
      setNome(response.nome_produto)
      setDescricao(response.descricao_produto)
      setPreco(response.preco_produto)
      setQtde(response.qtde_produto)
    }

    getProduto()
  },[idProduto])

  async function handleSubmit(){
    const data = {
      id: idProduto,
      nome_produto: nome, 
      descricao_produto: descricao, 
      preco_produto: preco,
      qtde_produto: qtde
    }

    if (nome!=='' && descricao!=='' && preco!=='' && qtde!=='' ) {
      await updateProduct( data);
      window.location.href='/admin/produtos'

    //   if(response.status ===200){
    //   } else{
    //     alert('Erro ao atualizar o produtos!')
    //   }
    // } else{
    //   alert('Por favor, preencha todos os campos!')
    // 
    }

  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MenuAdmin title={'Usuários'}/>
        <Box
          component="main"
          sx={{
          backgroundColor: (theme) =>
              theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            }}
            >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                <h2>Atualização de usuário</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={11}>
                    <TextField
                    required
                    id="nome"
                    name="nome "
                    label="Nome"
                    fullWidth
                    variant="standard"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    />  
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                    required
                    id="qtde"
                    name="qtde "
                    label="Quantidade"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={qtde}
                    onChange={e => setQtde(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                    required
                    id="descricao"
                    name="descricao "
                    label="Descrição"
                    fullWidth
                    variant="standard"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                    required
                    id="preco"
                    name="preco"
                    label="preco"
                    fullWidth
                    variant="standard"
                    value={preco}
                    onChange={e => setPreco(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button onClick={handleSubmit} variant="contained" color="success">
                      Salvar
                    </Button>
                  </Grid>
                </Grid> 
              </Paper>
            <Footer  sx={{pt:4}}/>
            </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <ProdutoEditar />;
}