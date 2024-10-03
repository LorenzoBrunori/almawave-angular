import { Injectable } from '@angular/core';
import { Alert } from '@models/app/alert.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {

  constructor() {}

  public alert$: BehaviorSubject<Alert | null> = new BehaviorSubject<Alert | null>(null)
}
