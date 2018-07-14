import { Component } from '@angular/core';
import { NavParams, Platform, ViewController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Contato } from '../../models/contato'
import { Produto } from '../../models/produto'

@Component({
  selector: 'page-modalcreatecontato',
  templateUrl: 'modalcreatecontato.html',
})
export class ModalCreateContatoPage {
  public contatoId: any;
  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private service: RemoteServiceProvider) {
    this.contatoId = params.get("Id");
    console.log("ModalCreateContatoPage passei aqui" + this.contatoId);
  
  }

}
