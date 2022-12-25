import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  private API_SERVER = "http://localhost:8080/sede/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllSedes(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }
}
