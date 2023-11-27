import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { MessageService } from 'primeng/api';
import { Response } from 'src/app/interfaces/response';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class CursosEditComponent implements OnInit {

  id!: number;
  curso: any = {};
  cursoOriginal: any = {};
  cursoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursoService: CursosService, 
    private message: MessageService,
    private formBuilder: FormBuilder,
  ) {
    this.cursoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      creditos: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.id = +idParam;
      this.obtenerDetallesCurso();
    } else {
      console.error('ID de curso no encontrado en la ruta.');
    }
  }

  obtenerDetallesCurso() {
    this.cursoService.getById(this.id)
      .subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.curso = response.data;
            this.cursoOriginal = { ...this.curso };
            this.cursoForm.setValue({
              nombre: this.curso.nombre,
              creditos: this.curso.creditos,
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
    this.cursoService.update(this.id, data)
      .subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.curso = response.data;
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
      [campo]: this.cursoForm.get(campo)?.value
    };

    this.update(data);
  }

  updateCurso() {
    const cursoActualizado: { [key: string]: any } = {};

    for (const campo in this.cursoForm.value) {
      if (this.cursoForm.value.hasOwnProperty(campo) && this.cursoForm.value[campo] !== this.cursoOriginal[campo]) {
        cursoActualizado[campo] = this.cursoForm.value[campo];
      }
    }

    if (Object.keys(cursoActualizado).length > 0) {
      this.updateifFields(cursoActualizado);
    } else {
      this.message.add({ severity: 'warn', summary: 'Atención', detail: 'No se realizaron cambios' });
    }
  }

  private updateifFields(cursoActualizado: { [key: string]: any }) {
    this.cursoService.update(this.id, cursoActualizado)
      .subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.router.navigate(['/courses']);
            this.message.add({ severity: 'success', summary: 'Éxito', detail: 'Editado exitosamente' });
          }
        },
        (error) => {
          console.error('Error en la llamada HTTP:', error);
        }
      );
  }
}
