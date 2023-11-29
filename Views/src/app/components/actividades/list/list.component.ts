import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Curso, Response } from 'src/app/interfaces/response'; 
import { ActividadesService } from 'src/app/services/actividades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ActividadesListComponent {
  displayedColumns: string[] = ['eliminar','editar','nombreUnidad','titulo', 'descripcion', 'actividadescol'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ActividadesService: ActividadesService, private router: Router) { }

  ngOnInit(): void {
    this.ActividadesService.getAll().subscribe((response: Response) => {
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
    this.router.navigate(['activities/create'])
  }

  update(id: number){
    this.router.navigate(['activities/update', id])
  }

  eliminar(id: number) {
    this.ActividadesService.delete(id).subscribe((response: Response) => {
      if (response.code === 200) {
        this.ngOnInit();
        this.router.navigate(['/activities'])
      }
    })
  }
}
