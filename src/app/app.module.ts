import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { SpinnerInterceptor } from './core/interceptors/spinner/spinner.interceptor';
import { TokenInterceptor } from './core/interceptors/token/token.interceptor';
import { SpinnerService } from './core/services/spinner.service';

export function spinnerInterceptorFactory(spinnerService: SpinnerService) {
  return new SpinnerInterceptor(spinnerService);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: spinnerInterceptorFactory,
      multi: true,
      deps : [SpinnerService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    SpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
