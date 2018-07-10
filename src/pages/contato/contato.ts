import { Component } from '@angular/core';
import { NavController, NavParams, ModalController  } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { ModalContatoPage } from '../modalcontato/modalcontato';

@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})

export class ContatoPage {
  listaContatos = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private service: RemoteServiceProvider,
    public modalCtrl: ModalController) {
    this.getContatos();
    
  }

  getContatos(): void {
    this.service.getContatos()
      .subscribe(data => this.listaContatos = data);
  }

  openModal(characterNum) {
    console.log(characterNum)
    let modal = this.modalCtrl.create(ModalContatoPage, characterNum);
    modal.present();
  }
}
