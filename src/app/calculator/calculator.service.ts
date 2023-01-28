import { Injectable } from '@angular/core';

import { Recipe } from '../domain/recipe';
import { Settings } from '../domain/settings';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private thickness = 0.5;
  private salinity = 0.075;
  private freshDryRatio = 3;

  constructor() { }

  getRecipe({ amount, shape, size, hydration, time }: Settings) {

    const surface = amount * size * size * (shape === 'circle' ? (Math.PI / 4) : 1)
    const dough = surface * this.thickness;
    const flour = dough / (1 + hydration / 100);
    const water = flour * hydration / 100;
    const salt = water * this.salinity;
    const freshYeast = 9 * Math.pow(flour / 500, 0.8) * Math.pow(12 / time, 1.2);
    const dryYeast = freshYeast / this.freshDryRatio;

    const recipe = <Recipe>{};
    recipe.flour = Math.round(flour);
    recipe.water = Math.round(water);
    recipe.salt = Math.round(salt);
    recipe.freshYeast = Math.round(freshYeast * 100) / 100;
    recipe.dryYeast = Math.round(dryYeast * 100) / 100;
    return recipe;

  }

}
