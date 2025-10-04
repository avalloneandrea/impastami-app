import { Injectable } from '@angular/core';
import { Recipe } from '../core/recipe';
import { Settings } from '../core/settings';

@Injectable({ providedIn: 'root' })
export class CalculatorService {

  private thickness = 0.5;
  private salinity = 0.03;
  private magic = 0.05

  constructor() {}

  getRecipe({ amount, shape, size, hydration, rise }: Settings) {

    const surface = amount * size * size * (shape === 'round' ? (Math.PI / 4) : 1);
    const dough = surface * this.thickness;
    const flour = dough / (1 + hydration / 100);
    const water = flour * hydration / 100;
    const salt = flour * this.salinity;
    const yeast = flour / rise * this.magic;

    const recipe = <Recipe>{};
    recipe.flour = Math.round(flour);
    recipe.water = Math.round(water);
    recipe.salt = Math.round(salt);
    recipe.yeast = Math.round(yeast * 100) / 100;
    return recipe;

  }

}
