import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

import LogoutIcon from '@mui/icons-material/Logout';
import api from '../services/api';
import { getToken, logout } from '../services/auth';

export const mainListItems = (
  <div>
    <ListSubheader inset>Menu</ListSubheader>
    <ListItem button component='a' href='/admin'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Dashboard'/>
    </ListItem>
    <ListItem button component='a' href='/admin/usuarios'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary='Usuarios' />
    </ListItem>
    <ListItem button component='a' href='/admin/produtos'>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary='Produtos' />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Opções</ListSubheader>
    <ListItem button onClick={confirmSair}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);

async function confirmSair(){
  if(
    window.confirm('Deseja realmente sair do sistema?')){
      const response = await api.get('/api/usuarios/destroyToken', {headers: {token:getToken()}})
      if(response.status===200){
        logout();
        window.location.href = '/admin/login';
      }else{
        alert('Não foi possével fazer o logout!');
      }
  }

}