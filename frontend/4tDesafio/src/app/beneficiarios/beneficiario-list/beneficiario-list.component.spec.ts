import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiarioListComponent } from './beneficiario-list.component';

describe('BeneficiarioList', () => {
  let component: BeneficiarioListComponent;
  let fixture: ComponentFixture<BeneficiarioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeneficiarioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
