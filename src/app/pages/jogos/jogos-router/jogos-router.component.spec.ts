import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosRouterComponent } from './jogos-router.component';

describe('JogosRouterComponent', () => {
  let component: JogosRouterComponent;
  let fixture: ComponentFixture<JogosRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JogosRouterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JogosRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
