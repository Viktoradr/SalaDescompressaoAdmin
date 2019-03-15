import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { UsuariosComponent } from './usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    AddUsuarioComponent,
    EditarUsuarioComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
  ],
})
export class UsuariosModule { }
