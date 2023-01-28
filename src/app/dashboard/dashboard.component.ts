import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
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
  }

  onSubmit(): void {
    this.form.disable();
    this.router.navigate([ 'viewer' ], { queryParams: this.form.value });
  }

}
