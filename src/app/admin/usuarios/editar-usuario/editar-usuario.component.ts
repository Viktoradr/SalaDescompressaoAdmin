import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { PNotifyProvider } from 'src/app/shared/providers/pnotify/pnotify.provider';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { take } from 'rxjs/operators';
import { MESSAGES } from 'src/app/app.messages';
import { MASKS } from 'src/app/app.mask';
import { UsuarioProvider } from 'src/app/shared/providers/usuario/usuario.provider';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  usuario: Usuario;
  mask = MASKS.cpfMask;

  constructor(
    private notify: PNotifyProvider,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private usuarioProvider: UsuarioProvider,
  ) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe(params => {
      if (params['id'] != undefined) {
        this.usuarioService.getUsuarioAdmin(params['id'])
        .pipe(take(1))
        .subscribe((res: Usuario) => {
          if(res) {
            console.log(res)
            this.usuario = res;
            //this.usuario.cpf.replace('.','').replace('.','').replace('-','');
          } else {
            this.notify.error('Erro', MESSAGES._erro);
          }
        });
      }
    })
  }

  editarUsuario() {
    this.usuarioService.editarUsuarioAdmin(this.usuario)
    .pipe(take(1))
    .subscribe(res => {
      if(res) {
        this.usuarioProvider.eventProduto(this.usuario);
        this.notify.success('Alterado!', MESSAGES._success_alt_usuario);
      } else {
        this.notify.info('Aviso!', MESSAGES._aviso);
      }
    }, err => {
      this.notify.error('Erro', MESSAGES._erro);
    });
  }
}