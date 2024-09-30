import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseAllPokemons, ResponsePokemon } from '@models/response/response';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';

@Injectable()
export class ApiService {

    constructor(private httpClient: HttpClient) {
        
    }

    public getAllPokemons() : Observable<ResponseAllPokemons>{
        const url : string = `${ENV.apiUrl}pokemon`;
        return this.httpClient.get<ResponseAllPokemons>(url);
    }

    public getPokemon(pokemonName : string) : Observable<ResponsePokemon> {
        const url : string = `${ENV.apiUrl}pokemon/${pokemonName}`;
        return this.httpClient.get<ResponsePokemon>(url);
    }
}
