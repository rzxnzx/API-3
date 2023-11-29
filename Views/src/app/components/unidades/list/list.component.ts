// list.component.ts
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Curso, Response } from 'src/app/interfaces/response'; 
import { UnidadesService } from 'src/app/services/unidades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class UnidadesListComponent {

  displayedColumns: string[] = ['eliminar','editar','nombreUnidad','nombreCurso', 'nombreUsuario', 'introduccion', 'fecha_creacion', 'hora_creacion', 'activa'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private unidadesService: UnidadesService, private router: Router) { }

  ngOnInit(): void {
    this.unidadesService.getAll().subscribe((response: Response) => {
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

  create(){
    this.router.navigate(['units/create'])
  }
  update(id: number){
    this.router.navigate(['units/update', id])
  }

  eliminar(id: number) {
    this.unidadesService.delete(id).subscribe((response: Response) => {
      if (response.code === 200) {
        this.ngOnInit();
        this.router.navigate(['/units'])
      }
    })
  }
}
