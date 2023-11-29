import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListComponent } from './components/users/list/list.component';
import { UnidadesListComponent } from './components/unidades/list/list.component';
import { ActividadesListComponent } from './components/actividades/list/list.component';
import { CursosListComponent } from './components/cursos/list/list.component';
import { UsersCreateComponent } from './components/users/create/create.component';
import { UnidadesCreateComponent } from './components/unidades/create/create.component';
import { CursosCreateComponent } from './components/cursos/create/create.component';
import { ActividadesCreateComponent } from './components/actividades/create/create.component';
import { UsarioEditComponent } from './components/users/edit/edit.component';
import { UnidadEditComponent } from './components/unidades/edit/edit.component';
import { CursosEditComponent } from './components/cursos/edit/edit.component';
import { EditActividadComponent } from './components/actividades/edit/edit.component';

const routes: Routes = [
  { path: 'users', component: UsuariosListComponent },
  { path: 'units', component: UnidadesListComponent },
  { path: 'activities', component: ActividadesListComponent },
  { path: 'courses', component: CursosListComponent },
  { path: 'users/create', component: UsersCreateComponent },
  { path: 'units/create', component: UnidadesCreateComponent },
  { path: 'courses/create', component: CursosCreateComponent },
  { path: 'activities/create', component: ActividadesCreateComponent },
  { path: 'users/update/:id', component: UsarioEditComponent },
  { path: 'units/update/:id', component: UnidadEditComponent },
  { path: 'courses/update/:id', component: CursosEditComponent },
  { path: 'activities/update/:id', component: EditActividadComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
