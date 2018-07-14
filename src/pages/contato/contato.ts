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
              this.getAllContatos();
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
          this.getAllContatos();
          this.backToCreateContato();
        },
          errorCode => this.statusCode = errorCode);
    }
  }
  //Load contato by id to edit
  loadContatoToEdit(contatoId: string) {
    this.preProcessConfigurations();
    this.contatoService.getContatoById(contatoId)
      .subscribe(contato => {
        this.contatoIdToUpdate = contato.Id;
        this.contatoForm.setValue({
          Nome: contato.Nome,
          Empresa: contato.Empresa,
          Telefone: contato.Telefone,
          Img: contato.Img,
          Produtos: contato.Produtos
        });
        this.processValidation = true;
        this.requestProcessing = false;
      },
        errorCode => this.statusCode = errorCode);
  }
  //Delete contato
  deleteContato(contatoId: string) {
    this.preProcessConfigurations();
    this.contatoService.deleteContatoById(contatoId)
      .subscribe(successCode => {
        //this.statusCode = successCode;
        //Expecting success code 204 from server
        this.statusCode = 204;
        this.getAllContatos();
        this.backToCreateContato();
      },
        errorCode => this.statusCode = errorCode);
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

  openModal(Id) {
    let modal = this.modalCtrl.create(ModalContatoPage, { Id: Id });
    modal.present();
  }

  createEditModal(Id) {
    let modal = this.modalCtrl.create(ModalCreateContatoPage, { Id: Id });
    modal.present();
  }
  // showPrompt() {
  //   const prompt = this.alertCtrl.create({
  //     title: 'Login',
  //     message: "Enter a name for this new album you're so keen on adding",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Title'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           console.log('Saved clicked');
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }
}

 


// import { Component } from '@angular/core';
// import { NavController, NavParams, ModalController } from 'ionic-angular';
// import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
// import { ModalContatoPage } from '../modalcontato/modalcontato';

// @Component({
//   selector: 'page-contato',
//   templateUrl: 'contato.html',
// })

// export class ContatoPage {
//   public listaContatos = [];

//   constructor(public navCtrl: NavController,
//     public navParams: NavParams,
//     private service: RemoteServiceProvider,
//     public modalCtrl: ModalController) {
//     this.getAllContatos();

//   }

//   getAllContatos() {
//     this.service.getContatos()
//       .then(data => this.listaContatos = data)
//   }

//   openModal(Id) {
//     let modal = this.modalCtrl.create(ModalContatoPage, {Id:Id});
//     modal.present();
//   }
// }
