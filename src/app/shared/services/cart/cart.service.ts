import { Injectable } from '@angular/core';
import { ApiProvider } from '../../providers/api/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Filtro } from 'src/app/model/filtro.model';
import { Cart } from 'src/app/model/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _CONTROLLER = 'Cart';
  private _METHOD = {
    _registrarCompra: 'RegistrarCompra',
    _filtroCompra: 'FiltroCompra',
    _produtosMaisVendidosMes: 'ProdutosMaisVendidosMes',
    _gerarDocumentos: 'GerarDocumentos',
    _gerarDocumentosExcel: 'GerarDocumentosExcel',
    _relatorioDeCompras: 'RelatorioDeCompras'
  };

  constructor(
    private http: HttpClient,
    private api: ApiProvider
  ) { }

  registrarCompra(cart: Cart) {
    return this.http.post(this.api.request(this._CONTROLLER, this._METHOD._registrarCompra), cart);
  }

  filtroCompra(filtro: Filtro) {
    return this.http.post(this.api.request(this._CONTROLLER, this._METHOD._filtroCompra), filtro);
  }

  produtosMaisVendidosMes() {
    return this.http.get(this.api.request(this._CONTROLLER, this._METHOD._produtosMaisVendidosMes));
  }

  gerarDocumentos(filtro: Filtro) {
    //return this.http.post(this.api.request(this._CONTROLLER, this._METHOD._gerarDocumentos), filtro);
    return this.http.post(this.api.request(this._CONTROLLER, this._METHOD._gerarDocumentos), 
    filtro, { responseType: 'arraybuffer'});
  }

  exportarExcel(filtro: Filtro) {
    let hash = btoa(JSON.stringify(filtro));
        
    return this.http.get(this.api.request(this._CONTROLLER, this._METHOD._gerarDocumentosExcel, { param: hash }), {
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream',
      }), responseType: 'blob'
    });
  }

  relatorioDeCompras(filtro: any) {
    return this.http.post(this.api.request(this._CONTROLLER, this._METHOD._relatorioDeCompras), filtro);
  }
}
