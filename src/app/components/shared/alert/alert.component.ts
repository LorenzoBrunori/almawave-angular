import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, delay, filter, map, of, take } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { Alert } from '@models/app/alert.model';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  //#region Private Fields
  private _sub!: Subscription;
  //#endregion

  //#region Public Fields
  //#endregion

  constructor(private router: Router, public alertService: AlertService) {}

  //#region Private Methods

  //#endregion

  //#region Public Methods
  public ngOnInit(): void {
    this._sub = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        map((event) => event as NavigationStart)
      )
      .subscribe((event) => this.hideAlert());

      this.removeAlertAfterDelay();
  }

  public removeAlertAfterDelay(): void {
    const asObs = this.alertService.alert$.asObservable();
    asObs
      .pipe(
        filter((value) => !!value && value.show),
        map((value) => value as Alert),
        delay(8000)
      )
      .subscribe((value) => {
        this.alertService.alert$.next(null);
      });
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public setTypeAlert(alert: Alert): string {
    return alert.type;
  }

  public hideAlert(): void {
    this.alertService.alert$.next(null);
  }
  //#endregion
}
