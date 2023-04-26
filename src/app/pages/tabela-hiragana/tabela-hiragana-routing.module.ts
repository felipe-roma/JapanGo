import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabelaHiraganaPage } from './tabela-hiragana.page';

const routes: Routes = [
  {
    path: '',
    component: TabelaHiraganaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabelaHiraganaPageRoutingModule {}
