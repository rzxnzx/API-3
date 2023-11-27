import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User, Response } from 'src/app/interfaces/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class UsuariosListComponent implements OnInit {
  displayedColumns: string[] = ['eliminar', 'editar', 'nombres', 'apellidos', 'email', 'identificacion', 'fecha_nacimiento', 'username', 'celular'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe((response: Response) => {
      if (response.code === 200) {
        this.dataSource.data = response.data;
      } else {
        console.error('Error fetching data:', response.message);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  create() {
    this.router.navigate(['users/create'])
  }

  update(id: number) {
    this.router.navigate(['users/update', id])
  }
  eliminar(id: number) {
    this.userService.delete(id).subscribe((response: Response) => {
      if (response.code === 200) {
        this.ngOnInit();
        this.router.navigate(['/users'])
      }
    })
  }
}
