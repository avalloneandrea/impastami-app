import { TestBed, waitForAsync } from '@angular/core/testing';
import { Settings } from '../core/settings';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {

  const roundSettings: Settings = {
    amount: 4,
    shape: 'round',
    size: 28,
    hydration: 60,
    rise: 12,
  };

  const squareSettings: Settings = {
    amount: 2,
    shape: 'square',
    size: 30,
    hydration: 80,
    rise: 24,
  };

  let service: CalculatorService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  }));

  it('should be created', waitForAsync(() => {
    expect(service).toBeTruthy();
  }));

  it('should return the recipe for round pizzas', waitForAsync(() => {
    const recipe = service.getRecipe(roundSettings);
    expect(recipe.flour).toEqual(770);
    expect(recipe.water).toEqual(462);
    expect(recipe.salt).toEqual(23);
    expect(recipe.yeast).toEqual(3.21);
  }));

  it('should return the recipe for square pizzas', waitForAsync(() => {
    const recipe = service.getRecipe(squareSettings);
    expect(recipe.flour).toEqual(500);
    expect(recipe.water).toEqual(400);
    expect(recipe.salt).toEqual(15);
    expect(recipe.yeast).toEqual(1.04);
  }));

});
