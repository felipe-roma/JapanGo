import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartaTutorialPage } from './carta-tutorial.page';

const routes: Routes = [
  {
    path: '',
    component: CartaTutorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartaTutorialPageRoutingModule {}
