import { Injectable } from '@angular/core';
import { Service } from './service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService extends Service {

  constructor(public override http: HttpClient) {
    super(http);
    this.controller = 'unidades';
  }
}
