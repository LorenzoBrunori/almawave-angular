import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertTypeEnum } from '@models/enum/alert.enum';
import { take } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-rubrica-form',
  templateUrl: './rubrica-form.component.html',
  styleUrls: ['./rubrica-form.component.scss'],
})
export class RubricaFormComponent implements OnInit {
  //#region Private variables
  //#endregion

  //#region Public variables
  public formInsert: FormGroup = new FormGroup({});
  //#endregion

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.initFormInsert();
  }

  //#region Public methods
  public ngOnInit(): void {
  }

  public insert(): void {
    this.apiService
      .createContatto({
        email: this.formInsert.value.email,
        name: this.formInsert.value.name,
        username: this.formInsert.value.username,
        id : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.alertService.alert$.next({
            type: AlertTypeEnum.SUCCESS,
            message: 'Contatto creato',
            show: true,
            closeButton: true,
            title: 'Operazione eseguita con successo',
          });

          this.router.navigate(['/rubrica']);
        },
        error: (err) => {
          console.error(err);
          this.alertService.alert$.next({
            type: AlertTypeEnum.DANGER,
            message: 'Errore nella creazione',
            show: true,
            closeButton: true,
            title: 'Attenzione',
          });
        },
      });
  }
  //#endregion

  //#region Private methods
  private initFormInsert(): void {
    this.formInsert = new FormGroup({
      username: new FormControl('', ),
      email: new FormControl('', ),
      name: new FormControl('', ),
    });
  }
  //#endregion
}