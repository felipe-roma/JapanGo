import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartaPage } from './carta.page';

const routes: Routes = [
  {
    path: '',
    component: CartaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartaPageRoutingModule {}
