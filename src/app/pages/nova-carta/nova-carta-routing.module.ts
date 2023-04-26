import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovaCartaPage } from './nova-carta.page';

const routes: Routes = [
  {
    path: '',
    component: NovaCartaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovaCartaPageRoutingModule {}
