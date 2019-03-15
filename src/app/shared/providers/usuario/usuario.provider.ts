import { Injectable, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioProvider {

    @Output() _usuario = new EventEmitter<Usuario>();

    constructor() { }

    eventProduto(usuario: Usuario) {
        this._usuario.emit(JSON.parse(JSON.stringify(usuario)));
    }

}