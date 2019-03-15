import { Component, OnInit } from '@angular/core';
import { MASKS } from 'src/app/app.mask';
import { Usuario } from 'src/app/model/usuario.model';
import { PNotifyProvider } from 'src/app/shared/providers/pnotify/pnotify.provider';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { take } from 'rxjs/operators';
import { MESSAGES } from 'src/app/app.messages';
import { UsuarioProvider } from 'src/app/shared/providers/usuario/usuario.provider';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss']
})
export class AddUsuarioComponent implements OnInit {

  usuario: Usuario;
  mask = MASKS.cpfMask;
  
  constructor(
    private notify: PNotifyProvider,
    private usuarioService: UsuarioService,
    private usuarioProvider: UsuarioProvider,
  ) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {}

  novoUsuario() {
    this.usuarioService.addUsuarioAdmin(this.usuario)
    .pipe(take(1))
    .subscribe((res: Usuario) => {
      if(res) {
        this.usuario = new Usuario();
        this.usuarioProvider.eventProduto(res);
        this.notify.success('Cadastrado!', MESSAGES._success_cad_usuario);
      } else {
        this.notify.info('Aviso!', MESSAGES._aviso);
      }
    }, err => {
      this.notify.error('Erro', MESSAGES._erro);
    });
  }

}
