import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ContatoProduto } from '../../models/contatoproduto';

@Injectable()
export class ContatoProdutoServiceProvider {
  //URL for CRUD operations
  contatoprodutoUrl = "http://localhost:3000/contatoproduto";
  //Create constructor to get Http instance
  constructor(private http: Http) {
  }

  //Fetch all Produtos
  // getAllContatoProduto(): Observable<ContatoProduto[]> {
  //   return this.http.get(this.contatoprodutoUrl)
  //     .map(this.extractData)
  //     .catch(this.handleError);

  // }

  //Create Produto
  // createProduto(produto: Produto): Observable<number> {
  //   let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: cpHeaders });
  //   let body = JSON.stringify(produto);
  //   console.log("body: " + body)
  //   return this.http.post(this.produtoUrl, body, options)
  //     .map(success => success.status)
  //     .catch(this.handleError);
  // }

  //Fetch Produto by id
  getProdutoByContato(id: Number): Observable<ContatoProduto[]> {
    console.log("Estou no serviço contatoProduto e o id:" + id)
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.get(this.contatoprodutoUrl + "?idcontato=" + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //Update Produto 
  // updateProduto(produto: Produto): Observable<number> {
  //   let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: cpHeaders });
  //   let body = JSON.stringify(produto);
  //   return this.http.put(this.produtoUrl + "/" + produto.id, body, options)
  //     .map(success => success.status)
  //     .catch(this.handleError);
  // }

  //Delete Produto	
  // deleteProdutoById(id: Number): Observable<Produto> {
  //   let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: cpHeaders });
  //   return this.http.delete(this.produtoUrl + "/" + id)
  //     .map(success => success.status)
  //     .catch(this.handleError);
  // }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
