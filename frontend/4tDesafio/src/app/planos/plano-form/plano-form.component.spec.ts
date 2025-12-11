import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoFormComponent } from './plano-form.component';

describe('PlanoForm', () => {
  let component: PlanoFormComponent;
  let fixture: ComponentFixture<PlanoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
