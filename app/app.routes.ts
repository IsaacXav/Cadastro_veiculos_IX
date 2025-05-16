import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'cadastro-usuario',
    loadComponent: () => import('./cadastro-usuario/cadastro-usuario.page').then(m => m.CadastroUsuarioPage),
  },
  {
    path: 'cadastro-carro',
    loadComponent: () => import('./cadastro-carro/cadastro-carro.page').then( m => m.CadastroCarroPage)
  },

];
