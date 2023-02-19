import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeIn } from '../app-animations';

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
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    this.form = this.formBuilder.group({
      amount: [ settings.amount || 4, [ Validators.required, Validators.min(1) ] ],
      shape: [ settings.shape || 'round', [ Validators.required ] ],
      size: [ settings.size || 28, [ Validators.required, Validators.min(8), Validators.max(35) ] ],
      hydration: [ settings.hydration || 60, [ Validators.required, Validators.min(50), Validators.max(100) ] ],
      rise: [ settings.rise || 12, [ Validators.required, Validators.min(1), Validators.max(48) ] ],
    });
  }

  onSubmit(): void {
    this.form.disable();
    const settings = this.form.value;
    localStorage.setItem('settings', JSON.stringify(settings));
    this.router.navigate([ 'viewer' ], { queryParams: settings });
  }

}
