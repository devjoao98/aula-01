import * as React from 'react';
import { getProducts, saveProduct } from '../../../services/products'
import { useState } from 'react';
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
import SearchIcon from '@mui/icons-material/Search';

import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@mui/material/Button';

const mdTheme = createTheme();


function ProdutoCadastar() {

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [qtde, setQtde] = useState('');
  const [preco, setPreco] = useState('');

  async function handleSubmit(){
    const data = {
      nome_produto: nome, 
      descricao_produto: descricao, 
      preco_produto: Number(
        preco.split(",").join(".")
      ),
      qtde_produto: qtde
    };
    
    const products = await getProducts();
    
    console.log(products)

    if(nome!=='' && descricao!=='' && qtde!=='' && preco!=='' ){
      await saveProduct(data)
      window.location.href='/admin/produtos'
      // if(response.status ===200){
      //   window.location.href='/admin/produtos'
      // }else{
      //   alert('Erro ao cadastrar o Produto!')
      // }
    }else{
      alert('Por favor, preencha todos os campos!')
    };
    
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MenuAdmin title={'Produtos'}/>
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
            <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
              <Link component={RouterLink} to="/admin/produtos">
                <Button style={{marginBottom:10}} variant='contained' color='primary' startIcon={<SearchIcon/>}>
                  LOCALIZAR
                </Button>
              </Link>
              <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                <h2>Cadastro de produtos</h2>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={9}>
                    <TextField
                    required
                    id="nome"
                    name="nome "
                    label="Nome"
                    fullWidth
                    autoComplete="given-nome"
                    variant="standard"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    />  
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                    required
                    id="descricao"
                    name="descricao "
                    label="Descrição"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                    required
                    id="qtde"
                    name="qtde "
                    label="Quantidade"
                    fullWidth
                    type="number"
                    variant="standard"
                    value={qtde}
                    onChange={e => setQtde(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    id="preco"
                    name="preco "
                    label="Preço"
                    type="number"
                    variant="standard"
                    defaultValue={preco}
                    onChange={e => setPreco(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
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
};

export default function Dashboard() {
  return <ProdutoCadastar />;
};