import {Produto} from './produto'

export class Contato {
    constructor(
        public Id: String,
        public Nome: String,
        public Telefone?: String,
        public Empresa?: String,
        public Img?: String,
        public Produtos?: Produto[]
    ) { }
}
