import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Segurado } from '../segurado';
import { SeguradoPage } from '../SeguradoPage';

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
    return this.httpClient.get<SeguradoPage>(this.API, {
      params: { pageNumber, pageSize },
    });
  }

  findByName(name: string, pageNumber: number, pageSize: number) {
    return this.httpClient.get<SeguradoPage>(`${this.API}/search`, {
      params: { name, pageNumber, pageSize },
    });
  }

  create(data: any) {
    this.httpClient.post(this.API, data).subscribe();
  }
}
