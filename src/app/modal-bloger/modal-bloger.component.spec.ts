import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBlogerComponent } from './modal-bloger.component';

describe('ModalBlogerComponent', () => {
  let component: ModalBlogerComponent;
  let fixture: ComponentFixture<ModalBlogerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalBlogerComponent]
    });
    fixture = TestBed.createComponent(ModalBlogerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
