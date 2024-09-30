import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../components.module';
import { PokemonComponent } from './pokemon.component';

const routes: Routes = [
  {
    path: ':id',
    component: PokemonComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [PokemonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  exports: [],
})
export class PokemonModule {}
