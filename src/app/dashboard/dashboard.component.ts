import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import localForage from 'localforage';
import { map, take } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { fadeIn } from '../app-animations';
import { Settings } from '../core/settings';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ],
  animations: [
    trigger('animate', [
      transition(':enter',
        query('.field',
          useAnimation(fadeIn))) ]),
  ],
})
export class DashboardComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount: [ 4, [ Validators.required, Validators.min(1) ] ],
      shape: [ 'round', [ Validators.required ] ],
      size: [ 28, [ Validators.required, Validators.min(8), Validators.max(35) ] ],
      hydration: [ 60, [ Validators.required, Validators.min(50), Validators.max(100) ] ],
      rise: [ 12, [ Validators.required, Validators.min(1), Validators.max(48) ] ],
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
