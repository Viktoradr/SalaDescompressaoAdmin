import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { take } from 'rxjs/operators';
import { UsuarioProvider } from 'src/app/shared/providers/usuario/usuario.provider';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: Array<Usuario>;
  navigated: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private usuarioProvider: UsuarioProvider,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.usuarios = new Array<Usuario>();
  }

  ngOnInit() {
    this.popularTabela();

    this.usuarioProvider._usuario
      .subscribe((res: Usuario) => {
        let index = this.usuarios.findIndex(x => x._id == res._id);
 
        if(index != -1) {
          this.usuarios[index] = res;
        }
        else this.usuarios.push(res);
      });
  }

  popularTabela() {
    this.usuarioService.getUsuarios()
      .pipe(take(1))
      .subscribe((res: Array<Usuario>) => {
        this.usuarios = res;
        console.log(res)
      }, err => {

      });
  }

  editarUsuario(usuario: Usuario) {
    this.navigated = true;
    this.router.navigate(['Editar', usuario._id], { relativeTo: this.route });
  }

  novoUsuario() {
    this.navigated = true;
    this.router.navigate(['Novo'], { relativeTo: this.route });
  }

}
