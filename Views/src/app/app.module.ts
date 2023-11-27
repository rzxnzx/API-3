import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosListComponent } from './components/users/list/list.component';
import { UnidadesListComponent } from './components/unidades/list/list.component';
import { Service } from './services/service.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ActividadesListComponent } from './components/actividades/list/list.component';
import { CursosListComponent } from './components/cursos/list/list.component';
import { UsersCreateComponent } from './components/users/create/create.component';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api'
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { UnidadesCreateComponent } from './components/unidades/create/create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CursosCreateComponent } from './components/cursos/create/create.component';
import { ToastModule } from 'primeng/toast';
import { ActividadesCreateComponent } from './components/actividades/create/create.component';
import { UsarioEditComponent } from './components/users/edit/edit.component';
import { UnidadEditComponent } from './components/unidades/edit/edit.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CursosEditComponent } from './components/cursos/edit/edit.component';
import { EditActividadComponent } from './components/actividades/edit/edit.component';
@NgModule({
  declarations: [
    AppComponent,
    UsuariosListComponent,
    UnidadesListComponent,
    ActividadesListComponent,
    CursosListComponent,
    UsersCreateComponent,
    UnidadesCreateComponent,
    CursosCreateComponent,
    ActividadesCreateComponent,
    UsarioEditComponent,
    UnidadEditComponent,
    CursosEditComponent,
    EditActividadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    ToastModule,
    NgxMaterialTimepickerModule

  ],
  providers: [Service, MessageService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
