import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';
import { MessageService } from 'primeng/api';
import { UnidadesService } from 'src/app/services/unidades.service';
import { Response } from 'src/app/interfaces/response';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditActividadComponent {
  id!: number;
  actividad: any = {};
  cursoOriginal: any = {};
  listaUnidades: any[] = []
  ActividadForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ActividadesService: ActividadesService, 
    private message: MessageService,
    private formBuilder: FormBuilder,
    private UnidadesService: UnidadesService
  ) {
    this.ActividadForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      actividadescol: ['', Validators.required],
      unidad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.id = +idParam;
      this.obtenerDetallesCurso();
      this.UnidadesService.getAll().subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.listaUnidades = response.data;
          }
        },
      )
    } else {
      console.error('ID de curso no encontrado en la ruta.');
    }
  }

  obtenerDetallesCurso() {
    this.ActividadesService.getById(this.id)
      .subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.actividad = response.data;
            this.cursoOriginal = { ...this.actividad };
            this.ActividadForm.setValue({
              titulo: this.actividad.titulo,
              descripcion: this.actividad.descripcion,
              actividadescol: this.actividad.actividadescol,
              unidad: this.actividad.unidad_id
            });
          } else {
            console.error('Error al obtener detalles del curso:', response.message);
          }
        },
        (error) => {
          console.error('Error en la llamada HTTP:', error);
        }
      );
  }

  private update(data: any) {
    this.ActividadesService.update(this.id, data)
      .subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.actividad = response.data;
          } else {
            console.error('Error al actualizar el campo del curso:', response.message);
          }
        },
        (error) => {
          console.error('Error en la llamada HTTP:', error);
        }
      );
  }

  updateFields(campo: string) {
    const data = {
      [campo]: this.ActividadForm.get(campo)?.value
    };

    this.update(data);
  }

  updateActividad() {
    const cursoActualizado: { [key: string]: any } = {};

    for (const campo in this.ActividadForm.value) {
      if (this.ActividadForm.value.hasOwnProperty(campo) && this.ActividadForm.value[campo] !== this.cursoOriginal[campo]) {
        cursoActualizado[campo] = this.ActividadForm.value[campo];
      }
    }

    if (Object.keys(cursoActualizado).length > 0) {
      this.updateifFields(cursoActualizado);
    } else {
      this.message.add({ severity: 'warn', summary: 'Atención', detail: 'No se realizaron cambios' });
    }
  }

  private updateifFields(cursoActualizado: { [key: string]: any }) {
    this.ActividadesService.update(this.id, cursoActualizado)
      .subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.router.navigate(['/activities']);
            this.message.add({ severity: 'success', summary: 'Éxito', detail: 'Editado exitosamente' });
          }
        },
        (error) => {
          console.error('Error en la llamada HTTP:', error);
        }
      );
  }
}