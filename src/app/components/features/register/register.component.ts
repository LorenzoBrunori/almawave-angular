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
  public formRegistrazione: FormGroup = new FormGroup({});
  //#endregion

  constructor(private loginService: LoginService, private router: Router) {
    this.initFormRegistrazione();
  }

  //#region Public methods
  public ngOnInit(): void {}

  public register(): void {
    console.log(this.formRegistrazione.value);
    const user: User = {
      username: this.formRegistrazione.value.username,
      password: this.formRegistrazione.value.password,
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
  private initFormRegistrazione(): void {
    this.formRegistrazione = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }
  //#endregion
}
