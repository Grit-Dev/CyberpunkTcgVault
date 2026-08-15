import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { CardAnatomyShowcase } from './card-anatomy-showcase';

describe('CardAnatomyShowcase', () => {
  let fixture: ComponentFixture<CardAnatomyShowcase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAnatomyShowcase]
    }).compileComponents();

    fixture = TestBed.createComponent(CardAnatomyShowcase);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('moves focus from Explain Card to Guided when Vault Lens opens', async () => {
    const explainButton = fixture.nativeElement.querySelector(
      '[aria-label="Explain this card"]'
    ) as HTMLButtonElement;

    explainButton.focus();
    explainButton.click();
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve));

    const guidedButton = fixture.nativeElement.querySelector(
      '.card-anatomy-showcase__modes button'
    ) as HTMLButtonElement;

    expect(document.activeElement).toBe(guidedButton);
  });

  it('keeps an accessible name on the open Vault Lens experience', async () => {
    fixture.componentInstance.openCardAnatomy();
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve));

    const section = fixture.nativeElement.querySelector(
      '.card-anatomy-showcase'
    ) as HTMLElement;
    const labelledBy = section.getAttribute('aria-labelledby');
    const label = labelledBy
      ? fixture.nativeElement.querySelector(`#${labelledBy}`) as HTMLElement | null
      : null;

    expect(labelledBy).toBe('card-anatomy-accessible-title');
    expect(label).not.toBeNull();
    expect(label?.textContent?.trim()).toBe('Vault Lens Card Anatomy');
  });

  it('restores focus to Explain Card when Vault Lens closes', async () => {
    fixture.componentInstance.openCardAnatomy();
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve));

    fixture.componentInstance.closeCardAnatomy();
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve));

    const explainButton = fixture.nativeElement.querySelector(
      '[aria-label="Explain this card"]'
    ) as HTMLButtonElement;

    expect(document.activeElement).toBe(explainButton);
  });
});
