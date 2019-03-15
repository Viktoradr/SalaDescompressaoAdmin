import { Injectable } from '@angular/core';
import { ApiProvider } from '../../providers/api/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _CONTROLLER = 'Dashboard';
  private _METHOD = {
    _widgetProdutos: 'WidgetProdutos',
    _widgetEstoque: 'WidgetEstoque',
    _widgetCart: 'WidgetCart',
  };

  constructor(
    private http: HttpClient,
    private api: ApiProvider
  ) { }

  widgetProdutos() {
    return this.http.get(this.api.request(this._CONTROLLER, this._METHOD._widgetProdutos));
  }

  widgetEstoque() {
    return this.http.get(this.api.request(this._CONTROLLER, this._METHOD._widgetEstoque));
  }

  widgetCart() {
    return this.http.get(this.api.request(this._CONTROLLER, this._METHOD._widgetCart));
  }
}
