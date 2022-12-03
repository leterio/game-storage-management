import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownFieldComponent } from './drop-down-field.component';

describe('DropDownFieldComponent', () => {
  let component: DropDownFieldComponent;
  let fixture: ComponentFixture<DropDownFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
