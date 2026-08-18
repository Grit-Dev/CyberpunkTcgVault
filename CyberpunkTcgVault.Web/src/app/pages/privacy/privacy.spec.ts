import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Privacy } from './privacy';

describe('Privacy', () => {
  let fixture: ComponentFixture<Privacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Privacy],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Privacy);
    fixture.detectChanges();
  });

  it('describes the current account, collector and deletion behaviour', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('username and email address');
    expect(text).toContain('exact card printing');
    expect(text).toContain('essential authentication and security cookies');
    expect(text).toContain('Demo accounts cannot use this deletion flow.');
    expect(text).toContain('active Choom Vault database');
  });

  it('uses finished public-facing notice and hosting copy', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain(
      'This notice explains how Choom Vault handles account information, private collector records and the services used to operate the application.',
    );
    expect(text).toContain(
      'Public registration is currently disabled. Demo Vault access is provided as a restricted evaluation environment',
    );
    expect(text).toContain(
      'Information about the services used by the live deployment will be kept current in this notice.',
    );
  });

  it('provides the ICO complaint route without changing the contact path', () => {
    const root = fixture.nativeElement as HTMLElement;
    const icoLink = Array.from(root.querySelectorAll('a')).find(
      (link) => link.textContent?.trim() === 'Make a complaint to the ICO',
    );
    const emailLink = root.querySelector('a[href="mailto:privacy@choomvault.com"]');

    expect(icoLink).toBeTruthy();
    expect(icoLink?.getAttribute('href')).toBe('https://ico.org.uk/make-a-complaint/');
    expect(emailLink).toBeTruthy();
  });

  it('contains the eight approved privacy sections in order', () => {
    const sections = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.privacy-section'),
    ).map((section) => section.id);

    expect(sections).toEqual([
      'account-access',
      'collector-information',
      'authentication-storage',
      'visibility',
      'external-services',
      'account-controls',
      'retention-rights',
      'privacy-contact',
    ]);
  });

  it('does not expose stale privacy or internal release language', () => {
    const text = ((fixture.nativeElement as HTMLElement).textContent ?? '').toLowerCase();

    const disallowedPhrases = [
      'self-service account deletion flow is not yet live',
      'jwt',
      'completely secure',
      'encrypted everywhere',
      'zero third parties',
      'partner',
      'mvp',
      'release',
      'legal verification',
      'todo',
      'coming soon',
      'configuration incomplete',
      'deployment pending',
      'development',
      'prototype',
      'release gate',
      'legal review pending',
      'blocker',
      'azure configuration pending',
      'production cutover',
      'technical director',
      'lawful basis',
    ];

    for (const phrase of disallowedPhrases) {
      expect(text).not.toContain(phrase);
    }
  });
});
