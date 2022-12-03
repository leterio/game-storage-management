import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrateleirasHomeComponent } from './prateleiras-home.component';

describe('PrateleirasHomeComponent', () => {
  let component: PrateleirasHomeComponent;
  let fixture: ComponentFixture<PrateleirasHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrateleirasHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrateleirasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
