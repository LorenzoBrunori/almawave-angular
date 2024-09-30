import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from '@models/constants/routes';

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
