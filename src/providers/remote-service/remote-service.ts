import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RemoteServiceProvider {

  data: any;
  url: string = "http://localhost:3000/contatos";
  constructor(public http: Http) { }
  
  getContatos() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http
        .get(this.url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  getContatoById(Id) {
    return new Promise(resolve => {
      this.http
        .get('http://localhost:3000/contatos?Id='+ Id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;          
          resolve(this.data);
        });
    });
  }
}
