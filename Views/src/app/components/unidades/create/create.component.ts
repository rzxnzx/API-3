import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadesService } from 'src/app/services/unidades.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CursosService } from 'src/app/services/cursos.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from 'src/app/interfaces/response';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class UnidadesCreateComponent implements OnInit {
  unidadForm!: FormGroup;
  listaUsuarios: any[] = [];
  listaCursos: any[] = [];

  constructor(
    private unidadesService: UnidadesService,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usuariosService: UsuarioService,
    private cursosService: CursosService,
    private datePipie: DatePipe
  ) { }

  ngOnInit(): void {
    this.unidadForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      introduccion: ['', Validators.required],
      fecha_creacion: ['', Validators.required],
      hora_creacion: ['', Validators.required],
      activa: ['', Validators.required],
      cursos_id: ['', Validators.required],
      usuario_id: ['', Validators.required],
    });

    this.usuariosService.getAll().subscribe(
      (response: Response) => {
        if (response.code === 200) {
          this.listaUsuarios = response.data;
        }
      },
      (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error}` });
      }
    );

    this.cursosService.getAll().subscribe(
      (response: Response) => {
        if (response.code === 200) {
          this.listaCursos = response.data;
        }
      },
      (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error}` });
      }
    );
  }

  public save() {
    if (this.unidadForm.valid) {
      const fecha_creacionFormatted = this.datePipie.transform(this.unidadForm.value.fecha_creacion, 'yyyy-MM-dd')
      this.unidadForm.patchValue({ fecha_creacion: fecha_creacionFormatted });
      this.unidadesService.create(this.unidadForm.value).subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.router.navigate(['/units']);
            this.messageService.add({ severity: 'success', detail: '. ✅' });
          }
        },
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error}` });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Formulario no válido. Revise los campos.',
      });
    }
  }
}
