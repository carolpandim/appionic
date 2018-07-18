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
  createContato(contato: Contato): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    let body = JSON.stringify(contato);
    console.log("body: " + body)
    return this.http.post(this.contatoUrl, body, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  //Fetch Contato by id
  getContatoById(id: Number): Observable<Contato> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.get(this.contatoUrl + "?id=" + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //Update Contato
  updateContato(contato: Contato): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    let body = JSON.stringify(contato);
    return this.http.put(this.contatoUrl + "/" + contato.id, body, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  //Delete Contato	
  deleteContatoById(id: Number): Observable<Contato> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.contatoUrl + "/" + id)
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