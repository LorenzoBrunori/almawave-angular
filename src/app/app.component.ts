import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from './core/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit{
  public showHeader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public showSpinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public spinnerService : SpinnerService
  ) {
  }

  ngOnInit(): void {
    this.loadRoute();
  }

  ngAfterViewInit(): void {
    this.showSpinner$ = this.spinnerService.isLoading$;
    
  }

  private loadRoute(): void {
    this.activatedRoute.url.subscribe((url) => {
      this.showHeader$.next(
        this.location.path().includes('login') ||
          this.location.path().includes('register')
          ? false
          : true
      );
    });
  }
}
