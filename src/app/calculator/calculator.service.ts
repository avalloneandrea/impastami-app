import { Injectable } from '@angular/core';
import { Recipe } from '../core/recipe';
import { Settings } from '../core/settings';

@Injectable({ providedIn: 'root' })
export class CalculatorService {

  private thickness = 0.5;
  private salinity = 0.03;

  constructor() {}

  getRecipe({ amount, shape, size, hydration, rise }: Settings) {

    const surface = amount * size * size * (shape === 'round' ? (Math.PI / 4) : 1);
    const dough = surface * this.thickness;
    const flour = dough / (1 + hydration / 100);
    const water = flour * hydration / 100;
    const salt = flour * this.salinity;
    const yeast = 3 * Math.pow(flour / 500, 0.8) * Math.pow(12 / rise, 1.2);

    const recipe = <Recipe>{};
    recipe.flour = Math.round(flour);
    recipe.water = Math.round(water);
    recipe.salt = Math.round(salt);
    recipe.yeast = Math.round(yeast * 100) / 100;
    return recipe;

  }

}
