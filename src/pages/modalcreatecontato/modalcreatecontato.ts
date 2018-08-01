import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Contato } from '../../models/contato';


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
  
<<<<<<< HEAD
  filesToUpload: Array<File>;

=======
>>>>>>> 53ac6eca77c1868be1f7d5e8b71b53872b7a7c61
  //Create form
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
    public viewCtrl: ViewController
  ) {
    this.contatoId = navParams.get("id");
<<<<<<< HEAD
    this.filesToUpload = [];
=======

>>>>>>> 53ac6eca77c1868be1f7d5e8b71b53872b7a7c61
  }

  //Create ngOnInit() and and load contatos
  ngOnInit(): void {
    console.log("estou no ngOnInit this.contatoId " + this.contatoId)
    if (this.contatoId != 0) {
      this.loadContatoToEdit(this.contatoId);
    }
  }

  upload() {
    this.makeFileRequest("http://localhost:3000/modalcreatecontato", [], this.filesToUpload).then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }

  //Load contato by id to edit
  loadContatoToEdit(contatoId: Number) {
    console.log("cheguei no loadContatoToEdit contatoId: " + contatoId)
    this.preProcessConfigurations();
    this.contatoService.getContatoById(contatoId)
      .subscribe(data => {
        this.obg = data;
        this.contatoIdToUpdate = this.obg.map(o => o.id)
        this.contatoForm.setValue({
          id: this.obg.map(o => o.id),
          nome: String(this.obg.map(o => o.nome)),
          empresa: String(this.obg.map(o => o.empresa)),
          telefone: String(this.obg.map(o => o.telefone)),
          img: String(this.obg.map(o => o.img))
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
    console.log("Entrei")
    this.processValidation = true;
    console.log("this.contatoForm.invalid: " + this.contatoForm.invalid)
    if (this.contatoForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    this.preProcessConfigurations();
    let contato = this.contatoForm.value;
    console.log("contatoForm que foi capturado: " + contato)
    console.log("this.contatoIdToUpdate: " + this.contatoIdToUpdate)
    if (this.contatoIdToUpdate === null) {
      //Generate contato id then create contato
      this.contatoService.getAllContatos()
        .subscribe(contatos => {

          //Generate contato id	 
          let maxIndex = contatos.length - 1;
          let contatoWithMaxIndex = contatos[maxIndex];
          let contatoId = Number(contatoWithMaxIndex.id) + 1;
          contato.id = contatoId;
          console.log("contato.id NOVO" + contato.id)

          //Create contato
          this.contatoService.createContato(contato)
            .subscribe(successCode => {
              this.statusCode = successCode;
              this.backToCreateContato();
            },
              errorCode => this.statusCode = errorCode
            );
        });
    } else {
      //Handle update contato
      contato.id = this.contatoIdToUpdate;
      this.contatoService.updateContato(contato)
        .subscribe(successCode => {
          this.statusCode = successCode;
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
