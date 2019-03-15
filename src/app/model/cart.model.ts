import { Usuario } from "./usuario.model";
import { Produto } from "./produto.model";

export class Cart {
    _id: string;
    dataCompra: string;
    qtdItens: string;
    total: any;
    usuario: Usuario;
    produtos: Array<Produto>;

    constructor() {
        this.usuario = new Usuario();
        this.produtos = new Array<Produto>();
    }
}