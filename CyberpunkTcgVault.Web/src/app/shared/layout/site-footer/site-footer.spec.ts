import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  let fixture: ComponentFixture<SiteFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteFooter],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SiteFooter);
    fixture.detectChanges();
  });

  it('uses the approved independent non-commercial fan-project disclaimer', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent?.replace(/\s+/g, ' ') ?? '';

    expect(text).toContain(
      'Choom Vault is an independent, non-commercial fan-made collector companion created as a personal project for Cyberpunk TCG collectors.'
    );
    expect(text).toContain(
      'It is not affiliated with, endorsed by, or sponsored by WeirdCo or CD PROJEKT RED.'
    );
    expect(text).toContain('No ownership of third-party intellectual property is claimed.');
  });

  it('keeps Terms in the supporting trust navigation between Privacy and Contact', () => {
    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('.footer-navigation a')
    );

    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'Catalogue',
      'About',
      'Privacy',
      'Terms',
      'Contact'
    ]);
    expect(links[3].getAttribute('href')).toBe('/terms');
  });
});
