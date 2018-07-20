import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Component, OnInit } from '@angular/core';
import { ProdutoPage } from '../produto/produto';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { Produto } from '../../models/produto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  //Component properties
  allProdutos: Produto[];
  statusCode: number;

  //Create constructor to get service instance
  constructor(
    private produtoService: ProdutoServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  //Create ngOnInit() and and load produtos
  ngOnInit(): void {
    this.getAllProdutos();
  }
  //Fetch all produtos
  getAllProdutos() {
    console.log("passei pelo get all Produtos")
    this.produtoService.getAllProdutos()
      .subscribe(
        data => this.allProdutos = data,
        errorCode => this.statusCode = errorCode);
  }

  navigateProduto(id) {
    this.navCtrl.push(ProdutoPage, {
      id: id
    })
  }
}

