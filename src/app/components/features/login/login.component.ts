import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //#region Private variables
  //#endregion

  //#region Public variables
  public formLogin: FormGroup = new FormGroup({});
  //#endregion

  constructor(private router: Router, public loginService: LoginService) {
    this.initFormLogin();
  }

  //#region Public methods
  public ngOnInit(): void {}

  public goToRegister(): void {
    this.router.navigate(['register']);
  }

  public login(): void {
    if (this.formLogin.invalid) {
      return;
    }
    this.loginService
      .login(this.formLogin.value.username, this.formLogin.value.password)
      .pipe(take(1))
      .subscribe({
        next: (value) => {
          this.router.navigate(['/rubrica']);
        },
      });
  }
  //#endregion

  //#region Private methods
  private initFormLogin(): void {
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  //#endregion
}
