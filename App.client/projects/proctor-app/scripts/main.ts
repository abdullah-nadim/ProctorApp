import { Component, ElementRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ApplicationConfiguration } from '@scripts/application-configuration';
import { SETTINGS } from '@scripts/settings';

@Component({
  selector: '[main-application]',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`
})
class MainApplication {
  constructor(private elementRef: ElementRef) {
    let settings = JSON.parse(this.elementRef.nativeElement.getAttribute('settings'));
    SETTINGS.API_BASE_URL = settings.APP_BASE_URL;
  }
}

bootstrapApplication(MainApplication, ApplicationConfiguration)
  .catch((err) => console.error(err));
