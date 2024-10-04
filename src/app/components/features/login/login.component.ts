import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertTypeEnum } from '@models/enum/alert.enum';
import { take } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
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
  public username: string = '';
  public password: string = '';
  //#endregion

  constructor(
    private router: Router,
    private alertService: AlertService,
    public loginService: LoginService
  ) {
  }

  //#region Public methods
  public ngOnInit(): void {}

  public goToRegister(): void {
    this.router.navigate(['register']);
  }

  public login(): void {
    this.loginService
      .login(this.username, this.password)
      .pipe(take(1))
      .subscribe({
        next: (value) => {
          this.router.navigate(['/rubrica']);
        },
        error: (err) => {
          this.alertService.alert$.next({
            type: AlertTypeEnum.DANGER,
            message: 'Errore nel login',
            show: true,
            closeButton: true,
            title: 'Attenzione',
          });
        },
      });
  }
  //#endregion

  //#region Private methods
  //#endregion
}
