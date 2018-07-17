import { NavController, NavParams, ModalController,ViewController } from 'ionic-angular';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalContatoPage } from '../modalcontato/modalcontato';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Contato } from '../../models/contato';
import { Produto } from "../../models/produto"
// import { ModalCreateContatoPage } from "../modalcreatecontato/modalcreatecontato"
// import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-modalcreatecontato',
  templateUrl: 'modalcreatecontato.html',
})

export class ModalCreateContatoPage implements OnInit {
  public contatoId: any;
  public obg: any;
  public contato: Contato;

  //Component properties
  statusCode: number;
  requestProcessing = false;
  contatoIdToUpdate = null;
  processValidation = false;

  //Create form
  contatoForm = new FormGroup({
    Id: new FormControl('', Validators.required),
    Nome: new FormControl('', Validators.required),
    Telefone: new FormControl('', Validators.required),
    Empresa: new FormControl('', Validators.required),
    Img: new FormControl('', Validators.required),
    Produtos: new FormControl([])
  });
  //Create constructor to get service instance
  constructor(
    private contatoService: RemoteServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    this.contatoId = navParams.get("Id");
  }


  //Create ngOnInit() and and load contatos
  ngOnInit(): void {
    console.log("estou no ngOnInit this.contatoId " + this.contatoId)
    if (this.contatoId != 0) {
      this.loadContatoToEdit(this.contatoId);
    }
  }

  //Load contato by id to edit
  loadContatoToEdit(contatoId: string) {
    console.log("cheguei no loadContatoToEdit contatoId: " + contatoId)
    this.preProcessConfigurations();
    this.contatoService.getContatoById(contatoId)
      .subscribe(data => {
        this.obg = data;
        this.contatoIdToUpdate = this.obg.map(o => o.Id)
        this.contatoForm.setValue({
          Id: String(this.obg.map(o => o.Id)),
          Nome: String(this.obg.map(o => o.Nome)),
          Empresa: String(this.obg.map(o => o.Empresa)),
          Telefone: String(this.obg.map(o => o.Telefone)),
          Img: String(this.obg.map(o => o.Img)),
          Produtos: this.obg.map(o => o.Produtos)
        });
        this.processValidation = true;
        this.requestProcessing = false;
      },
      errorCode => this.statusCode = errorCode);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  //Handle create and update contato
  onContatoFormSubmit() {
    this.processValidation = true;
    if (this.contatoForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    this.preProcessConfigurations();
    let contato = this.contatoForm.value;
    if (this.contatoIdToUpdate === null) {
      //Generate contato id then create contato
      this.contatoService.getAllContatos()
        .subscribe(contatos => {

          //Generate contato id	 
          let maxIndex = contatos.length - 1;
          let contatoWithMaxIndex = contatos[maxIndex];
          let contatoId = Number(contatoWithMaxIndex.Id) + 1;
          contato.id = contatoId;

          //Create contato
          this.contatoService.createContato(contato)
            .subscribe(successCode => {
              this.statusCode = successCode;
              //  this.getAllContatos();
              this.backToCreateContato();
            },
              errorCode => this.statusCode = errorCode
            );
        });
    } else {
      //Handle update contato
      contato.Id = this.contatoIdToUpdate;
      this.contatoService.updateContato(contato)
        .subscribe(successCode => {
          this.statusCode = successCode;
          // this.getAllContatos();
          this.backToCreateContato();
        },
          errorCode => this.statusCode = errorCode);
    }
  }




  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  //Go back from update to create
  backToCreateContato() {
    this.contatoIdToUpdate = null;
    this.contatoForm.reset();
    this.processValidation = false;
  }
}