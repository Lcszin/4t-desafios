import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BeneficiarioListComponent } from './beneficiario-list.component';
import { BeneficiarioService } from '../../../services/beneficiario.service';
import { PlanoService } from '../../../services/plano.service';
import { Beneficiario } from '../../../models/beneficiario.model';
import { Plano } from '../../../models/plano.model';

describe('BeneficiarioListComponent', () => {
  let component: BeneficiarioListComponent;
  let fixture: ComponentFixture<BeneficiarioListComponent>;
  
  let beneficiarioServiceSpy: jasmine.SpyObj<BeneficiarioService>;
  let planoServiceSpy: jasmine.SpyObj<PlanoService>;

  const listaBeneficiariosMock: Beneficiario[] = [
    { id: 1, nome_completo: 'João', cpf: '123', data_nascimento: '1990-01-01', status: 'ATIVO', plano_id: 1, plano: { nome: 'Plano A' } as Plano },
    { id: 2, nome_completo: 'Maria', cpf: '456', data_nascimento: '1995-05-05', status: 'INATIVO', plano_id: 2 }
  ];

  beforeEach(async () => {
    beneficiarioServiceSpy = jasmine.createSpyObj('BeneficiarioService', ['getBeneficiarios', 'deleteBeneficiario']);
    planoServiceSpy = jasmine.createSpyObj('PlanoService', ['getPlanos']);

    await TestBed.configureTestingModule({
      declarations: [BeneficiarioListComponent],
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        { provide: BeneficiarioService, useValue: beneficiarioServiceSpy },
        { provide: PlanoService, useValue: planoServiceSpy }
      ]
    }).compileComponents();
    beneficiarioServiceSpy.getBeneficiarios.and.returnValue(of(listaBeneficiariosMock));
    planoServiceSpy.getPlanos.and.returnValue(of([]));

    fixture = TestBed.createComponent(BeneficiarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar beneficiários e planos ao iniciar', () => {
    expect(beneficiarioServiceSpy.getBeneficiarios).toHaveBeenCalled();
    expect(planoServiceSpy.getPlanos).toHaveBeenCalled();
    expect(component.beneficiarios.length).toBe(2);
  });

  it('deve filtrar por Status e Plano ao chamar buscarBeneficiarios()', () => {
    component.filtroStatus = 'INATIVO';
    component.filtroPlano = '2';
    component.buscarBeneficiarios();
    expect(beneficiarioServiceSpy.getBeneficiarios).toHaveBeenCalledWith('INATIVO', 2);
  });

  it('deve excluir beneficiário se confirmado', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    beneficiarioServiceSpy.deleteBeneficiario.and.returnValue(of(void 0));

    component.deletarBeneficiario(1);

    expect(beneficiarioServiceSpy.deleteBeneficiario).toHaveBeenCalledWith(1);
    expect(component.beneficiarios.length).toBe(1);
    expect(component.beneficiarios[0].id).toBe(2);
  });
});