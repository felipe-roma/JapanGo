import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartaTutorialPageRoutingModule } from './carta-tutorial-routing.module';

import { CartaTutorialPage } from './carta-tutorial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartaTutorialPageRoutingModule
  ],
  declarations: [CartaTutorialPage]
})
export class CartaTutorialPageModule {}
