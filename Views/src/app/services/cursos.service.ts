import { Injectable } from '@angular/core';
import { Service } from './service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService extends Service {

  constructor(public override http: HttpClient) {
    super(http);
    this.controller = 'cursos';
  }
}
