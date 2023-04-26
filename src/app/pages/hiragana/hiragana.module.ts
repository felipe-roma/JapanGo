import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HiraganaPageRoutingModule } from './hiragana-routing.module';

import { HiraganaPage } from './hiragana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HiraganaPageRoutingModule
  ],
  declarations: [HiraganaPage]
})
export class HiraganaPageModule {}
