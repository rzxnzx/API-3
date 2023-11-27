import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { MessageService } from 'primeng/api';
import { Response } from 'src/app/interfaces/response';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CursosCreateComponent {
  cursoForm!: FormGroup;
  constructor(private CursosService: CursosService, private router: Router, private MessageService: MessageService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.cursoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      creditos: ['', Validators.required],
    });
  }

  public save() {
    if (this.cursoForm.valid) {
      this.CursosService.create(this.cursoForm.value).subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.router.navigate(['/courses']);
            this.MessageService.add({ severity: 'success', detail: '✅' });
          }
        },
        (error) => {
          console.log(error);
          this.MessageService.add({ severity: 'error', summary: 'Error', detail: `${error}` });
        }
      );
    } else {
      this.MessageService.add({ severity: 'error', summary: 'Error', detail: 'Formulario no válido. Revise los campos.' });
    }
  }
}
