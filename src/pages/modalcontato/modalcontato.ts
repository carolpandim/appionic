import { Component } from '@angular/core';
import { NavParams, Platform, ViewController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Contato } from '../../models/contato'

@Component({
  selector: 'page-modalcontato',
  templateUrl: 'modalcontato.html',
})

export class ModalContatoPage {
  public contatoId: any;
  public obg: any;
  public contato: Contato;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private service: RemoteServiceProvider) {
    this.contatoId = params.get("id");
    console.log("ModalContatoPage contatoId " + this.contatoId);
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

  dismiss() {
    this.viewCtrl.dismiss();
  }
}