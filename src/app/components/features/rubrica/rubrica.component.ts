import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertTypeEnum } from '@models/enum/alert.enum';
import { Users } from '@models/response/response';
import { BehaviorSubject, debounceTime, Subject, take, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-rubrica',
  templateUrl: './rubrica.component.html',
  styleUrls: ['./rubrica.component.scss'],
})
export class RubricaComponent implements OnInit, OnDestroy {
  //#region Private variables
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private tempListaContatti: Users[] = [];
  //#endregion

  //#region Public variables
  public formSearch: FormGroup = new FormGroup({});
  public listaContatti: Users[] = [];
  //#endregion

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.initFormSearch();
  }

  //#region Public methods
  public ngOnInit(): void {
    this.getListaContatti();
    this.search();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public search(): void {
    this.formSearch.valueChanges.pipe(debounceTime(500),takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        const { username, email, name } = value;
        const searchTerm = (term: string) => term.toLowerCase().trim();
        const filter = (contatto: Users) =>
          (!username || contatto.username.toLowerCase().includes(searchTerm(username))) &&
          (!email || contatto.email.toLowerCase().includes(searchTerm(email))) &&
          (!name || contatto.name.toLowerCase().includes(searchTerm(name)));
        this.listaContatti = this.tempListaContatti.filter(filter);
      },
    });
  }

  public goToDetail(id: string): void {
    this.router.navigate(['rubrica-detail', id]);
  }

  public goToInsert(): void {
    this.router.navigate(['rubrica-form']);
  }
  //#endregion

  //#region Private methods
  private initFormSearch(): void {
    this.formSearch = new FormGroup({
      username: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      name: new FormControl(''),
    });
  }

  private getListaContatti(): void {
    this.apiService
      .getListaContatti()
      .pipe(take(1))
      .subscribe({
        next: (value) => {
          this.listaContatti = [...value];
          this.tempListaContatti = [...value];
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
