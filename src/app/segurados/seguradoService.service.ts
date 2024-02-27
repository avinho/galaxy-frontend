import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { SeguradoPage } from '../../utils/SeguradoPage';
import { Segurado } from '../../utils/segurado';

@Injectable({
  providedIn: 'root',
})
export class SeguradoService {
  private readonly API = 'http://localhost:8080/api/segurados';

  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get<Segurado[]>(`${this.API}/all`);
  }

  list(pageNumber: number, pageSize: number) {
    return this.httpClient
      .get<SeguradoPage>(this.API, {
        params: { pageNumber, pageSize },
      })
      .pipe(first());
  }

  findByName(name: string, pageNumber: number, pageSize: number) {
    return this.httpClient.get<SeguradoPage>(`${this.API}/search`, {
      params: { name, pageNumber, pageSize },
    });
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

  create(data: any) {
    this.httpClient.post(this.API, data).pipe(first());
  }
}
