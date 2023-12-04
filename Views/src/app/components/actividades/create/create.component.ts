import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from 'src/app/interfaces/response';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class ActividadesCreateComponent {
  actividadForm!: FormGroup;
  listaUnidades: any[] = []; 
  constructor(
    private ActividadesService: ActividadesService, 
    private router: Router, 
    private MessageService: MessageService, 
    private formBuilder: FormBuilder,
    private UnidadesService: UnidadesService
    ) {}

  ngOnInit(): void {
    this.actividadForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      actividadescol: ['', Validators.required],
      unidad_id: ['', Validators.required],
    });

    this.UnidadesService.getAll().subscribe(
      (response: Response) => {
        if (response.code === 200) {
          this.listaUnidades = response.data;
        }
      },
      (error) => {
        console.log(error);
        this.MessageService.add({ severity: 'error' });
      }
    );
  }

  public save() {
    if (this.actividadForm.valid) {
      this.ActividadesService.create(this.actividadForm.value).subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.router.navigate(['/courses']);
            this.MessageService.add({ severity: 'success' });
          }
        },
        (error) => {
          console.log(error);
          this.MessageService.add({ severity: 'error' });
        }
      );
    } else {
      this.MessageService.add({ severity: 'error', summary: 'Error', detail: 'Formulario no válido. Revise los campos.' });
    }
  }
}
