import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { About } from './about';

describe('About', () => {
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('describes the current private collector workspace as existing functionality', () => {
    const text = fixture.nativeElement.textContent.replace(/\s+/g, ' ');

    expect(text).toContain(
      'Choom Vault connects the shared Vault Archive to a private collector workspace where signed-in collectors can manage exact card printings, wanted cards and sealed products.'
    );
    expect(text).not.toContain(
      'The wider product is being built toward personal collection management'
    );
  });

  it('uses a base-path-safe relative URL for the About environment image', () => {
    const image = fixture.nativeElement.querySelector(
      '.about-environment__media img'
    ) as HTMLImageElement;

    expect(image.getAttribute('src')).toBe('images/about/view-at-the-city.jpg');
  });
});
