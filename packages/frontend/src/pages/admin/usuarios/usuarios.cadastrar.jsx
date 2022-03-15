import * as React from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';


import api from '../../../services/api'

const mdTheme = createTheme();


function UsuarioCadastar() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tipo, setTipo] = useState('')
  const [senha, setSenha] = useState('')

  async function handleSubmit(){
    const data = {
      nome_usuario: nome, 
      email_usuario: email, 
      tipo_usuario: tipo, 
      senha_usuario: senha
    }

    if(nome!=='' && email!=='' && senha!=='' && tipo!=='' ){

      const response = await api.post('/api/usuarios', data)

      if(response.status ===200){
        window.location.href='/admin/usuarios'
      }else{
        alert('Erro ao cadastrar o usuário!')
      }
    }else{
      alert('Por favor, preencha todos os campos!')
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
            <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
              <Link component={RouterLink} to="/admin/usuarios">
                <Button style={{marginBottom:10}} variant='contained' color='primary' startIcon={<SearchIcon/>}>
                  LOCALIZAR
                </Button>
              </Link>

              <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                <h2>Cadastro de usuário</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={11}>
                    <TextField
                    required
                    id="nome"
                    name="nome "
                    label="Nome"
                    fullWidth
                    variant="standard"
                    defaultValue={nome}
                    onChange={e => setNome(e.target.value)}
                    />  
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                    required
                    id="email"
                    name="email "
                    label="E-mail"
                    fullWidth
                    variant="standard"
                    defaultValue={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth required variant="standard" sx={12} sm={5}>
                      <InputLabel id="demo-simple-select-standard-label">Tipo</InputLabel>
                        <Select
                          id="demo-simple-select-standard"
                          variant="standard"
                          defaultValue={tipo}
                          onChange={e => setTipo(e.target.value)}
                          >
                          <MenuItem value={1}>Gerente</MenuItem>
                          <MenuItem value={2}>Administrador</MenuItem>
                          <MenuItem value={3}>Funcionário</MenuItem>
                        </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                    required
                    id="senha"
                    name="senha"
                    label="Senha"
                    fullWidth
                    type="password"
                    variant="standard"
                    defaultValue={senha}
                    onChange={e => setSenha(e.target.value)}
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
  return <UsuarioCadastar />;
}