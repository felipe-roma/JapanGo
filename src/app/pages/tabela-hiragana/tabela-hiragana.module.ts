import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabelaHiraganaPageRoutingModule } from './tabela-hiragana-routing.module';

import { TabelaHiraganaPage } from './tabela-hiragana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabelaHiraganaPageRoutingModule
  ],
  declarations: [TabelaHiraganaPage]
})
export class TabelaHiraganaPageModule {}
