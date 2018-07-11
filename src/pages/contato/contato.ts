import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { ModalContatoPage } from '../modalcontato/modalcontato';

@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})

export class ContatoPage {
  public listaContatos = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private service: RemoteServiceProvider,
    public modalCtrl: ModalController) {
    this.getContatos();

  }

  getContatos() {
    this.service.getContatos()
      .then(data => this.listaContatos = data)
  }

  openModal(Id) {
    let modal = this.modalCtrl.create(ModalContatoPage, {Id:Id});
    modal.present();
  }
}
