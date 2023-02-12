import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeIn } from '../app-animations';
import { CalculatorService } from '../calculator/calculator.service';
import { Recipe } from '../core/recipe';
import { Settings } from '../core/settings';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: [ './viewer.component.scss' ],
  animations: [
    trigger('animate', [
      transition(':enter',
        query('.tile',
          useAnimation(fadeIn))) ]),
  ],
})
export class ViewerComponent implements OnInit {

  settings: Settings;
  recipe: Recipe;

  constructor(private route: ActivatedRoute, private calculator: CalculatorService, private router: Router) {}

  ngOnInit(): void {
    this.settings = this.route.snapshot.queryParams as Settings;
    this.recipe = this.calculator.getRecipe(this.settings);
  }

  onBack(): void {
    this.router.navigate([ 'dashboard' ]);
  }

}
