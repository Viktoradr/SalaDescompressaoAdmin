import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../shared/services/usuario/usuario.service';
import { Usuario } from '../model/usuario.model';
import { take } from 'rxjs/operators';
import { DataProvider } from '../shared/providers/api/data';
import { MASKS } from '../app.mask';
import { MESSAGES } from '../app.messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  mask = MASKS.cpfMask;
  msgErro: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private data: DataProvider,
  ) {
    
  }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  entrar() {
    this.msgErro = '';

    if (this.usuario.cpf != '') {

      //const _cpf = this.usuario.cpf.replace('.','').replace('.','').replace('-','');
      
      this.isLoading = true;

      this.usuarioService.autenticarAdmin(this.usuario)
        .pipe(take(1))
        .subscribe((res: Usuario) => {

          this.data.clearUser();

          if (res != null) { 
            this.usuario = res;
            //this.usuario.cpf = this.usuario.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
            this.data.setUser(this.usuario);

            this.isLoading = false;

            this.router.navigateByUrl('/Admin');
          } else this.msgErro = MESSAGES._cpf_invalido;
        }, err => { 
          this.isLoading = false;
          this.msgErro = MESSAGES._erro;
        });
    } else {
      this.msgErro = MESSAGES._cpf_em_branco;
    }
  }

}
