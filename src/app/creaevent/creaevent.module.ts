import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreaeventPageRoutingModule } from './creaevent-routing.module';

import { CreaeventPage } from './creaevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreaeventPageRoutingModule
  ],
  declarations: [CreaeventPage]
})
export class CreaeventPageModule {}
