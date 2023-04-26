import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovaCartaPageRoutingModule } from './nova-carta-routing.module';

import { NovaCartaPage } from './nova-carta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovaCartaPageRoutingModule
  ],
  declarations: [NovaCartaPage]
})
export class NovaCartaPageModule {}
