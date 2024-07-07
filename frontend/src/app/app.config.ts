import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthGuard } from './guards/auth-guard.guard';
import { JwtHelperService, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuthInterceptor } from './services/auth-interceptor';

const JWT_Module_Options: JwtModuleOptions = {
  config: {
      tokenGetter: tokenGetter,
      allowedDomains: ['https://localhost:7032']
  }
};

export function tokenGetter() {
  return localStorage.getItem("jwt");
}


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ,importProvidersFrom(
    JwtModule.forRoot({
        config: {
            tokenGetter: tokenGetter,
            allowedDomains: ["https://localhost:7032"],
        },
    }),
),
provideHttpClient(
    withInterceptorsFromDi()
),AuthGuard,provideAnimations(),provideToastr()]
};


