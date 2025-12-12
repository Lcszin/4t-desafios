import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { PlanoFormComponent } from './plano-form.component';
import { PlanoService } from '../../../services/plano.service';
import { ActivatedRoute } from '@angular/router';

describe('PlanoFormComponent', () => {
  let component: PlanoFormComponent;
  let fixture: ComponentFixture<PlanoFormComponent>;
  let planoServiceSpy: jasmine.SpyObj<PlanoService>;
  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: () => null
      }
    }
  };

  beforeEach(async () => {
    planoServiceSpy = jasmine.createSpyObj('PlanoService', ['createPlano', 'updatePlano', 'getPlanoById']);

    await TestBed.configureTestingModule({
      declarations: [PlanoFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule 
      ],
      providers: [
        { provide: PlanoService, useValue: planoServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
  
  it('deve iniciar com o formulário inválido', () => {
    expect(component.form.valid).toBeFalse();
  });
  
  it('deve continuar inválido se preencher apenas o nome', () => {
    const nomeControl = component.form.get('nome');
    const ansControl = component.form.get('codigo_registro_ans');

    nomeControl?.setValue('Plano Teste');
    ansControl?.setValue('');

    expect(component.form.valid).toBeFalse();
    expect(ansControl?.hasError('required')).toBeTrue();
  });

  it('deve ficar válido quando todos os campos forem preenchidos corretamente', () => {
    component.form.setValue({
      nome: 'Plano Ouro',
      codigo_registro_ans: 'ANS-123'
    });

    expect(component.form.valid).toBeTrue();
  });
  
  it('NÃO deve chamar o serviço se tentar salvar formulário inválido', () => {
    component.salvar();
    expect(planoServiceSpy.createPlano).not.toHaveBeenCalled();
    expect(planoServiceSpy.updatePlano).not.toHaveBeenCalled();
  });
  
  it('deve chamar createPlano quando salvar formulário válido em modo criação', () => {
    planoServiceSpy.createPlano.and.returnValue(of({ id: 1, nome: 'Novo', codigo_registro_ans: '123' }));

    component.isEdicao = false;
    component.form.setValue({ nome: 'Novo Plano', codigo_registro_ans: 'ANS-999' });

    component.salvar();

    expect(planoServiceSpy.createPlano).toHaveBeenCalledTimes(1);
    expect(planoServiceSpy.createPlano).toHaveBeenCalledWith(jasmine.objectContaining({
      nome: 'Novo Plano',
      codigo_registro_ans: 'ANS-999'
    }));
  });
  
  it('deve chamar updatePlano quando salvar em modo edição', () => {
    planoServiceSpy.updatePlano.and.returnValue(of({ id: 10, nome: 'Editado', codigo_registro_ans: '123' }));

    component.isEdicao = true;
    component.idPlano = 10;
    component.form.setValue({ nome: 'Plano Editado', codigo_registro_ans: 'ANS-10' });

    component.salvar();

    expect(planoServiceSpy.updatePlano).toHaveBeenCalled();
    expect(planoServiceSpy.createPlano).not.toHaveBeenCalled();
  });
});