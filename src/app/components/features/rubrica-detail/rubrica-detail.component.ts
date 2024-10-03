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
  public formDetail: FormGroup = new FormGroup({});
  public contatto: Users = {} as Users;
  public modificaEnabled: boolean = false;
  //#endregion

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.initFormDetail();
  }

  //#region Public methods
  public ngOnInit(): void {
    this.loadContatto();
  }

  public update(): void {
    this.apiService
      .updateContatto(this.contatto.id, {
        email: this.formDetail.value.email,
        name: this.formDetail.value.name,
        username: this.formDetail.value.username,
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
    this.formDetail.enable({ emitEvent: false });
    this.modificaEnabled = !this.modificaEnabled;
  }

  public disabilitaModifica(): void {
    this.formDetail.disable({ emitEvent: false });
    this.modificaEnabled = !this.modificaEnabled;
  }
  //#endregion

  //#region Private methods
  private initFormDetail(): void {
    this.formDetail = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      name: new FormControl(''),
    });
  }

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
        this.formDetail
          .get('username')
          ?.patchValue(value.username, { emitEvent: false });
        this.formDetail
          .get('email')
          ?.patchValue(value.email, { emitEvent: false });
        this.formDetail
          .get('name')
          ?.patchValue(value.name, { emitEvent: false });
        this.formDetail.disable({ emitEvent: false });
      });
  }
  //#endregion
}
