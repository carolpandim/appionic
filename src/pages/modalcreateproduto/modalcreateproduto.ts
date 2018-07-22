import { NavController, NavParams, ModalController,ViewController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { Produto } from '../../models/produto';

@Component({
  selector: 'page-modalcreateproduto',
  templateUrl: 'modalcreateproduto.html',
})
export class ModalCreateProdutoPage implements OnInit {
  public produtoId: any;
  public obg: any;
  public produto: Produto;
 
  //Component properties
  statusCode: number;
  requestProcessing = false;
  produtoIdToUpdate = null;
  processValidation = false;
  
  //Create form
  produtoForm = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required)
  });
  //Create constructor to get service instance
  constructor(
    private produtoService: ProdutoServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    this.produtoId = navParams.get("id");

  }

  //Create ngOnInit() and and load produtos
  ngOnInit(): void {
    console.log("estou no ngOnInit this.produtoId " + this.produtoId)
    if (this.produtoId != 0) {
      this.loadProdutoToEdit(this.produtoId);
    }
  }

  //Load produto by id to edit
  loadProdutoToEdit(produtoId: Number) {
    console.log("cheguei no loadprodutoToEdit produtoId: " + produtoId)
    this.preProcessConfigurations();
    this.produtoService.getProdutoById(produtoId)
      .subscribe(data => {
        this.obg = data;
        this.produtoIdToUpdate = this.obg.map(o => o.id)
        this.produtoForm.setValue({
          id: this.obg.map(o => o.id),
          nome: String(this.obg.map(o => o.nome)),
          descricao: String(this.obg.map(o => o.descricao)),
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
  //Handle create and update produto
  onProdutoFormSubmit() {
    console.log("Entrei em onProdutoFormSubmit")
    this.processValidation = true;
    console.log("this.produtoForm.invalid: " + this.produtoForm.invalid)
    if (this.produtoForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    this.preProcessConfigurations();
    let produto = this.produtoForm.value;
    console.log("produtoForm que foi capturado: " + produto)
    console.log("this.produtoIdToUpdate: " + this.produtoIdToUpdate)
    if (this.produtoIdToUpdate === null) {
      //Generate produto id then create produto
      this.produtoService.getAllProdutos()
        .subscribe(produtos => {

          //Generate produto id	 
          let maxIndex = produtos.length - 1;
          let produtoWithMaxIndex = produtos[maxIndex];
          let produtoId = Number(produtoWithMaxIndex.id) + 1;
          produto.id = produtoId;
          console.log("produto.id NOVO" + produto.id)

          //Create produto
          this.produtoService.createProduto(produto)
            .subscribe(successCode => {
              this.statusCode = successCode;
              this.backToCreateproduto();
            },
              errorCode => this.statusCode = errorCode
            );
        });
    } else {
      //Handle update produto
      produto.id = this.produtoIdToUpdate;
      this.produtoService.updateProduto(produto)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.backToCreateproduto();
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
  backToCreateproduto() {
    this.produtoIdToUpdate = null;
    this.produtoForm.reset();
    this.processValidation = false;
  }
}