import { Component, OnInit } from '@angular/core';
import { NavParams, Platform, ViewController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { ContatoProdutoServiceProvider } from '../../providers/contato-produto-service/contato-produto-service';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service'
import { Contato } from '../../models/contato'
import { ContatoProduto } from '../../models/contatoproduto'
import { Produto } from '../../models/produto'

@Component({
  selector: 'page-modalcontato',
  templateUrl: 'modalcontato.html',
})

export class ModalContatoPage implements OnInit {
  public contatoId: any;
  public obg: any;
  public contato: Contato;

  public contatoProdutos: ContatoProduto[];
  statusCode: number;

  produto: Produto;
  produtos: Produto[];

  constructor(public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private service: RemoteServiceProvider,
    private contatoProdutoService: ContatoProdutoServiceProvider,
    private produtoService: ProdutoServiceProvider
  ) {
    this.contatoId = params.get("id");
  }

  ngOnInit(): void {

    console.log("ModalContatoPage contatoId " + this.contatoId);

    this.getContatoById();
    
    this.getProdutoByContato();

    console.log(this.contatoProdutos)

    if (this.contatoProdutos != undefined && this.contatoProdutos.length > 0) {
      for (let element of this.contatoProdutos) {
        this.produtoService.getProdutoById(element.idproduto)
          .subscribe(data => {
            this.obg = data;
            this.produto = new Produto(
              this.obg.map(o => o.id),
              String(this.obg.map(o => o.nome)),
              String(this.obg.map(o => o.descricao)),
              String(this.obg.map(o => o.img)))
          })
        this.produtos.push(this.produto);
      }
    }
  }

  getContatoById() {
    this.service.getContatoById(this.contatoId)
      .subscribe(data => {
        this.obg = data;
        this.contato = new Contato(
          this.obg.map(o => o.id),
          String(this.obg.map(o => o.nome)),
          String(this.obg.map(o => o.telefone)),
          String(this.obg.map(o => o.empresa)),
          String(this.obg.map(o => o.img)));
      });
  }

  getProdutoByContato() {
    this.contatoProdutoService.getProdutoByContato(this.contatoId)
      .subscribe(
        data => this.contatoProdutos = data,
        errorCode => this.statusCode = errorCode
      );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}