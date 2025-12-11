import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Plano } from '../models/plano.model'

@Injectable({
  providedIn: 'root',
})
export class PlanoService {
  private apiUrl = 'http://localhost:3000/planos';

  constructor(private http: HttpClient){}

  getPlanos(): Observable<Plano[]> {
    return this.http.get<Plano[]>(this.apiUrl);
  }

  getPlanoById(id: number): Observable<Plano> {
    return this.http.get<Plano>(`${this.apiUrl}/${id}`);
  }

  createPlano(plano: Plano): Observable<Plano> {
    return this.http.post<Plano>(this.apiUrl, plano);
  }

  updatePlano(plano: Plano): Observable<Plano> {
    return this.http.put<Plano>(`${this.apiUrl}/${plano.id}`, plano);
  }

  deletePlano(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
