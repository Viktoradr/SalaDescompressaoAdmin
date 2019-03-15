import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

const routes: Routes = [
  { 
      path: '',
      component: UsuariosComponent,
      children: [
          { path: 'Novo', component: AddUsuarioComponent },
          { path: 'Editar/:id', component: EditarUsuarioComponent },
      ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
