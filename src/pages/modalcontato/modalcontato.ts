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
  public contatoId: any;
  public obg: any;
  public contato: Contato;
  public produtos: Produto[];

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private service: RemoteServiceProvider) {
    this.contatoId = params.get("Id");
    console.log("ModalContatoPage contatoId " + this.contatoId);
    this.service.getContatoById(this.contatoId)
    .subscribe(data => {
      this.obg = data;
      this.produtos = this.obg.map(o => o.Produtos);
      this.contato = new Contato(
        String(this.obg.map(o => o.Id)), 
        String(this.obg.map(o => o.Nome)), 
        String(this.obg.map(o => o.Telefone)), 
        String(this.obg.map(o => o.Empresa)), 
        String(this.obg.map(o => o.Img)), 
        this.produtos);
    });

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}