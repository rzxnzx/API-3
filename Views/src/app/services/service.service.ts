import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from 'src/config.settings';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class Service {
  public baseUrl = Settings.API_ENDPOINT;
  public controller: string;

  constructor(public http: HttpClient) {}

  public getAll(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/${this.controller}/listar`);
  }

  public getById(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/${this.controller}/obtener/${id}`);
  }

  public create(item: any): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/${this.controller}/crear`, item);
  }

  public update(id: number, item: any): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/${this.controller}/actualizar/${id}`, item);
  }

  public delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/${this.controller}/eliminar/${id}`);
  }
}
