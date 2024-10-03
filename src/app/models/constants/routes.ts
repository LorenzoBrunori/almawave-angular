import { Routes } from '@angular/router';
import { LoginComponent, RegisterComponent, RubricaComponent, RubricaDetailComponent, RubricaFormComponent } from '@features/index';
import { ROUTES_ENUM } from '@models/enum/routes';

export const ROUTES: Routes = [
  {
    path: ROUTES_ENUM.LOGIN,
    component : LoginComponent
  },
  {
    path: ROUTES_ENUM.REGISTER,
    component : RegisterComponent
  },
  {
    path: ROUTES_ENUM.RUBRICA,
    component : RubricaComponent,
  },
  {
    path: ROUTES_ENUM.RUBRICA_DETAIL,
    component : RubricaDetailComponent,
  },
  {
    path: ROUTES_ENUM.RUBRICA_FORM,
    component : RubricaFormComponent,
  },
];
