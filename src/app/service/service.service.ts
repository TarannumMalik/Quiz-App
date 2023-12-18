import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor( private http:HttpClient) { }
  getQuestion(){
    return this.http.get<any>("assets/question.json")
  }
}
