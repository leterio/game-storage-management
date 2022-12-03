import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrateleirasRouterComponent } from './prateleiras-router.component';

describe('PrateleirasRouterComponent', () => {
  let component: PrateleirasRouterComponent;
  let fixture: ComponentFixture<PrateleirasRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrateleirasRouterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrateleirasRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
