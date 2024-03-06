import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { SeguradoPage } from '../../utils/SeguradoPage';
import { Segurado } from '../../utils/segurado';
import 'dotenv/config';

@Injectable({
  providedIn: 'root',
})
export class SeguradoService {
  private readonly API =
    process.env['API_URL'] || 'http://localhost:8080/api/segurados';

  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get<Segurado[]>(`${this.API}/segurados/all`);
  }

  list(pageNumber: number, pageSize: number) {
    return this.httpClient
      .get<SeguradoPage>(this.API, {
        params: { pageNumber, pageSize },
      })
      .pipe(first());
  }

  findByName(name: string, pageNumber: number, pageSize: number) {
    return this.httpClient
      .get<SeguradoPage>(`${this.API}/segurados/search`, {
        params: { name, pageNumber, pageSize },
      })
      .pipe(first());
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.API}/segurados/${id}`).pipe(first());
  }

  createPF(data: any) {
    return this.httpClient.post(`${this.API}/segurados/pf`, data).pipe(first());
  }
  createPJ(data: any) {
    return this.httpClient.post(`${this.API}/segurados/pj`, data).pipe(first());
  }
}
