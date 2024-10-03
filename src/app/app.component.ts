import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from './core/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SpinnerService],
})
export class AppComponent implements OnInit {
  public showHeader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private activatedRoute: ActivatedRoute,
    private router : Router,
    public spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.loadRoute();
  }

  private loadRoute(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader$.next(
          !(event.url === '/login' || event.url === '/register')
        );
      }
    });
  }
}
