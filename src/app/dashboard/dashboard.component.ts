import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CalculatorService } from '../calculator/calculator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private calculator: CalculatorService) {
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
    console.log(this.form.value);
    console.log(this.calculator.getRecipe(this.form.value));
  }

}
