import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoListComponent } from './plano-list.component';

describe('PlanoList', () => {
  let component: PlanoListComponent;
  let fixture: ComponentFixture<PlanoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
