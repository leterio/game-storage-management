import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosFormComponent } from './jogos-form.component';

describe('JogosFormComponent', () => {
  let component: JogosFormComponent;
  let fixture: ComponentFixture<JogosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
