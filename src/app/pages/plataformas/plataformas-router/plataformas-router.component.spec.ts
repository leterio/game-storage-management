import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlataformasRouterComponent } from './plataformas-router.component';

describe('PlataformasRouterComponent', () => {
  let component: PlataformasRouterComponent;
  let fixture: ComponentFixture<PlataformasRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlataformasRouterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlataformasRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
