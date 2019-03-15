import { Injectable, Output, EventEmitter } from '@angular/core';
import { Produto } from 'src/app/model/produto.model';

@Injectable({
    providedIn: 'root'
})
export class ProdutoProvider {

    @Output() _produto = new EventEmitter<Produto>();

    constructor() { }

    eventProduto(produto: Produto) {
        this._produto.emit(JSON.parse(JSON.stringify(produto)));
    }

}