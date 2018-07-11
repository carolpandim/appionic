import { Component } from '@angular/core';
import { NavParams, Platform, ViewController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Contato } from '../../models/contato'
import { Produto } from '../../models/produto'

@Component({
  selector: 'page-modalcontato',
  templateUrl: 'modalcontato.html',
})

export class ModalContatoPage {
  public Id: any;
  public obg: any;
  public pdt: any;
  public contato: Contato;
  public produto: Produto;
  public produtos: Produto[];

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private service: RemoteServiceProvider) {
    this.Id = Number(params.get("Id"));
    console.log("passei aqui" + this.Id);

    this.service.getContatoById(this.Id).then(data => {
      this.obg = data;
      this.produtos = this.obg.map(o => o.Produtos);
      console.log(this.produtos)
      // if (this.pdt.length > 0) {
      //   this.pdt.forEach(function (item) {
      //     this.produto = new Produto(
      //       item.Id,
      //       item.Nome,
      //       item.Descricao
      //     );
      //     this.produtos.push(this.produto);
      //   });
      //}

      this.contato = new Contato(
        Number(this.obg.map(o => o.Id)), 
        String(this.obg.map(o => o.Nome)), 
        String(this.obg.map(o => o.Telefone)), 
        String(this.obg.map(o => o.Empresa)), 
        String(this.obg.map(o => o.Img)), 
        this.produtos);
        
      console.log("É agora")
      console.log(this.contato);
    });

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}