import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadesService } from 'src/app/services/unidades.service';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CursosService } from 'src/app/services/cursos.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class UnidadEditComponent implements OnInit {

  id!: number;
  unidad: any = {};
  unidadOriginal: any = {};
  formularioUnidad: FormGroup;
  cursos: any[] = [];
  usuarios: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private unidadesService: UnidadesService,
    private messageService: MessageService,
    private usuariosService: UsuarioService,
    private cursoService: CursosService,
    private datePipe: DatePipe
  ) {
    this.formularioUnidad = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      introduccion: ['', [Validators.required]],
      fecha_creacion: ['', [Validators.required]],
      hora_creacion: ['', [Validators.required]],
      activa: [false],
      cursos_id: [null, [Validators.required]],
      usuario_id: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.id = +idParam;
      this.obtenerDetallesUnidad();
      this.obtenerCursos();
      this.obtenerUsuarios();
    } else {
      console.error('ID de unidad no encontrado en la ruta.');
    }
  }

  volver() {
    this.router.navigate(['/unidades']);
  }

  obtenerCursos() {
    this.cursoService.getAll()
      .subscribe(response => {
        if (response.code === 200) {
          this.cursos = response.data;
        } else {
          console.error('Error al obtener la lista de cursos:', response.message);
        }
      });
  }

  obtenerUsuarios() {
    this.usuariosService.getAll()
      .subscribe(response => {
        if (response.code === 200) {
          this.usuarios = response.data;
        } else {
          console.error('Error al obtener la lista de usuarios:', response.message);
        }
      });
  }

  volverALista() {
    this.router.navigate(['/unidades']);
  }

  obtenerDetallesUnidad() {
    this.unidadesService.getById(this.id)
      .subscribe(response => {
        if (response.code === 200) {
          this.unidad = response.data;
          this.unidadOriginal = { ...this.unidad };
          this.cargarDatosFormulario();
        } else {
          console.error('Error al obtener detalles de la unidad:', response.message);
        }
      });
  }

  cargarDatosFormulario() {
    this.formularioUnidad.patchValue({
      nombre: this.unidad.nombre,
      introduccion: this.unidad.introduccion,
      fecha_creacion: this.formatFecha(this.unidad.fecha_creacion),
      hora_creacion: this.unidad.hora_creacion,
      activa: this.unidad.activa,
      cursos_id: this.unidad.cursos_id,
      usuario_id: this.unidad.usuario_id,
    });
  }

  private formatFecha(fecha: any): string {
    return this.datePipe.transform(fecha, 'yyyy-MM-dd') || '';
  }

  actualizarCampoUnidad(campo: string) {
    let data: any = {};

    if (campo === 'activa') {
      data = { [campo]: this.formularioUnidad.get(campo)?.value === true };
    } else {
      data = { [campo]: this.formularioUnidad.get(campo)?.value };
    }

    this.unidadesService.update(this.id, data)
      .subscribe(response => {
        if (response.code === 200) {
          this.unidad = response.data;
        } else {
          console.error('Error al actualizar el campo de la unidad:', response.message);
        }
      });
  }

  actualizarUnidad() {
    if (this.formularioUnidad.valid) {
      const unidadActualizada = this.formularioUnidad.value;
      unidadActualizada.fecha_creacion = this.formatFecha(unidadActualizada.fecha_creacion);
      unidadActualizada.activa = unidadActualizada.activa === false ? false : true;
  
      this.unidadesService.update(this.id, unidadActualizada)
        .subscribe(response => {
          if (response.code === 200) {
            this.router.navigate(['/units']);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Editado exitosamente' });
          }
        }, error => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al editar' });
        });
    } else {
      this.formularioUnidad.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Formulario incompleto o incorrecto' });
    }
  }
  
}
