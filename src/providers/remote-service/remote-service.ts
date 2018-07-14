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
    console.log("Funciona porra!!!")
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    console.log(this.contatoUrl + "?Id=" + Id);
    return this.http.get(this.contatoUrl + "?Id=" + Id)
      .map(this.extractData)
      .catch(this.handleError);
  }
  //Update Contato
  updateContato(Contato: Contato): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.contatoUrl + "?Id=" + Contato.Id, Contato, options)
      .map(success => success.status)
      .catch(this.handleError);
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

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
// import 'rxjs/add/operator/map';

// @Injectable()
// export class RemoteServiceProvider {

//   data: any;
//   url: string = "http://localhost:3000/contatos";
//   constructor(public http: Http) { }

//   getContatos() {
//     if (this.data) {
//       return Promise.resolve(this.data);
//     }

//     return new Promise(resolve => {
//       this.http
//         .get(this.url)
//         .map(res => res.json())
//         .subscribe(data => {
//           this.data = data;
//           resolve(this.data);
//         });
//     });

//   }

//   getContatoById(Id) {
//     return new Promise(resolve => {
//       this.http
//         .get('http://localhost:3000/contatos?Id='+ Id)
//         .map(res => res.json())
//         .subscribe(data => {
//           this.data = data;          
//           resolve(this.data);
//         });
//     });
//   }
// }
