import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public showHeader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadRoute();
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
