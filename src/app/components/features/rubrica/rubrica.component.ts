import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertTypeEnum } from '@models/enum/alert.enum';
import { Users } from '@models/response/response';
import { take } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-rubrica',
  templateUrl: './rubrica.component.html',
  styleUrls: ['./rubrica.component.scss'],
})
export class RubricaComponent implements OnInit, OnDestroy {
  //#region Private variables
  //#endregion

  //#region Public variables
  public name : string = '';
  public username : string = '';
  public email : string = '';

  public listaContatti: Users[] = [];
  //#endregion

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  //#region Public methods
  public ngOnInit(): void {
    this.getListaContatti();
  }

  public ngOnDestroy(): void {}

  public goToDetail(id: string): void {
    this.router.navigate(['rubrica-detail', id]);
  }

  public goToInsert(): void {
    this.router.navigate(['rubrica-form']);
  }
  //#endregion

  //#region Private methods

  private getListaContatti(): void {
    this.apiService
      .getListaContatti()
      .pipe(take(1))
      .subscribe({
        next: (value) => {
          this.listaContatti = [...value];
        },
        error: (err) => {
          console.error(err);
          this.alertService.alert$.next({
            type: AlertTypeEnum.DANGER,
            message: 'Errore nel recupero della lista',
            show: true,
            closeButton: true,
            title: 'Attenzione',
          });
        },
      });
  }
  //#endregion
}
