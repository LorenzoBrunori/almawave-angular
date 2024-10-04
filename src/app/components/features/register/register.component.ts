import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@models/response/response';
import { take } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  //#region Private variables
  //#endregion

  //#region Public variables
  public username: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  //#endregion

  constructor(private loginService: LoginService, private router: Router) {
  }

  //#region Public methods
  public ngOnInit(): void {}

  public register(): void {
    const user: User = {
      username: this.username,
      password: this.password,
      id: '999',
    };
    this.loginService
      .register(user)
      .pipe(take(1))
      .subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['login']);
        },
      });
  }
  //#endregion

  //#region Private methods

  //#endregion
}
