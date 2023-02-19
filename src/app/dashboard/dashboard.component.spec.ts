import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { Settings } from '../core/settings';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {

  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;
  let component: DashboardComponent;
  let element: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        TranslocoTestingModule,
      ],
    }).compileComponents();
  }));

  describe('using default settings', () => {

    const defaultSettings: Settings = {
      amount: 4,
      shape: 'round',
      size: 28,
      hydration: 60,
      rise: 12,
    };

    beforeEach(waitForAsync(() => {
      localStorage.removeItem('settings');
      fixture = TestBed.createComponent(DashboardComponent);
      router = TestBed.inject(Router);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      fixture.detectChanges();
    }));

    it('should be created', waitForAsync(() => {
      expect(component).toBeDefined();
      expect(component.form.value).toEqual(defaultSettings);

      const amount = element.querySelectorAll('.field')[0];
      expect(amount.querySelector('label')!.textContent).toContain('amount');
      expect(amount.querySelector('input')!.value).toEqual('4');

      const shape = element.querySelectorAll('.field')[1];
      expect(shape.querySelector('label')!.textContent).toContain('shape');
      expect(shape.querySelectorAll('input')[0].checked).toBeTruthy();

      const size = element.querySelectorAll('.field')[2];
      expect(size.querySelector('label')!.textContent).toContain('size (cm)');
      expect(size.querySelector('input')!.value).toEqual('28');

      const hydration = element.querySelectorAll('.field')[3];
      expect(hydration.querySelector('label')!.textContent).toContain('hydration (%)');
      expect(hydration.querySelector('input')!.value).toEqual('60');

      const rise = element.querySelectorAll('.field')[4];
      expect(rise.querySelector('label')!.textContent).toContain('rise (h)');
      expect(rise.querySelector('input')!.value).toEqual('12');

      const button = element.querySelectorAll('.field')[5];
      expect(button.querySelector('button')!.textContent).toEqual('Impastami');
    }));

    it('should navigate to the viewer component', waitForAsync(() => {
      const navigate = spyOn(router, 'navigate');
      component.onSubmit();
      fixture.detectChanges();
      expect(navigate).toHaveBeenCalledWith([ 'viewer' ], { queryParams: defaultSettings });
    }));

  });

  describe('using custom settings', () => {

    const customSettings: Settings = {
      amount: 2,
      shape: 'square',
      size: 30,
      hydration: 80,
      rise: 24,
    };

    beforeEach(waitForAsync(() => {
      localStorage.setItem('settings', JSON.stringify(customSettings));
      fixture = TestBed.createComponent(DashboardComponent);
      router = TestBed.inject(Router);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      fixture.detectChanges();
    }));

    it('should be created', waitForAsync(() => {
      expect(component).toBeDefined();
      expect(component.form.value).toEqual(customSettings);

      const amount = element.querySelectorAll('.field')[0];
      expect(amount.querySelector('label')!.textContent).toContain('amount');
      expect(amount.querySelector('input')!.value).toEqual('2');

      const shape = element.querySelectorAll('.field')[1];
      expect(shape.querySelector('label')!.textContent).toContain('shape');
      expect(shape.querySelectorAll('input')[1].checked).toBeTruthy();

      const size = element.querySelectorAll('.field')[2];
      expect(size.querySelector('label')!.textContent).toContain('size (cm)');
      expect(size.querySelector('input')!.value).toEqual('30');

      const hydration = element.querySelectorAll('.field')[3];
      expect(hydration.querySelector('label')!.textContent).toContain('hydration (%)');
      expect(hydration.querySelector('input')!.value).toEqual('80');

      const rise = element.querySelectorAll('.field')[4];
      expect(rise.querySelector('label')!.textContent).toContain('rise (h)');
      expect(rise.querySelector('input')!.value).toEqual('24');

      const button = element.querySelectorAll('.field')[5];
      expect(button.querySelector('button')!.textContent).toEqual('Impastami');
    }));

    it('should navigate to the viewer component', waitForAsync(() => {
      const navigate = spyOn(router, 'navigate');
      component.onSubmit();
      fixture.detectChanges();
      expect(navigate).toHaveBeenCalledWith([ 'viewer' ], { queryParams: customSettings });
    }));

  });

});
