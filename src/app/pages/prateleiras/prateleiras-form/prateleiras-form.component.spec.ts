import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrateleirasFormComponent } from './prateleiras-form.component';

describe('PrateleirasFormComponent', () => {
  let component: PrateleirasFormComponent;
  let fixture: ComponentFixture<PrateleirasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrateleirasFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrateleirasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
