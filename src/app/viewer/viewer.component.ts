import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import localForage from 'localforage';
import { map, take } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { fadeIn } from '../app-animations';
import { CalculatorService } from '../calculator/calculator.service';
import { Recipe } from '../core/recipe';
import { Settings } from '../core/settings';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: [ './viewer.component.scss' ],
  animations: [ trigger('animate', [
    transition(':enter',
      query('.tile',
        useAnimation(fadeIn))),
  ]) ],
})
export class ViewerComponent {

  settings?: Settings;
  recipe?: Recipe;
  yeast?: 'fresh' | 'dry';

  constructor(private route: ActivatedRoute, private calculator: CalculatorService, private router: Router) {
    this.settings = route.snapshot.queryParams as Settings;
    this.recipe = calculator.getRecipe(this.settings);
    this.yeast = 'fresh';
    fromPromise(localForage.getItem('yeast')).pipe(
      map(yeast => yeast as 'fresh' | 'dry'),
      take(1),
    ).subscribe(yeast => {
      this.yeast = yeast || 'fresh';
    });
  }

  onSwitch(): void {
    this.yeast = this.yeast == 'fresh' ? 'dry' : 'fresh';
    localForage.setItem('yeast', this.yeast);
  }

  onBack(): void {
    this.router.navigate([ 'dashboard' ]);
  }

}
