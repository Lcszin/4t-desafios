import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiarioFormComponent } from './beneficiario-form.component';

describe('BeneficiarioForm', () => {
  let component: BeneficiarioFormComponent;
  let fixture: ComponentFixture<BeneficiarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeneficiarioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
