import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from '../../providers/api/api';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private _CONTROLLER = 'Historico';
  private _METHOD = {
    _getHistorico: 'GetHistorico',
  };

  constructor(
    private http: HttpClient,
    private api: ApiProvider
  ) { }

  getHistorico() {
    return this.http.get(this.api.request(this._CONTROLLER, this._METHOD._getHistorico));
  }
}
