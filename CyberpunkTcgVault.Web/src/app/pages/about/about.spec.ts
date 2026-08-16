import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { About } from './about';

describe('About', () => {
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('describes the current private collector workspace as existing functionality', () => {
    const text = fixture.nativeElement.textContent.replace(/\s+/g, ' ');

    expect(text).toContain(
      'Choom Vault connects the shared Vault Archive to a private collector workspace where signed-in collectors can manage exact card printings, wanted cards and sealed products.',
    );
    expect(text).not.toContain(
      'The wider product is being built toward personal collection management',
    );
  });

  it('keeps appreciation, independence and approved-data boundaries in one editorial chapter', () => {
    const root = fixture.nativeElement as HTMLElement;
    const chapter = root.querySelector('.about-trust');
    const text = chapter?.textContent?.replace(/\s+/g, ' ') ?? '';

    expect(text).toContain(
      'Choom Vault was built independently out of a genuine love for Cyberpunk, physical card collecting and the worlds that stay with you long after you leave them.',
    );
    expect(text).toContain(
      'The collectors, players, artists, designers, developers and fans around Cyberpunk are part of the reason this project exists at all.',
    );
    expect(text).toContain(
      'Choom Vault is an independent fan-made collector companion. It is not affiliated with, endorsed by or sponsored by those creators, companies or rights holders.',
    );
    expect(text).toContain('CURRENT DEMONSTRATION');
    expect(text).toContain('ORIGINAL MATERIAL. APPROVED ROUTES ONLY.');
    expect(text).toContain(
      'The current public demonstration uses Choom Vault prototype material created for this project.',
    );
    expect(text).toContain(
      'Any future connection to official Cyberpunk TCG catalogue data or artwork will only be pursued through an approved data or API route',
    );
    expect(text).toContain(
      'If Choom Vault remains a carefully made collector experience that people enjoy exploring, building it has already been worthwhile.',
    );
  });

  it('uses the approved Explore the Source copy and four verified official resource destinations', () => {
    const root = fixture.nativeElement as HTMLElement;
    const resources = root.querySelector('.about-resources');
    const links = Array.from(
      resources?.querySelectorAll<HTMLAnchorElement>('.about-resources__list a') ?? [],
    );
    const labels = links.map((link) =>
      link.querySelector('.about-resources__title')?.textContent?.trim(),
    );
    const domains = links.map((link) =>
      link.querySelector('.about-resources__domain')?.textContent?.trim(),
    );

    expect(resources?.textContent?.replace(/\s+/g, ' ')).toContain(
      'Choom Vault is an independent companion project. For official cards, news and the wider Cyberpunk world, go directly to the people and teams behind it.',
    );
    expect(labels).toEqual([
      'Official Cyberpunk TCG',
      'CD PROJEKT RED — Cyberpunk 2077',
      'R. Talsorian Games — Cyberpunk',
      'WeirdCo',
    ]);
    expect(domains).toEqual([
      'CYBERPUNKTCG.COM',
      'CYBERPUNK.NET',
      'RTALSORIANGAMES.COM',
      'WEIRDCO.NET',
    ]);
    expect(links.map((link) => link.href)).toEqual([
      'https://cyberpunktcg.com/',
      'https://www.cyberpunk.net/',
      'https://rtalsoriangames.com/cyberpunk/',
      'https://www.weirdco.net/',
    ]);

    for (const link of links) {
      expect(link.target).toBe('_blank');
      expect(link.rel).toContain('noopener');
      expect(link.rel).toContain('noreferrer');
    }

    expect(resources?.textContent).not.toContain('↗');
  });

  it('keeps the approved About hero source, licence and crop disclosure linked in the caption', () => {
    const root = fixture.nativeElement as HTMLElement;
    const caption = root.querySelector('.about-environment__caption') as HTMLElement;
    const links = Array.from(caption.querySelectorAll<HTMLAnchorElement>('a'));

    expect(links).toHaveLength(2);
    expect(links[0].href).toBe('https://www.flickr.com/photos/stefans02/52773351835/');
    expect(links[0].textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'Cyberpunk 2077 / View At The City — Stefans02',
    );
    expect(links[1].href).toBe('https://creativecommons.org/licenses/by/4.0/');
    expect(links[1].textContent?.trim()).toBe('CC BY 4.0');
    expect(caption.textContent?.replace(/\s+/g, ' ')).toContain('Cropped for layout');

    for (const link of links) {
      expect(link.target).toBe('_blank');
      expect(link.rel).toContain('noopener');
      expect(link.rel).toContain('noreferrer');
    }
  });

  it('does not expose the removed public roadmap-style future concepts', () => {
    const text = ((fixture.nativeElement as HTMLElement).textContent ?? '').toLowerCase();

    for (const phrase of [
      'own. trace. express.',
      'set completion',
      'physical collection verification',
      'safehouse experience',
      'deck tools',
      '/roadmap',
      '100-user',
    ]) {
      expect(text).not.toContain(phrase);
    }
  });

  it('uses a base-path-safe relative URL for the About environment image', () => {
    const image = fixture.nativeElement.querySelector(
      '.about-environment__media img',
    ) as HTMLImageElement;

    expect(image.getAttribute('src')).toBe('images/about/view-at-the-city.jpg');
  });
});
