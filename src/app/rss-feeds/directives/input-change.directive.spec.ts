import { Component, DebugElement, Directive } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { MockStoreModule } from 'src/app/test/mock/mock-store/mock-store.module';
import { InputChangeDirective } from './input-change.directive';

@Component({
  selector: 'app-test-component',
  template: `<input appInputChange />`,
  styleUrls: [],
})
class TestComponent {}

describe('InputChangeDirective', () => {
  let store: MockStore;
  let directive: InputChangeDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [MockStoreModule],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });
  it('call keyup event change method', () => {
    directive = new InputChangeDirective(store);
    directive._handleValueChange({
      which: 13,
      target: { value: 'some value' },
    });
    expect(directive).toBeTruthy();
  });
});
