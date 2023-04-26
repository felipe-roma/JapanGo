import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HiraganaPage } from './hiragana.page';

const routes: Routes = [
  {
    path: '',
    component: HiraganaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HiraganaPageRoutingModule {}
