import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Contato } from '../../models/contato';

@Injectable()
export class RemoteServiceProvider {
  //URL for CRUD operations
  contatoUrl = "http://localhost:3000/contatos";
  //Create constructor to get Http instance
  constructor(private http: Http) {
  }
  //Fetch all Contatos
  getAllContatos(): Observable<Contato[]> {
    return this.http.get(this.contatoUrl)
      .map(this.extractData)
      .catch(this.handleError);

  }
  //Create Contato
  createContato(Contato: Contato): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.contatoUrl, Contato, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  //Fetch Contato by id
  getContatoById(Id: string): Observable<Contato> {
    console.log("Funciona porra Id!!!" + Id)
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    console.log(this.contatoUrl + "?Id=" + Id);
    return this.http.get("http://localhost:3000/contatos?Id=1")
      .map(this.extractData)
      .catch(this.handleError);
  }
  //Update Contato
  updateContato(Contato: Contato): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    let json = JSON.stringify(
      {
        Id: Contato.Id,
        Nome: Contato.Nome,
        Empresa: Contato.Empresa,
        Telefone: Contato.Telefone,
        Img: Contato.Img,
        Produtos: Contato.Produtos
      });
    return this.http.put("http://localhost:3000/contatos", json, options)
      .map(success => success.status)
      .catch(this.handleError);

    // console.log("updatecontato: "+ Contato.Telefone)
    // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: cpHeaders });
    // return this.http.put("http://localhost:3000/contatos?Id=1", Contato, options)
    // // return this.http.put(this.contatoUrl + "?Id=" + Contato.Id + 
    // //                                       "&Nome=" + Contato.Nome +
    // //                                       "&Empresa=" + Contato.Empresa +
    // //                                       "&Telefone=" + Contato.Telefone +
    // //                                       "&Img=" + Contato.Img 
    // //                                       ,Contato, options)
    //   .map(success => success.status)
    //   .catch(this.handleError);
  }

  //Delete Contato	
  deleteContatoById(Id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.contatoUrl + "?Id=" + Id)
      .map(success => success.status)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}