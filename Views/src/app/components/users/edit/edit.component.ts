import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MessageService } from 'primeng/api';
import { Response } from 'src/app/interfaces/response';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class UsarioEditComponent implements OnInit {
  id!: number;
  usuario: any = {};
  usuarioOriginal: any = {};
  usuarioForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private message: MessageService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.usuarioForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      identificacion: [''],
      fecha_nacimiento: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      celular: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.id = +idParam;
      this.obtenerDetallesUsuario();
    } else {
      console.error('ID de usuario no encontrado en la ruta.');
    }
  }

  obtenerDetallesUsuario() {
    this.usuarioService.getById(this.id)
      .subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.usuario = response.data;
            this.usuarioOriginal = { ...this.usuario };
            this.usuarioForm.setValue({
              nombres: this.usuario.nombres,
              apellidos: this.usuario.apellidos,
              email: this.usuario.email,
              identificacion: this.usuario.identificacion,
              fecha_nacimiento: this.formatFecha(this.usuario.fecha_nacimiento),
              username: this.usuario.username,
              password: this.usuario.password,
              celular: this.usuario.celular
            });
          } else {
            console.error('Error al obtener detalles del usuario:', response.message);
          }
        },
        (error) => {
          console.error('Error en la llamada HTTP:', error);
        }
      );
  }

  private formatFecha(fecha: any): string {
    return this.datePipe.transform(fecha, 'yyyy-MM-dd') || '';
  }

  private update(data: any) {
    this.usuarioService.update(this.id, data)
      .subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.usuario = response.data;
          } else {
            console.error('Error al actualizar el campo del usuario:', response.message);
          }
        },
        (error) => {
          console.error('Error en la llamada HTTP:', error);
        }
      );
  }

  updateFields(campo: string) {
    const data = {
      [campo]: campo === 'fecha_nacimiento' ? this.formatFecha(this.usuarioForm.get(campo)?.value) : this.usuarioForm.get(campo)?.value
    };

    this.update(data);
  }

  updateUser() {
    const usuarioActualizado: { [key: string]: any } = {};

    for (const campo in this.usuarioForm.value) {
      if (this.usuarioForm.value.hasOwnProperty(campo) && this.usuarioForm.value[campo] !== this.usuarioOriginal[campo]) {
        usuarioActualizado[campo] = campo === 'fecha_nacimiento' ? this.formatFecha(this.usuarioForm.value[campo]) : this.usuarioForm.value[campo];
      }
    }

    if (Object.keys(usuarioActualizado).length > 0) {
      this.updateifFields(usuarioActualizado);
    } else {
      this.message.add({ severity: 'warn', summary: 'Atención', detail: 'No se realizaron cambios' });
    }
  }

  private updateifFields(usuarioActualizado: { [key: string]: any }) {
    for (const campo in usuarioActualizado) {
      if (campo === 'fecha_nacimiento') {
        usuarioActualizado[campo] = this.formatFecha(usuarioActualizado[campo]);
      }
    }

    this.usuarioService.update(this.id, usuarioActualizado)
      .subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.router.navigate(['/users']);
            this.message.add({ severity: 'success', summary: 'Éxito', detail: 'Editado exitosamente' });
          }
        },
        (error) => {
          console.error('Error en la llamada HTTP:', error);
        }
      );
  }
}
