import { Component } from '@angular/core';
import { NavParams, Platform, ViewController } from 'ionic-angular';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { Produto } from '../../models/produto'

@Component({
  selector: 'page-modalproduto',
  templateUrl: 'modalproduto.html',
})
export class ModalProdutoPage {
  public produtoId: any;
  public obg: any;
  public produto: Produto;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private service: ProdutoServiceProvider) {
    this.produtoId = params.get("id");
    console.log("ModalProdutoPage produtoId " + this.produtoId);
    this.service.getProdutoById(this.produtoId)
    .subscribe(data => {
      this.obg = data;
      this.produto = new Produto(
        this.obg.map(o => o.id), 
        String(this.obg.map(o => o.nome)), 
        String(this.obg.map(o => o.descricao)), 
        String(this.obg.map(o => o.img)));
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}