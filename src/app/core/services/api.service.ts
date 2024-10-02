import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '@models/response/response';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';

@Injectable({providedIn : 'root'})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getListaContatti(): Observable<Array<Users>> {
    return this.httpClient.get<Array<Users>>(ENV.API_URL_MOCK + 'users');
  }

  public getContatto(id: string): Observable<Users> {
    return this.httpClient.get<Users>(ENV.API_URL_MOCK + 'users/' + id);
  }

  public deleteContatto(id: string): Observable<Users> {
    return this.httpClient.delete<Users>(ENV.API_URL_MOCK + 'users/' + id);
  }

  public updateContatto(id: string, user: Users): Observable<Users> {
    return this.httpClient.put<Users>(ENV.API_URL_MOCK + 'users/' + id, user);
  }

  public createContatto(user: Users): Observable<Users> {
    return this.httpClient.post<Users>(ENV.API_URL_MOCK + 'users', user);
  }
}
