import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Response } from 'src/app/interfaces/response';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class UsersCreateComponent implements OnInit{
  usuarioForm!: FormGroup;
  constructor(private usersService: UsuarioService, private router: Router, private MessageService: MessageService, private formBuilder: FormBuilder, private datePipe: DatePipe) {}


  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      identificacion: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      celular: ['', Validators.required]
    });
  }

  public save() {
    if (this.usuarioForm.valid) {
      const fechaNacimientoFormatted = this.datePipe.transform(this.usuarioForm.value.fecha_nacimiento, 'yyyy-MM-dd');
      this.usuarioForm.patchValue({ fecha_nacimiento: fechaNacimientoFormatted });
      this.usersService.create(this.usuarioForm.value).subscribe(
        (response: Response) => {
          if (response.code === 200) {
            this.router.navigate(['/users']);
            this.MessageService.add({ severity: 'success', detail: '. ✅' });
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
