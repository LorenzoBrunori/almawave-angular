import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/response/response';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class LoginService {

    private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    public user: Observable<User> | null = null;

    constructor(private httpClient: HttpClient, private router : Router) {
        this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable() as Observable<User>;
    }

    public get userValue() {
        return this.userSubject.value as User;
    }
    
    public login(username: string, password: string): Observable<User> {
        return of({username, password} as User).pipe(
            map((user) => {
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            })
        );
        // return this.httpClient.post<User>(ENV.API_URL_MOCK + 'login', {username, password}).pipe(
        //     map((user) => {
        //         localStorage.setItem('user', JSON.stringify(user));
        //         this.userSubject.next(user);
        //         return user;
        //     })
        // );
    }

    public logOut (): void {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    public register(user: User): Observable<User> {
        return of<User>(user);
        // return this.httpClient.post(ENV.API_URL_MOCK + 'register', user);
    }
}
