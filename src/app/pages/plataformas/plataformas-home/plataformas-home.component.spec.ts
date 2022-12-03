import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosHomeComponent } from './jogos-home.component';

describe('JogosHomeComponent', () => {
  let component: JogosHomeComponent;
  let fixture: ComponentFixture<JogosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogosHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
