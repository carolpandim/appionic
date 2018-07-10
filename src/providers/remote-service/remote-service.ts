import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RemoteServiceProvider {

  url: string = "http://localhost:3000/contatos";
  constructor(public http: Http) { }
  
  getContatos() {
    return this.http.get(this.url)
      .map((res: Response) => res.json());

  }
}
