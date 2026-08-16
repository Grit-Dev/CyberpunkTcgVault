import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        /*
         * The App shell contains Angular Router functionality.
         * The isolated test environment therefore needs Router providers.
         */
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the shared site header', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('app-site-header');

    expect(header).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    const outlet = fixture.nativeElement.querySelector('router-outlet');

    expect(outlet).toBeTruthy();
  });

  it('should render the shared site footer', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    const footer = fixture.nativeElement.querySelector('app-site-footer');

    expect(footer).toBeTruthy();
  });
});
