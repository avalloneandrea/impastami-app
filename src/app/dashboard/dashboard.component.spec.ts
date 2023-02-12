import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import localForage from 'localforage';
import { firstValueFrom, of } from 'rxjs';
import { ViewerComponent } from '../viewer/viewer.component';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {

  const roundSettings = {
    amount: 4,
    shape: 'round',
    size: 28,
    hydration: 60,
    rise: 12,
  };

  const squareSettings = {
    amount: 2,
    shape: 'square',
    size: 30,
    hydration: 80,
    rise: 24,
  };

  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let element: HTMLElement;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'viewer', component: ViewerComponent } ]),
        TranslocoTestingModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  }));

  it('should create the component with default settings', () => {
    expect(component).toBeDefined();
    expect(component.form.value).toEqual(roundSettings);

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
  });

  it('should create the component with custom settings', async () => {
    spyOn(localForage, 'getItem').and.returnValue(firstValueFrom(of(squareSettings)));
    await component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeDefined();
    expect(component.form.value).toEqual(squareSettings);

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
  });

  it('should navigate to the viewer component', async () => {
    await component.onSubmit();
    expect(component.form.disabled).toBeTruthy();
    const settings = await localForage.getItem('settings');
    expect(settings).toEqual(roundSettings);
    expect(router.url).toContain('/viewer');
    expect(router.url).toContain(`amount=${roundSettings.amount}`);
    expect(router.url).toContain(`shape=${roundSettings.shape}`);
    expect(router.url).toContain(`size=${roundSettings.size}`);
    expect(router.url).toContain(`hydration=${roundSettings.hydration}`);
    expect(router.url).toContain(`rise=${roundSettings.rise}`);
  });

});
