import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Terms } from './terms';

describe('Terms', () => {
  let fixture: ComponentFixture<Terms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Terms],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Terms);
    fixture.detectChanges();
  });

  it('renders the approved Terms identity and update date', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelectorAll('h1')).toHaveLength(1);
    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Using Choom Vault.');
    expect(root.textContent).toContain('LAST UPDATED · 16 AUGUST 2026');
  });

  it('contains the nine Terms sections in order', () => {
    const sections = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.terms-section'),
    ).map((section) => section.id);

    expect(sections).toEqual([
      'current-status',
      'demo-vault',
      'acceptable-use',
      'information-you-provide',
      'intellectual-property',
      'external-resources',
      'service-availability',
      'terms-privacy',
      'terms-contact',
    ]);
  });

  it('uses a semantic acceptable-use list with the approved eight rules', () => {
    const list = (fixture.nativeElement as HTMLElement).querySelector('.terms-list');

    expect(list?.tagName).toBe('UL');
    expect(list?.querySelectorAll('li')).toHaveLength(8);
  });

  it('links to Privacy, Contact / Rights and the public contact email', () => {
    const root = fixture.nativeElement as HTMLElement;
    const hrefs = Array.from(root.querySelectorAll('a')).map((link) => link.getAttribute('href'));

    expect(hrefs).toContain('/privacy');
    expect(hrefs).toContain('/contact');
    expect(hrefs).toContain('mailto:hello.choomvault@outlook.com');
  });

  it('keeps Terms editorial links text-only without directional arrow glyphs', () => {
    const termsLinks = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.terms-link'),
    ) as HTMLElement[];

    expect(termsLinks.length).toBeGreaterThan(0);
    expect(termsLinks.every((link) => !link.textContent?.includes('→'))).toBe(true);
  });

  it('does not present the Terms as a click-wrap acceptance flow', () => {
    const text = ((fixture.nativeElement as HTMLElement).textContent ?? '').toLowerCase();

    expect(text).not.toContain('by using choom vault, you agree');
    expect(text).not.toContain('i agree to the terms');
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('input[type="checkbox"]'),
    ).toBeNull();
  });
});
