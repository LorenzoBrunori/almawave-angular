import { Routes } from '@angular/router';
import { PokedexComponent } from '@features/pokedex/pokedex.component';
import { ROUTES_ENUM } from '@models/enum/routes';

export const ROUTES: Routes = [
  {
    path: ROUTES_ENUM.POKEDEX,
    // loadComponent : () => import('@features/pokedex/pokedex.component').then(m => m.PokedexComponent),
    component: PokedexComponent,
  },
  {
    path: ROUTES_ENUM.POKEMON,
    loadChildren: () => import('@features/pokemon/pokemon.module').then(m => m.PokemonModule),
  },

  { path: '', redirectTo: ROUTES_ENUM.POKEDEX, pathMatch: 'full' },
  { path: '**', redirectTo: ROUTES_ENUM.POKEDEX, pathMatch: 'full' },
];
