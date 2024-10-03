import { Component, OnDestroy, OnInit } from '@angular/core';
import { Alert } from '@models/app/alert.model';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  //#region Private Fields
  //#endregion

  //#region Public Fields
  //#endregion

  constructor(public alertService: AlertService) {}

  //#region Private Methods

  //#endregion

  //#region Public Methods
  public ngOnInit(): void {

  }



  public ngOnDestroy(): void {
  }

  public setTypeAlert(alert: Alert): string {
    return alert.type;
  }

  public hideAlert(): void {
    this.alertService.alert$.next(null);
  }
  //#endregion
}
