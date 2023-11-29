export interface Response {
  code: number;
  message: string;
  data: any[];
  status: string;
}

export interface User {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  identificacion: string;
  fecha_nacimiento: string;
  username: string;
  password: string;
  celular: string;
}

export interface Curso {
  id:number;
  nombre: string;
  creditos: number;
}