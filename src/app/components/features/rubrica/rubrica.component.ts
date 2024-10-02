import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '@models/response/response';
import { take } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-rubrica',
  templateUrl: './rubrica.component.html',
  styleUrls: ['./rubrica.component.scss'],
})
export class RubricaComponent implements OnInit {
  //#region Private variables
  //#endregion

  //#region Public variables
  public formSearch: FormGroup = new FormGroup({});
  public listaContatti: Users[] = [];
  //#endregion

  constructor(private apiService: ApiService, private router : Router) {
    this.initFormSearch();
  }

  //#region Public methods
  public ngOnInit(): void {
    this.getListaContatti();
  }

  public search(): void {}

  public goToDetail(id : string) : void {
    this.router.navigate(['rubrica-detail', id]);
  }

  public goToInsert() : void {
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
    this.apiService.getListaContatti().pipe(take(1)).subscribe(
        {
            next : (value) => {
                this.listaContatti = [...value];
            }
        }
    );
  }
  //#endregion
}
