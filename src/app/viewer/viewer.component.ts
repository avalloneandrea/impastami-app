import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalculatorService } from '../calculator/calculator.service';
import { Recipe } from '../domain/recipe';
import { Settings } from '../domain/settings';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: [ './viewer.component.scss' ],
})
export class ViewerComponent {

  settings?: Settings;
  recipe?: Recipe;

  constructor(private route: ActivatedRoute, private calculator: CalculatorService, private router: Router) {
    this.settings = route.snapshot.queryParams as Settings;
    this.recipe = calculator.getRecipe(this.settings);
  }

  onBack(): void {
    this.router.navigate([ 'dashboard' ]);
  }

}
