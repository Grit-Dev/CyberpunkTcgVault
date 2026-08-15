import { HttpErrorResponse } from '@angular/common/http';
import { signal } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  of,
  throwError
} from 'rxjs';

import { FeedbackService } from '../../../../core/feedback/feedback.service';
import { CardsService } from '../../../cards/services/cards.service';
import {
  OwnedCard,
  UpdateOwnedCardRequest
} from '../../models/owned-card';
import { OwnedCardsService } from '../../services/owned-cards.service';
import { Collection } from './collection';

const ownedCard: OwnedCard = {
  id: 8,
  cardPrintingId: 101,
  cardId: 17,
  cardName: 'V // StreetKid',
  setName: 'Welcome to Night City',
  cardNumber: '005a',
  rarity: 'Rare',
  colour: 'Red',
  imageUrl: '/cards/v.webp',
  quantityOwned: 2,
  condition: 'Near Mint',
  isInMasterCollection: true,
  isDuplicate: false,
  isGradingCandidate: false,
  isOpenForTrade: false,
  isOpenToMessages: true,
  maySellLater: false,
  notes: null
};

describe('Collection', () => {
  let fixture: ComponentFixture<Collection>;
  const items = signal<OwnedCard[]>([ownedCard]);
  let updateRecordCalls = 0;
  let lastUpdateRequest: UpdateOwnedCardRequest | null = null;
  let updateRecordFailure: HttpErrorResponse | null = null;

  const ownedCardsServiceStub = {
    items,
    load: () => of(items()),
    updateQuantity: (item: OwnedCard, quantityOwned: number) => {
      const updated = { ...item, quantityOwned };
      items.set([
        ...items().filter(existing => existing.id !== item.id),
        updated
      ]);
      return of(updated);
    },
    updateRecord: (item: OwnedCard, changes: UpdateOwnedCardRequest) => {
      updateRecordCalls += 1;
      lastUpdateRequest = changes;

      if (updateRecordFailure) {
        return throwError(() => updateRecordFailure);
      }

      const updated = { ...item, ...changes };
      items.set([
        ...items().filter(existing => existing.id !== item.id),
        updated
      ]);
      return of(updated);
    },
    remove: (item: OwnedCard) => {
      items.set(items().filter(existing => existing.id !== item.id));
      return of(undefined);
    }
  };

  beforeEach(async () => {
    items.set([ownedCard]);
    updateRecordCalls = 0;
    lastUpdateRequest = null;
    updateRecordFailure = null;

    await TestBed.configureTestingModule({
      imports: [Collection],
      providers: [
        provideRouter([]),
        {
          provide: OwnedCardsService,
          useValue: ownedCardsServiceStub
        },
        {
          provide: CardsService,
          useValue: {
            getImageUrl: (path: string | null) => path ?? '/placeholder.png'
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Collection);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('renders one working-archive record for an owned printing', () => {
    const heading = fixture.nativeElement.querySelector(
      '.collection-record__name'
    ) as HTMLElement;

    expect(heading.textContent?.trim()).toBe('V // StreetKid');
    expect(fixture.nativeElement.textContent).toContain('005a');
    expect(fixture.nativeElement.textContent).toContain('Welcome to Night City');
    expect(fixture.nativeElement.textContent).not.toContain('Near Mint');
  });

  it('filters the private collection without changing the owned-card source state', () => {
    const input = fixture.nativeElement.querySelector(
      '#collection-search'
    ) as HTMLInputElement;

    input.value = 'not here';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.filteredItems()).toEqual([]);
    expect(items()).toEqual([ownedCard]);
    expect(fixture.nativeElement.textContent).toContain(
      'No cards in your collection match these filters.'
    );
  });

  it('updates quantity on the existing exact-printing record', () => {
    fixture.componentInstance.increaseQuantity(ownedCard);
    fixture.detectChanges();

    expect(items()[0].id).toBe(ownedCard.id);
    expect(items()[0].cardPrintingId).toBe(ownedCard.cardPrintingId);
    expect(items()[0].quantityOwned).toBe(3);
  });

  it('renders the printing count as result metadata below the filters', () => {
    items.set(
      Array.from({ length: 11 }, (_, index) => ({
        ...ownedCard,
        id: index + 1,
        cardPrintingId: 1000 + index,
        cardId: 2000 + index,
        cardName: `Card ${index + 1}`,
        cardNumber: `${index + 1}`
      }))
    );
    fixture.detectChanges();

    const tools = fixture.nativeElement.querySelector('.collection-tools') as HTMLElement;
    const resultsRail = fixture.nativeElement.querySelector(
      '.collection-results-rail'
    ) as HTMLElement;

    expect(tools.textContent).not.toContain('11 printings');
    expect(resultsRail.textContent).toContain('11 printings');
    expect(resultsRail.textContent).toContain('Page 1 of 2');
    expect(resultsRail.textContent).toContain('·');
    expect(tools.nextElementSibling).toBe(resultsRail);
  });

  it('keeps Clear filters in the results rail only when Collection filtering is active', () => {
    fixture.componentInstance.searchQuery.set('Echo');
    fixture.detectChanges();

    const tools = fixture.nativeElement.querySelector('.collection-tools') as HTMLElement;
    const rail = fixture.nativeElement.querySelector('.collection-results-rail') as HTMLElement;
    const clear = rail.querySelector('.collection-results-rail__clear') as HTMLButtonElement;

    expect(tools.textContent).not.toContain('Clear filters');
    expect(clear.textContent).toContain('Clear filters');
  });

  it('paginates Collection records in groups of 10', () => {
    items.set(
      Array.from({ length: 11 }, (_, index) => ({
        ...ownedCard,
        id: index + 1,
        cardPrintingId: 1000 + index,
        cardId: 2000 + index,
        cardName: `Card ${index + 1}`,
        cardNumber: `${index + 1}`
      }))
    );
    fixture.detectChanges();

    expect(fixture.componentInstance.totalPages()).toBe(2);
    expect(fixture.componentInstance.pagedItems().length).toBe(10);

    fixture.componentInstance.goToPage(2);
    fixture.detectChanges();

    expect(fixture.componentInstance.activePage()).toBe(2);
    expect(fixture.componentInstance.pagedItems()).toHaveLength(1);
  });

  it('resets pagination to page 1 when Collection search changes', () => {
    items.set(
      Array.from({ length: 11 }, (_, index) => ({
        ...ownedCard,
        id: index + 1,
        cardPrintingId: 1000 + index,
        cardId: 2000 + index,
        cardName: `Card ${index + 1}`,
        cardNumber: `${index + 1}`
      }))
    );
    fixture.detectChanges();
    fixture.componentInstance.goToPage(2);

    const input = fixture.nativeElement.querySelector(
      '#collection-search'
    ) as HTMLInputElement;
    input.value = 'Card 1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.activePage()).toBe(1);
  });

  it('moves to the previous valid page when the final record on a page is removed', () => {
    const pageItems = Array.from({ length: 11 }, (_, index) => ({
      ...ownedCard,
      id: index + 1,
      cardPrintingId: 1000 + index,
      cardId: 2000 + index,
      cardName: `Card ${index + 1}`,
      cardNumber: `${index + 1}`
    }));
    items.set(pageItems);
    fixture.detectChanges();
    fixture.componentInstance.goToPage(2);

    fixture.componentInstance.removeFromCollection(pageItems[10]);
    fixture.detectChanges();

    expect(fixture.componentInstance.totalPages()).toBe(1);
    expect(fixture.componentInstance.activePage()).toBe(1);
  });

  it('sends the backend update contract once and preserves quantity when saving metadata', () => {
    fixture.componentInstance.beginEdit(ownedCard);
    fixture.componentInstance.recordForm.patchValue({
      condition: 'Excellent',
      notes: 'Binder copy.'
    });

    fixture.componentInstance.saveEdit(ownedCard);

    expect(updateRecordCalls).toBe(1);
    expect(lastUpdateRequest).toEqual({
      quantityOwned: 2,
      condition: 'Excellent',
      isInMasterCollection: true,
      isDuplicate: false,
      isGradingCandidate: false,
      isOpenForTrade: false,
      isOpenToMessages: true,
      maySellLater: false,
      notes: 'Binder copy.'
    });
    expect(items()[0].quantityOwned).toBe(2);
  });

  it('closes Edit Record only after a successful save', () => {
    fixture.componentInstance.beginEdit(ownedCard);
    fixture.componentInstance.recordForm.patchValue({
      condition: 'Excellent'
    });

    fixture.componentInstance.saveEdit(ownedCard);

    expect(fixture.componentInstance.editingRecordId()).toBeNull();
    expect(items()[0].condition).toBe('Excellent');
  });

  it('shows a restrained Details added state only when optional record details exist', () => {
    fixture.detectChanges();

    const detailsState = fixture.nativeElement.querySelector(
      '.collection-record__details-state'
    ) as HTMLElement;

    expect(fixture.nativeElement.textContent).toContain('Details added');
    expect(detailsState.tagName).toBe('SPAN');
    expect(detailsState.hasAttribute('tabindex')).toBe(false);
    expect(detailsState.closest('a, button')).toBeNull();
    expect(detailsState.getAttribute('role')).toBeNull();

    items.set([{
      ...ownedCard,
      condition: null,
      notes: null,
      isInMasterCollection: false,
      isDuplicate: false,
      isGradingCandidate: false,
      isOpenForTrade: false,
      isOpenToMessages: false,
      maySellLater: false
    }]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('Details added');
  });

  it('uses Close edit while the collector record editor is open', () => {
    fixture.componentInstance.beginEdit(ownedCard);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Close edit');
    expect(fixture.nativeElement.textContent).not.toContain('Close record');
  });

  it('shows RECORD SAVED feedback after a successful metadata save', () => {
    const feedback = TestBed.inject(FeedbackService);
    fixture.componentInstance.beginEdit(ownedCard);
    fixture.componentInstance.recordForm.patchValue({
      condition: 'Excellent'
    });

    fixture.componentInstance.saveEdit(ownedCard);

    expect(feedback.message()?.text).toBe('RECORD SAVED');
  });

  it('keeps Edit Record open and preserves values when the API returns 400', () => {
    updateRecordFailure = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request',
      error: {
        title: 'One or more validation errors occurred.',
        errors: {
          Condition: ['The field Condition must be a string with a maximum length of 50.']
        }
      }
    });

    fixture.componentInstance.beginEdit(ownedCard);
    fixture.componentInstance.recordForm.patchValue({
      condition: 'Collector entered value'
    });

    fixture.componentInstance.saveEdit(ownedCard);
    fixture.detectChanges();

    expect(updateRecordCalls).toBe(1);
    expect(fixture.componentInstance.editingRecordId()).toBe(ownedCard.id);
    expect(fixture.componentInstance.recordForm.controls.condition.value)
      .toBe('Collector entered value');
    expect(fixture.nativeElement.textContent).toContain(
      'Condition must be 50 characters or fewer.'
    );
    expect(fixture.nativeElement.textContent).toContain(
      "We couldn't save this record. Check the details and try again."
    );
    expect(items()).toEqual([ownedCard]);
  });
});
