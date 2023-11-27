import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Curso, Response } from 'src/app/interfaces/response'; 
import { CursosService } from 'src/app/services/cursos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CursosListComponent {

  displayedColumns: string[] = ['eliminar','editar', 'nombreCurso', 'creditos'];
  dataSource = new MatTableDataSource<Curso>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private CursosService: CursosService, private router: Router) { }

  ngOnInit(): void {
    this.CursosService.getAll().subscribe((response: Response) => {
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
    this.router.navigate(['courses/create'])
  }
  update(id: number){
    this.router.navigate(['courses/update', id])
  }

  eliminar(id: number) {
    this.CursosService.delete(id).subscribe((response: Response) => {
      if (response.code === 200) {
        this.ngOnInit();
        this.router.navigate(['/courses'])
      }
    })
  }
}
