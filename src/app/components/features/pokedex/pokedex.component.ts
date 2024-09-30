import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '@models/app/card';
import { ROUTES_ENUM } from '@models/enum/routes';
import { Result } from '@models/response/response';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  providers: [ApiService],
  
})
export class PokedexComponent implements OnInit {
  //#region Public Properties
  public pokemons: Array<Result> = [];
  //#endregion

  //#region Private Properties
  //#endregion
  constructor(private apiService: ApiService, private router : Router) {}

  //#region Public Methods
  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemon(pokemonName: string): void {
    this.router.navigateByUrl(ROUTES_ENUM.POKEMON + '/' + pokemonName);
  }
  
  createCard(pokemon : Result) : Partial<Card> {
      return {
        content : pokemon.name,
        link : pokemon.url,
        textLink : `Vai al dettaglio del pokemon ${pokemon.name}`,
        title : pokemon.name
      }
  }
  //#endregion

  //#region Private Methods
  private loadPokemons(): void {
    this.apiService
      .getAllPokemons()
      .pipe(map((res) => res.results))
      .subscribe((res) => {
        this.pokemons = [...res];
      });
  }
  //#endregion
}
