import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '@models/response/response';
import { switchMap, take } from 'rxjs';
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
    private router: Router
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
          this.router.navigate(['/rubrica']);
        },
      });
  }
  //#endregion

  //#region Private methods
  private initFormInsert(): void {
    this.formInsert = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      name: new FormControl('', [Validators.required]),
    });
  }
  //#endregion
}
