import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { DataProvider } from './data';

@Injectable({
    providedIn: 'root'
})
export class ApiProvider {

    constructor(
        private data: DataProvider
    ) { }

    request(controller: string, route: string, params?: any) {
        let _url = environment.baseUrl + controller + '/' + route;
        return this.getParams(_url, params);
    }

    getParams(endpoint: string, params?: any) {
        for (let k in params) {
            endpoint += `/${params[k]}`; 
        };
        return endpoint;
    }

    getHeader() {
        const _usuario: any = this.data.getUser();
        let headers = {
            headers: new HttpHeaders()
                .set('Authorization', _usuario.Token)
                .set('Content-Type', 'application/json')
        };
        return headers;
    }

    getAutorization() {
        const _usuario: any = this.data.getUser();
        return _usuario.Token;
    }
}