import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertTypeEnum } from '@models/enum/alert.enum';
import { Users } from '@models/response/response';
import { switchMap, take } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-rubrica-detail',
  templateUrl: './rubrica-detail.component.html',
  styleUrls: ['./rubrica-detail.component.scss'],
})
export class RubricaDetailComponent implements OnInit {
  //#region Private variables
  //#endregion

  //#region Public variables
  public name : string = '';
  public username : string = '';
  public email : string = '';

  public contatto: Users = {} as Users;
  public modificaEnabled: boolean = false;
  //#endregion

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  //#region Public methods
  public ngOnInit(): void {
    this.loadContatto();
  }

  public update(): void {
    this.apiService
      .updateContatto(this.contatto.id, {
        email: this.email,
        name: this.name,
        username: this.username,
        id: this.contatto.id,
      })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.alertService.alert$.next({
            type: AlertTypeEnum.SUCCESS,
            message: 'Contatto modificato',
            show: true,
            closeButton: true,
            title: 'Operazione eseguita con successo',
          });
          this.router.navigate(['/rubrica']);
        },
        error: (err) => {
          this.alertService.alert$.next({
            type: AlertTypeEnum.DANGER,
            message: 'Errore nella modifica',
            show: true,
            closeButton: true,
            title: 'Attenzione',
          });
        },
      });
  }

  public delete(): void {
    this.apiService
      .deleteContatto(this.contatto.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.alertService.alert$.next({
            type: AlertTypeEnum.SUCCESS,
            message: 'Contatto eliminato',
            show: true,
            closeButton: true,
            title: 'Operazione eseguita con successo',
          });

          this.router.navigate(['/rubrica']);
        },
        error: (err) => {
          this.alertService.alert$.next({
            type: AlertTypeEnum.DANGER,
            message: 'Errore nella cancellazione',
            show: true,
            closeButton: true,
            title: 'Attenzione',
          });
        },
      });
  }

  public abilitaModifica(): void {
    // this.formDetail.enable({ emitEvent: false });
    this.modificaEnabled = !this.modificaEnabled;
  }

  public disabilitaModifica(): void {
    // this.formDetail.disable({ emitEvent: false });
    this.modificaEnabled = !this.modificaEnabled;
  }
  //#endregion

  //#region Private methods
  private loadContatto(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap) => {
          const id = paramMap.get('id');
          return this.apiService.getContatto(id as string);
        }),
        take(1)
      )
      .subscribe((value: Users) => {
        this.contatto = { ...value };
        this.name = value.name;
        this.username = value.username;
        this.email = value.email;
      });
  }
  //#endregion
}
