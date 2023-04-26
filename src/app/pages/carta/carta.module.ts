import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartaPageRoutingModule } from './carta-routing.module';

import { CartaPage } from './carta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartaPageRoutingModule,
  ],
  declarations: [
    CartaPage
  ]
})
export class CartaPageModule {}
