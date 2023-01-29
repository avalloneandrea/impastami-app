import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import localForage from 'localforage';
import { map, take } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { fadeIn } from '../app-animations';
import { Settings } from '../domain/settings';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ],
  animations: [ trigger('animate', [
    transition(':enter',
      query('.field',
        useAnimation(fadeIn))),
  ]) ],
})
export class DashboardComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      amount: [ '', [ Validators.required, Validators.min(1) ] ],
      shape: [ '', [ Validators.required ] ],
      size: [ '', [ Validators.required, Validators.min(22), Validators.max(35) ] ],
      hydration: [ '', [ Validators.required, Validators.min(50), Validators.max(100) ] ],
      time: [ '', [ Validators.required, Validators.min(1), Validators.max(72) ] ],
    });
    fromPromise(localForage.getItem('settings')).pipe(
      map(settings => settings as Settings),
      take(1),
    ).subscribe(settings => {
      this.form.setValue(settings);
    });
  }

  onSubmit(): void {
    this.form.disable();
    const settings = this.form.value;
    localForage.setItem('settings', settings);
    this.router.navigate([ 'viewer' ], { queryParams: settings });
  }

}
