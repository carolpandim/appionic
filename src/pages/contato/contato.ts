import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalContatoPage } from '../modalcontato/modalcontato';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Contato } from '../../models/contato';
import { Produto } from "../../models/produto"
import { ModalCreateContatoPage } from "../modalcreatecontato/modalcreatecontato"
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

  public Id: Number
  public Nome: String
  public Telefone?: String
  public Empresa?: String
  public Img?: String
  public Produtos?: Produto[]
  //Create form
  contatoForm = new FormGroup({
    Nome: new FormControl('', Validators.required),
    Telefone: new FormControl('', Validators.required),
    Empresa: new FormControl('', Validators.required),
    Img: new FormControl('', Validators.required),
    Produtos: new FormControl([], Validators.required
    )
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
  
  openModal(Id) {
    let modal = this.modalCtrl.create(ModalContatoPage, { Id: Id });
    modal.present();
  }

  createEditModal(Id) {
    let modal = this.modalCtrl.create(ModalCreateContatoPage, { Id: Id });
    modal.present();
  }
 
}
