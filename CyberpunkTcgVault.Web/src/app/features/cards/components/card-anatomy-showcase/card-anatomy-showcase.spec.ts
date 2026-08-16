import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAnatomyShowcase } from './card-anatomy-showcase';

describe('CardAnatomyShowcase', () => {
  let fixture: ComponentFixture<CardAnatomyShowcase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAnatomyShowcase],
    }).compileComponents();

    fixture = TestBed.createComponent(CardAnatomyShowcase);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('moves focus from Explain Card to Guided when Vault Lens opens', async () => {
    const explainButton = fixture.nativeElement.querySelector(
      '[aria-label="Explain this card"]',
    ) as HTMLButtonElement;

    explainButton.focus();
    explainButton.click();
    fixture.detectChanges();

    await new Promise((resolve) => setTimeout(resolve));

    const guidedButton = fixture.nativeElement.querySelector(
      '.card-anatomy-showcase__modes button',
    ) as HTMLButtonElement;

    expect(document.activeElement).toBe(guidedButton);
  });

  it('keeps an accessible name on the open Vault Lens experience', async () => {
    fixture.componentInstance.openCardAnatomy();
    fixture.detectChanges();

    await new Promise((resolve) => setTimeout(resolve));

    const section = fixture.nativeElement.querySelector('.card-anatomy-showcase') as HTMLElement;

    const labelledBy = section.getAttribute('aria-labelledby');

    const label = labelledBy
      ? (fixture.nativeElement.querySelector(`#${labelledBy}`) as HTMLElement | null)
      : null;

    expect(labelledBy).toBe('card-anatomy-accessible-title');
    expect(label).not.toBeNull();
    expect(label?.textContent?.trim()).toBe('Vault Lens Card Anatomy');
  });

  it('restores focus to Explain Card when Vault Lens closes', async () => {
    fixture.componentInstance.openCardAnatomy();
    fixture.detectChanges();

    await new Promise((resolve) => setTimeout(resolve));

    fixture.componentInstance.closeCardAnatomy();
    fixture.detectChanges();

    await new Promise((resolve) => setTimeout(resolve));

    const explainButton = fixture.nativeElement.querySelector(
      '[aria-label="Explain this card"]',
    ) as HTMLButtonElement;

    expect(document.activeElement).toBe(explainButton);
  });

  it('uses the Vesper Ryne Crimson Echo prototype study card and preserves all 11 anatomy fields', () => {
    const image = fixture.nativeElement.querySelector(
      '.card-anatomy-showcase__card img',
    ) as HTMLImageElement;

    const studyIdentity = fixture.nativeElement.querySelector(
      '.card-anatomy-showcase__card-label strong',
    ) as HTMLElement;

    expect(image.getAttribute('src')).toBe('images/showcase/vesper-ryne-crimson-echo.webp');

    expect(image.getAttribute('alt')).toBe(
      'Vesper Ryne Crimson Echo Choom Vault prototype study card',
    );

    expect(studyIdentity.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'VESPER RYNE // CRIMSON ECHO',
    );

    expect(fixture.componentInstance.anatomyFields.map((field) => field.id)).toEqual([
      'cost',
      'sellTag',
      'type',
      'ram',
      'tags',
      'power',
      'rulesText',
      'setCode',
      'cardNumber',
      'rarity',
      'artistCredit',
    ]);
  });

  it('uses the Vesper Ryne-specific lower-card alignment without changing the anatomy order', () => {
    const fields = Object.fromEntries(
      fixture.componentInstance.anatomyFields.map((field) => [field.id, field]),
    );

    const setCode = fields['setCode'];
    const cardNumber = fields['cardNumber'];
    const rulesText = fields['rulesText'];

    expect(setCode.region.left).toBeGreaterThan(cardNumber.region.left);

    expect(setCode.region.top).toBeGreaterThan(cardNumber.region.top);

    expect(setCode.marker.left).toBeGreaterThan(0);

    expect(cardNumber.marker.left).toBeLessThan(0);

    expect(rulesText.region.width).toBe(82.5);

    expect(rulesText.region.height).toBe(21.2);
  });

  it('keeps all 11 Show All markers available for the Vesper Ryne study card', async () => {
    const explainButton = fixture.nativeElement.querySelector(
      '[aria-label="Explain this card"]',
    ) as HTMLButtonElement;

    explainButton.click();
    fixture.detectChanges();

    await new Promise((resolve) => setTimeout(resolve));

    const modeButtons = Array.from(
      fixture.nativeElement.querySelectorAll('.card-anatomy-showcase__modes button'),
    ) as HTMLButtonElement[];

    const showAllButton = modeButtons.find((button) => button.textContent?.trim() === 'Show All');

    expect(showAllButton).toBeTruthy();

    showAllButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const markers = fixture.nativeElement.querySelectorAll('.card-anatomy-showcase__all-marker');

    expect(fixture.componentInstance.mode).toBe('showAll');

    expect(markers.length).toBe(11);
  });
});
