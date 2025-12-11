import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BeneficiarioService } from './beneficiario.service';
import { Beneficiario } from '../models/beneficiario.model';

describe('BeneficiarioService', () => {
  let service: BeneficiarioService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/beneficiarios';

  const dummyBeneficiario: Beneficiario = {
    id: 1,
    nome_completo: 'João Silva',
    cpf: '111.222.333-44',
    data_nascimento: '1990-01-01',
    status: 'ATIVO',
    plano_id: 10
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BeneficiarioService]
    });
    service = TestBed.inject(BeneficiarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });
  
  it('deve buscar lista de beneficiários e incluir _expand=plano', () => {
    const listaMock = [dummyBeneficiario];

    service.getBeneficiarios().subscribe(beneficiarios => {
      expect(beneficiarios.length).toBe(1);
      expect(beneficiarios).toEqual(listaMock);
    });
    
    const req = httpMock.expectOne(req => 
      req.url === apiUrl && req.params.get('_expand') === 'plano'
    );
    expect(req.request.method).toBe('GET');
    req.flush(listaMock);
  });
  
  it('deve aplicar filtros de status e planoId na URL', () => {
    const status = 'INATIVO';
    const planoId = 5;

    service.getBeneficiarios(status, planoId).subscribe();

    const req = httpMock.expectOne(req => 
      req.url === apiUrl && 
      req.params.get('status') === 'INATIVO' && 
      req.params.get('plano_id') === '5'
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
  
  it('deve buscar um beneficiário por ID', () => {
    service.getBeneficiarioById(1).subscribe(data => {
      expect(data).toEqual(dummyBeneficiario);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBeneficiario);
  });
  
  it('deve criar novo beneficiário', () => {
    const novoUser: Beneficiario = { ...dummyBeneficiario, id: undefined }; // Sem ID no cadastro

    service.createBeneficiario(novoUser).subscribe(data => {
      expect(data).toEqual(dummyBeneficiario);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(novoUser);
    req.flush(dummyBeneficiario);
  });
  
  it('deve atualizar beneficiário existente', () => {
    const userEditado = { ...dummyBeneficiario, nome_completo: 'Nome Alterado' };

    service.updateBeneficiario(userEditado).subscribe(data => {
      expect(data.nome_completo).toBe('Nome Alterado');
    });

    const req = httpMock.expectOne(`${apiUrl}/${userEditado.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(userEditado);
    req.flush(userEditado);
  });
  
  it('deve remover beneficiário', () => {
    service.deleteBeneficiario(1).subscribe(res => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});