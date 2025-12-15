import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PlanoListComponent } from './plano-list.component';
import { PlanoService } from '../../../services/plano.service';
import { Plano } from '../../../models/plano.model';
import Swal from 'sweetalert2';

describe('PlanoListComponent', () => {
  let component: PlanoListComponent;
  let fixture: ComponentFixture<PlanoListComponent>;
  let planoServiceSpy: jasmine.SpyObj<PlanoService>;

  const listaMock: Plano[] = [
    { id: 1, nome: 'Plano A', codigo_registro_ans: 'A1' },
    { id: 2, nome: 'Plano B', codigo_registro_ans: 'B2' }
  ];

  beforeEach(async () => {
    planoServiceSpy = jasmine.createSpyObj('PlanoService', ['getPlanos', 'deletePlano']);

    await TestBed.configureTestingModule({
      declarations: [PlanoListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: PlanoService, useValue: planoServiceSpy }
      ]
    }).compileComponents();
    
    planoServiceSpy.getPlanos.and.returnValue(of(listaMock));

    fixture = TestBed.createComponent(PlanoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar a lista de planos ao iniciar (ngOnInit)', () => {
    expect(planoServiceSpy.getPlanos).toHaveBeenCalled();
    expect(component.planos.length).toBe(2);
    expect(component.planos).toEqual(listaMock);
  });

  it('deve chamar deletePlano e atualizar a lista ao confirmar no SweetAlert', fakeAsync(() => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));
    planoServiceSpy.deletePlano.and.returnValue(of(void 0));
    
    component.deletarPlano(1);
    
    tick();

    expect(planoServiceSpy.deletePlano).toHaveBeenCalledWith(1);
    expect(component.planos.length).toBe(1);
    expect(component.planos[0].id).toBe(2);
  }));

  it('NÃO deve chamar deletePlano se cancelar no SweetAlert', fakeAsync(() => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: false } as any));

    component.deletarPlano(1);
    tick();

    expect(planoServiceSpy.deletePlano).not.toHaveBeenCalled();
    expect(component.planos.length).toBe(2);
  }));
});