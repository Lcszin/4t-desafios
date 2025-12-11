import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beneficiario } from '../models/beneficiario.model';

@Injectable({
  providedIn: 'root',
})
export class BeneficiarioService {
  private apiUrl = 'http://localhost:3000/beneficiarios';

  constructor(private http: HttpClient) {}
  
  getBeneficiarios(status?: string, planoId?: number): Observable<Beneficiario[]>{
    let params = new HttpParams().set('_expand', 'plano');

    if(status && status !== 'Todos'){
      params = params.set('status', status)
    }
    if(planoId){
      params = params.set('plano_id', planoId);
    }
    return this.http.get<Beneficiario[]>(this.apiUrl, { params });
  }

  getBeneficiarioById(id: number): Observable<Beneficiario> {
    return this.http.get<Beneficiario>(`${this.apiUrl}/${id}`);
  }

  createBeneficiario(beneficiario: Beneficiario): Observable<Beneficiario> {
    return this.http.post<Beneficiario>(this.apiUrl, beneficiario);
  }

  updateBeneficiario(beneficiario: Beneficiario): Observable<Beneficiario> {
    return this.http.put<Beneficiario>(`${this.apiUrl}/${beneficiario.id}`, beneficiario);
  }

  deleteBeneficiario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

}
