import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BeneficiarioFormComponent } from './beneficiario-form.component';
import { BeneficiarioService } from '../../../services/beneficiario.service';
import { PlanoService } from '../../../services/plano.service';
import { ActivatedRoute } from '@angular/router';
import { Beneficiario } from '../../../models/beneficiario.model';
import { Plano } from '../../../models/plano.model';

describe('BeneficiarioFormComponent', () => {
  let component: BeneficiarioFormComponent;
  let fixture: ComponentFixture<BeneficiarioFormComponent>;
  let beneficiarioServiceSpy: jasmine.SpyObj<BeneficiarioService>;
  let planoServiceSpy: jasmine.SpyObj<PlanoService>;

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

    await TestBed.configureTestingModule({
      declarations: [BeneficiarioFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: BeneficiarioService, useValue: beneficiarioServiceSpy },
        { provide: PlanoService, useValue: planoServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
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

  it('deve carregar a lista de planos ao iniciar (para popular o select)', () => {
    expect(planoServiceSpy.getPlanos).toHaveBeenCalled();
    expect(component.listaPlanos.length).toBe(2);
  });

  it('deve iniciar inválido (campos vazios)', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('deve validar campos obrigatórios (ex: Nome e CPF)', () => {
    const nomeControl = component.form.get('nome_completo');
    nomeControl?.setValue('');
    expect(nomeControl?.valid).toBeFalse();
    expect(nomeControl?.hasError('required')).toBeTrue();
  });

  it('deve habilitar o botão salvar quando formulário estiver válido', () => {
    component.form.setValue({
      nome_completo: 'João Silva',
      cpf: '123.456.789-00',
      data_nascimento: '1990-01-01',
      status: 'ATIVO',
      plano_id: '1'
    });

    expect(component.form.valid).toBeTrue();
  });
  
  it('deve chamar createBeneficiario ao salvar novo registro', () => {
    beneficiarioServiceSpy.createBeneficiario.and.returnValue(of({} as Beneficiario));
    
    component.form.setValue({
      nome_completo: 'Novo User',
      cpf: '111',
      data_nascimento: '2000-01-01',
      status: 'ATIVO',
      plano_id: '2'
    });

    component.salvar();
    
    expect(beneficiarioServiceSpy.createBeneficiario).toHaveBeenCalledWith(jasmine.objectContaining({
      nome_completo: 'Novo User',
      plano_id: 2
    }));
  });
  
  it('deve chamar updateBeneficiario ao salvar edição', () => {
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

    expect(beneficiarioServiceSpy.updateBeneficiario).toHaveBeenCalledWith(jasmine.objectContaining({
      id: 5,
      nome_completo: 'User Editado',
      status: 'INATIVO'
    }));
  });
});