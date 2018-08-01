import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { ModalProdutoPage } from '../modalproduto/modalproduto';
import { ModalCreateProdutoPage } from '../modalcreateproduto/modalcreateproduto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { Produto } from '../../models/produto';

@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage implements OnInit {
  allProdutos: Produto[];
  statusCode: number;
  requestProcessing = false;
  contatoIdToUpdate = null;
  processValidation = false;

  produtoForm = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required)
  });

  constructor(
    private produtoService: ProdutoServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
  }
  ngOnInit(): void {
    this.getAllProdutos();
  }

  getAllProdutos() {
    console.log("passei pelo get all Produtos")
    this.produtoService.getAllProdutos()
      .subscribe(
        data => this.allProdutos = data,
        errorCode => this.statusCode = errorCode);
  }

  deleteProduto(produtoId: Number) {
    console.log("im here")
    this.preProcessConfigurations();
    this.produtoService.deleteProdutoById(produtoId)
      .subscribe(successCode => {
        this.statusCode = 204;
        this.getAllProdutos();
      },
        errorCode => this.statusCode = errorCode);
  }

  openModal(id) {
    let modal = this.modalCtrl.create(ModalProdutoPage, { id: id });
    modal.onDidDismiss(() => {
      this.getAllProdutos();
    });
    modal.present();
  }

  createEditModal(id) {
    let modal = this.modalCtrl.create(ModalCreateProdutoPage, { id: id });
    modal.onDidDismiss(() => {
      this.getAllProdutos();
    });
    modal.present();
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
}
