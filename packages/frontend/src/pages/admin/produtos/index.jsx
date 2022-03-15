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
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getProducts, deleteProduct } from '../../../services/products';

import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

const mdTheme = createTheme();


function FormatPrice(number){
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number)
}

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    async function loadProducts(){
      const response = await getProducts();
      console.log(response);
      setProducts(response);
    }
    loadProducts();
  },[])

  async function handleDelete(id){
    if(window.confirm("Deseja realmente excluir este produto?")){
      var result = await deleteProduct(id);
      if(result.status===200){
        window.location.href = '/admin/produtos'
      }
    }else{
      alert('Ocorreu um erro. Por favor tente novamente!')
    }
  }



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
            <Grid container spacing={2}> 
              <Grid item sm={12}>
                <Link component={RouterLink} to="/admin/produtos/cadastrar">
                  <Button style={{marginBottom:10}} variant='contained' color='success' startIcon={<AddCircleOutlineIcon/>}>
                    INCLUIR
                  </Button>
                </Link>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                  <h2>Listagem de Produtos</h2>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>NOME</TableCell>
                              <TableCell align="height">QTDE</TableCell>
                              <TableCell align="center">DESCRIÇÃO</TableCell>
                              <TableCell align="center">DATA/HORA</TableCell>
                              <TableCell align="center">PREÇO</TableCell>
                              <TableCell align="center">AÇÕES</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {products.map((row) => (
                              <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.nome_produto}
                                </TableCell>
                                <TableCell align="height">{row.productQtd}</TableCell>
                                <TableCell align="center">{row.productDescription}</TableCell>
                                <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                                <TableCell align="center">{FormatPrice(row.productPrice)}</TableCell>
                                <TableCell align="right">
                                  <ButtonGroup color='primary' aria-label="outlined primary button group">
                                    <Button to={'/admin/produtos/editar/'+row._id}color='info' startIcon={<EditIcon/>}>
                                      ALTERAR
                                    </Button>
                                    <Button onClick={()=> handleDelete(row._id)} color='error' startIcon={<DeleteIcon/>}>
                                      DELETAR
                                    </Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid> 
                </Paper>
              </Grid>
            </Grid>
            <Footer sx={{pt:4}}/>
            </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <AllProducts />;
}