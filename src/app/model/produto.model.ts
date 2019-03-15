export class Produto {
    _id: string;
    nome: string;
    descricao: string;
    imagemPath: string;
    imagemNome: string;
    quantidade: number;
    valorUnidade: string;
    estoque: number;
    isOver: boolean;
    isAdd: boolean;
    isActive: boolean;
    file: any;

    constructor() {
        this.isActive = true;
        this.quantidade = 0;
        this.valorUnidade = "0,00";
    }
}