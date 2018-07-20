import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Component, OnInit } from '@angular/core';
import { ModalContatoPage } from '../modalcontato/modalcontato';
import { ModalCreateContatoPage } from '../modalcreatecontato/modalcreatecontato';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Contato } from '../../models/contato';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})

export class ContatoPage implements OnInit {
  //Component properties
  allContatos: Contato[];
  statusCode: number;
  requestProcessing = false;
  contatoIdToUpdate = null;
  processValidation = false;

  contatoForm = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    empresa: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required)
  });
  //Create constructor to get service instance
  constructor(
    private contatoService: RemoteServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {
  }

  //Create ngOnInit() and and load contatos
  ngOnInit(): void {
    this.getAllContatos();
  }
  //Fetch all contatos
  getAllContatos() {
    console.log("passei pelo get all Contatos")
    this.contatoService.getAllContatos()
      .subscribe(
        data => this.allContatos = data,
        errorCode => this.statusCode = errorCode);
  }

  //Delete contato
  deleteContato(contatoId: Number) {
    this.preProcessConfigurations();
    this.contatoService.deleteContatoById(contatoId)
      .subscribe(successCode => {
        //this.statusCode = successCode;
        //Expecting success code 204 from server
        this.statusCode = 204;
        this.getAllContatos();
      },
        errorCode => this.statusCode = errorCode);
  }

  openModal(id) {
    let modal = this.modalCtrl.create(ModalContatoPage, { id: id });
    modal.onDidDismiss(() => {
      this.getAllContatos();
    });
    modal.present();
  }

  createEditModal(id) {
    let modal = this.modalCtrl.create(ModalCreateContatoPage, { id: id });
    modal.onDidDismiss(() => {
      this.getAllContatos();
    });
    modal.present();
  }
    //Perform preliminary processing configurations
    preProcessConfigurations() {
      this.statusCode = null;
      this.requestProcessing = true;
    }

}
