import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponsePokemon } from '@models/response/response';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
  providers: [ApiService],
})
export class PokemonComponent implements OnInit {
  //#region Public Properties
  public pokemon: ResponsePokemon = {} as ResponsePokemon;
  //#endregion

  //#region Private Properties
  //#endregion
  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}

  //#region Public Methods
  ngOnInit(): void {
    this.loadPokemon();
  }

  //#endregion

  //#region Private Methods
  private loadPokemon(): void {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      const pokemonName = paramMap.get('id');
      if (pokemonName) {
        this.apiService.getPokemon(pokemonName).subscribe((res) => {
          this.pokemon = res;
        })
      }
    });
  }
  //#endregion
}
