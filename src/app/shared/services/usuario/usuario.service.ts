import { Injectable } from '@angular/core';
import { ApiProvider } from '../../providers/api/api';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _CONTROLLER = 'Usuario';
  private _METHOD = {
    _getUsuario: 'GetUsuario',
    _getUsuarios: 'GetUsuarios',
    _getUsuarioPorId: 'GetUsuarioAdminPorId',
    _editar: 'Editar',
    _add: 'Add',
    _autenticarAdmin: 'AutenticarAdmin'
  };

  constructor(
    private http: HttpClient,
    private api: ApiProvider
  ) { }

  autenticarAdmin(usuario: Usuario) {
    return this.http.post(this.api.request(this._CONTROLLER, this._METHOD._autenticarAdmin), usuario);
  }

  getUsuario(cpf: string) {
    return this.http.get(this.api.request(this._CONTROLLER, this._METHOD._getUsuario, [cpf]));
  }

  getUsuarios() {
    return this.http.get(this.api.request(this._CONTROLLER, this._METHOD._getUsuarios));
  }

  getUsuarioAdmin(id: string) {
    return this.http.get(this.api.request(this._CONTROLLER, this._METHOD._getUsuarioPorId, [id]));
  }

  editarUsuarioAdmin(usuario: Usuario) {
    return this.http.post(this.api.request(this._CONTROLLER, this._METHOD._editar), usuario);
  }

  addUsuarioAdmin(usuario: Usuario) {
    return this.http.post(this.api.request(this._CONTROLLER, this._METHOD._add), usuario);
  }
}
