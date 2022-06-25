import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreaeventPage } from './creaevent.page';

const routes: Routes = [
  {
    path: '',
    component: CreaeventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreaeventPageRoutingModule {}
