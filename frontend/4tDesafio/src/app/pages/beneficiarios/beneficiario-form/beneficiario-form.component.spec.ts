import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BeneficiarioFormComponent } from './beneficiario-form.component';
import { BeneficiarioService } from '../../../services/beneficiario.service';
import { PlanoService } from '../../../services/plano.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficiario } from '../../../models/beneficiario.model';
import { Plano } from '../../../models/plano.model';
import Swal from 'sweetalert2';

describe('BeneficiarioFormComponent', () => {
  let component: BeneficiarioFormComponent;
  let fixture: ComponentFixture<BeneficiarioFormComponent>;
  let beneficiarioServiceSpy: jasmine.SpyObj<BeneficiarioService>;
  let planoServiceSpy: jasmine.SpyObj<PlanoService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: () => null
      }
    }
  };

  const listaPlanosMock: Plano[] = [
    { id: 1, nome: 'Plano A', codigo_registro_ans: 'A1' },
    { id: 2, nome: 'Plano B', codigo_registro_ans: 'B2' }
  ];

  beforeEach(async () => {
    beneficiarioServiceSpy = jasmine.createSpyObj('BeneficiarioService', ['createBeneficiario', 'updateBeneficiario', 'getBeneficiarioById']);
    planoServiceSpy = jasmine.createSpyObj('PlanoService', ['getPlanos']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [BeneficiarioFormComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: BeneficiarioService, useValue: beneficiarioServiceSpy },
        { provide: PlanoService, useValue: planoServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
    
    planoServiceSpy.getPlanos.and.returnValue(of(listaPlanosMock));

    fixture = TestBed.createComponent(BeneficiarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar createBeneficiario e navegar ao salvar novo registro', fakeAsync(() => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));
    beneficiarioServiceSpy.createBeneficiario.and.returnValue(of({} as Beneficiario));
    
    component.form.setValue({
      nome_completo: 'Novo User',
      cpf: '111',
      data_nascimento: '2000-01-01',
      status: 'ATIVO',
      plano_id: '2'
    });

    component.salvar();
    tick();
    
    expect(beneficiarioServiceSpy.createBeneficiario).toHaveBeenCalledWith(jasmine.objectContaining({
      nome_completo: 'Novo User',
      plano_id: 2
    }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/beneficiarios']);
  }));
  
  it('deve chamar updateBeneficiario e navegar ao salvar edição', fakeAsync(() => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));
    beneficiarioServiceSpy.updateBeneficiario.and.returnValue(of({} as Beneficiario));
    
    component.isEdicao = true;
    component.idBeneficiario = 5;
    
    component.form.setValue({
      nome_completo: 'User Editado',
      cpf: '111',
      data_nascimento: '2000-01-01',
      status: 'INATIVO',
      plano_id: '1'
    });

    component.salvar();
    tick();

    expect(beneficiarioServiceSpy.updateBeneficiario).toHaveBeenCalledWith(jasmine.objectContaining({
      id: 5,
      nome_completo: 'User Editado',
      status: 'INATIVO'
    }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/beneficiarios']);
  }));
});