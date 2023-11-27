export interface Response {
    code: number;
    message: string;
    data: any[];
    status: string;
}

export interface User {
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
    nombre: string;
    creditos: number;
  }