import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouteConfiguration } from '@scripts/route-configuraiton';
import { configureLogging, configureAuthentication } from '@scripts/httpclient-configuration';

export const ApplicationConfiguration: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(RouteConfiguration),
    provideHttpClient(withFetch(), withInterceptors([configureLogging, configureAuthentication])),
    provideAnimations(),
    provideAnimationsAsync()
  ]
};
