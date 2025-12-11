import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlanoService } from './plano.service';
import { Plano } from '../models/plano.model';

describe('PlanoService', () => {
  let service: PlanoService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/planos';

  const dummyPlanos: Plano[] = [
    { id: 1, nome: 'Plano Bronze', codigo_registro_ans: 'ANS-100' },
    { id: 2, nome: 'Plano Prata', codigo_registro_ans: 'ANS-200' }
  ];

  const dummyPlano: Plano = { id: 1, nome: 'Plano Bronze', codigo_registro_ans: 'ANS-100' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlanoService]
    });
    service = TestBed.inject(PlanoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar lista de planos (GET)', () => {
    service.getPlanos().subscribe(planos => {
      expect(planos.length).toBe(2);
      expect(planos).toEqual(dummyPlanos);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPlanos);
  });
  
  it('deve retornar um plano por ID (GET)', () => {
    service.getPlanoById(1).subscribe(plano => {
      expect(plano).toEqual(dummyPlano);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPlano);
  });
  
  it('deve criar um novo plano (POST)', () => {
    const novoPlano: Plano = { nome: 'Plano Ouro', codigo_registro_ans: 'ANS-300' };

    service.createPlano(novoPlano).subscribe(plano => {
      expect(plano).toEqual(novoPlano);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(novoPlano);
    req.flush(novoPlano);
  });
  
  it('deve atualizar um plano existente (PUT)', () => {
    const planoEditado: Plano = { id: 1, nome: 'Plano Bronze Editado', codigo_registro_ans: 'ANS-100' };

    service.updatePlano(planoEditado).subscribe(plano => {
      expect(plano).toEqual(planoEditado);
    });
    
    const req = httpMock.expectOne(`${apiUrl}/${planoEditado.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(planoEditado);
    req.flush(planoEditado);
  });
  
  it('deve excluir um plano (DELETE)', () => {
    const idParaDeletar = 1;

    service.deletePlano(idParaDeletar).subscribe(res => {
      expect(res).toBeNull(); 
    });

    const req = httpMock.expectOne(`${apiUrl}/${idParaDeletar}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});