import React from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

//IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard'
import Produtos from './pages/admin/produtos'
import ProdutoEditar from './pages/admin/produtos/produtos.editar';
import ProdutoCadastrar from './pages/admin/produtos/produtos.cadastrar';

import Usuarios from './pages/admin/usuarios'
import UsuarioEditar from './pages/admin/usuarios/usuarios.editar'
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';

//IMPORTS CLIENT
import Home from './pages/Client/home';
import ProdutoDeteils from './pages/Client/produto/produtos.details';
import Login from './pages/admin/login';

import { TOKEN_KEY } from './services/auth';

const PrivateRoute = ({children, redirectTo}) => {
    const isAutenticated = localStorage.getItem(TOKEN_KEY) !== null

    return isAutenticated ? children : <Navigate to={redirectTo} />
}


export default function Router(){
    return(
        
        <BrowserRouter>
            <Routes>
                {/* Rota Client*/}
                <Route path='/' element={<Home/>} />
                <Route path='/produtos/:idProduto' element={<ProdutoDeteils/>} />

                {/* Rota Admin*/}
                <Route path='/admin/login' element={<Login/>} />
                <Route path='/admin' element={
                    <PrivateRoute redirectTo='/admin/login'>
                        <Dashboard/>
                    </PrivateRoute>
                } />
                
                {/* Rota Produtos*/}
                <Route path='/admin/produtos' element={<Produtos/>} />
                <Route path='/admin/produtos/cadastrar' element={
                     <PrivateRoute redirectTo='/admin/login'>
                        <ProdutoCadastrar/>
                     </PrivateRoute>
                    } />
                <Route path='/admin/produtos/editar/:idProduto' element={
                    <PrivateRoute redirectTo='/admin/login'>
                        <ProdutoEditar/>
                    </PrivateRoute>
                } />
                
                {/* Rota Usuários*/}
                <Route path='/admin/usuarios' element={
                    <PrivateRoute redirectTo='/admin/login'>
                        <Usuarios/>
                    </PrivateRoute>
                    } />
                <Route path='/admin/usuarios/cadastrar' element={
                    <PrivateRoute redirectTo='/admin/login'>
                        <UsuarioCadastrar/>
                    </PrivateRoute>
                } />
                <Route path='/admin/usuarios/editar/:idUsuario' element={
                    <PrivateRoute redirectTo='/admin/login'>
                        <UsuarioEditar/>
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}