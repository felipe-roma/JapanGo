import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirecUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToTab = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    ...canActivate(redirecUnauthorizedToLogin)
  },
  {
    path: 'hiragana',
    loadChildren: () => import('./pages/hiragana/hiragana.module').then( m => m.HiraganaPageModule),
  },
  {
    path: 'carta',
    loadChildren: () => import('./pages/carta/carta.module').then( m => m.CartaPageModule)
  },
  {
    path: 'carta/:subirNivel',
    loadChildren: () => import('./pages/carta/carta.module').then( m => m.CartaPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'carta-tutorial',
    loadChildren: () => import('./pages/carta-tutorial/carta-tutorial.module').then( m => m.CartaTutorialPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToTab)
  },
  {
    path: 'nova-carta',
    loadChildren: () => import('./pages/nova-carta/nova-carta.module').then( m => m.NovaCartaPageModule)
  },
  {
    path: 'nova-carta/:subirNivel',
    loadChildren: () => import('./pages/nova-carta/nova-carta.module').then( m => m.NovaCartaPageModule)
  },
  {
    path: 'modal-page',
    loadChildren: () => import('./modal-page/modal-page.module').then( m => m.ModalPagePageModule)
  },
  {
    path: 'tabela-hiragana',
    loadChildren: () => import('./pages/tabela-hiragana/tabela-hiragana.module').then( m => m.TabelaHiraganaPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
