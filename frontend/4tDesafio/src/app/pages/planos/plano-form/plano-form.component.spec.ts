import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PlanoFormComponent } from './plano-form.component';
import { PlanoService } from '../../../services/plano.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

describe('PlanoFormComponent', () => {
  let component: PlanoFormComponent;
  let fixture: ComponentFixture<PlanoFormComponent>;
  let planoServiceSpy: jasmine.SpyObj<PlanoService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: () => null
      }
    }
  };

  beforeEach(async () => {
    planoServiceSpy = jasmine.createSpyObj('PlanoService', ['createPlano', 'updatePlano', 'getPlanoById']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [PlanoFormComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: PlanoService, useValue: planoServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerSpy }
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
  
  it('deve chamar createPlano e navegar ao salvar formulário válido em modo criação', fakeAsync(() => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));
    planoServiceSpy.createPlano.and.returnValue(of({ id: 1, nome: 'Novo', codigo_registro_ans: '123' }));

    component.isEdicao = false;
    component.form.setValue({ nome: 'Novo Plano', codigo_registro_ans: 'ANS-999' });

    component.salvar();
    tick();

    expect(planoServiceSpy.createPlano).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/planos']);
  }));
  
  it('deve chamar updatePlano e navegar ao salvar em modo edição', fakeAsync(() => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));
    planoServiceSpy.updatePlano.and.returnValue(of({ id: 10, nome: 'Editado', codigo_registro_ans: '123' }));

    component.isEdicao = true;
    component.idPlano = 10;
    component.form.setValue({ nome: 'Plano Editado', codigo_registro_ans: 'ANS-10' });

    component.salvar();
    tick();

    expect(planoServiceSpy.updatePlano).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/planos']);
  }));
});