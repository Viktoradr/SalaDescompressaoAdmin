import { Injectable } from '@angular/core';
import { ApiProvider } from '../../providers/api/api';
import { HttpClient } from '@angular/common/http';
import { Produto } from 'src/app/model/produto.model';
import { Usuario } from 'src/app/model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private _CONTROLLER = 'Produto';
  private _METHOD = {
    _getProdutos: 'GetProdutos',
    _getProdutoPorId: 'GetProdutoPorId',
    _alterarEstoque: 'AlterarEstoque',
    _editar: 'Editar',
    _add: 'Add',
  };

  constructor(
    private http: HttpClient,
    private api: ApiProvider
  ) { }

  getProdutos() {
    return this.http.get(this.api.request(this._CONTROLLER, this._METHOD._getProdutos));
  }

  getProduto(id: string) {
    return this.http.get(this.api.request(this._CONTROLLER, this._METHOD._getProdutoPorId, [id]));
  }

  editarProduto(produto: Produto) {
    return this.http.post(this.api.request(this._CONTROLLER, this._METHOD._editar), produto);
  }

  addProduto(produto: Produto) {
    return this.http.post(this.api.request(this._CONTROLLER, this._METHOD._add), produto);
  }

  alterarEstoque(usuario: Usuario) {
    return this.http.post(this.api.request(this._CONTROLLER, this._METHOD._alterarEstoque), usuario);
  }
}
