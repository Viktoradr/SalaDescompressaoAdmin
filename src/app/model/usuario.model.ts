import { Produto } from "./produto.model";
import { Room } from "./room.model";

export class Usuario {
    _id: string;
    nome: string;
    cpf: string;
    imagemPath: string;
    ativo: boolean;
    permissao: number;
    tipo: string;
    produtos: Array<Produto>;
    total: string;
    room: Room;
    justificativa: string;
    
    constructor(){
        this.ativo = true;
        this.produtos = new Array<Produto>();
        this.room = new Room();
    }
}