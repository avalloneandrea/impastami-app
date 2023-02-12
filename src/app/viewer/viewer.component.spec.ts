import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CalculatorService } from '../calculator/calculator.service';
import { Recipe } from '../core/recipe';
import { Settings } from '../core/settings';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { ViewerComponent } from './viewer.component';

describe('ViewerComponent', () => {

  const settings: Settings = {
    amount: 4,
    shape: 'round',
    size: 28,
    hydration: 60,
    rise: 12,
  };

  const recipe: Recipe = {
    flour: 770,
    water: 462,
    salt: 35,
    yeast: 4.24,
  };

  const route = { snapshot: { queryParams: settings } };
  const calculator = jasmine.createSpyObj('CalculatorService', [ 'getRecipe' ]);

  let fixture: ComponentFixture<ViewerComponent>;
  let component: ViewerComponent;
  let element: HTMLElement;
  let router: Router;

  beforeEach(waitForAsync(() => {
    calculator.getRecipe.and.returnValue(recipe);
    TestBed.configureTestingModule({
      declarations: [ ViewerComponent ],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent } ]),
        TranslocoTestingModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: route },
        { provide: CalculatorService, useValue: calculator },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ViewerComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  }));

  it('should create the component', () => {
    expect(component).toBeDefined();
    expect(component.settings).toEqual(settings);
    expect(component.recipe).toEqual(recipe);

    const toHave = element.querySelectorAll('.tile.is-child')[0];
    expect(toHave.textContent).toContain('toHave');

    const amount = element.querySelectorAll('.tile.is-child')[1];
    expect(amount.querySelector('.heading')!.textContent).toContain('amount');
    expect(amount.querySelector('.title')!.textContent).toEqual(settings.amount + '');

    const size = element.querySelectorAll('.tile.is-child')[2];
    expect(size.querySelector('.heading')!.textContent).toContain('size (cm)');
    expect(size.querySelector('.title')!.textContent).toEqual(settings.size + '');

    const hydration = element.querySelectorAll('.tile.is-child')[3];
    expect(hydration.querySelector('.heading')!.textContent).toContain('hydration (%)');
    expect(hydration.querySelector('.title')!.textContent).toEqual(settings.hydration + '');

    const rise = element.querySelectorAll('.tile.is-child')[4];
    expect(rise.querySelector('.heading')!.textContent).toContain('rise (h)');
    expect(rise.querySelector('.title')!.textContent).toEqual(settings.rise + '');

    const youNeed = element.querySelectorAll('.tile.is-child')[5];
    expect(youNeed.textContent).toContain('youNeed');

    const flour = element.querySelectorAll('.tile.is-child')[6];
    expect(flour.querySelector('.heading')!.textContent).toContain('flour (g)');
    expect(flour.querySelector('.title')!.textContent).toEqual(recipe.flour + '');

    const water = element.querySelectorAll('.tile.is-child')[7];
    expect(water.querySelector('.heading')!.textContent).toContain('water (g)');
    expect(water.querySelector('.title')!.textContent).toEqual(recipe.water + '');

    const salt = element.querySelectorAll('.tile.is-child')[8];
    expect(salt.querySelector('.heading')!.textContent).toContain('salt (g)');
    expect(salt.querySelector('.title')!.textContent).toEqual(recipe.salt + '');

    const yeast = element.querySelectorAll('.tile.is-child')[9];
    expect(yeast.querySelector('.heading')!.textContent).toContain('yeast (g)');
    expect(yeast.querySelector('.title')!.textContent).toEqual(recipe.yeast + '');

    const button = element.querySelectorAll('.tile.is-child')[10];
    expect(button.querySelector('button')!.textContent).toContain('back');
  });

  it('should navigate to the dashboard component', async () => {
    await component.onBack();
    expect(router.url).toContain('/dashboard');
  });

});
