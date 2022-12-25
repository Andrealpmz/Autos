import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

 private API_SERVER = "http://localhost:8080/vendedor/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllVendedor(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveVendedor(vendedor:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,vendedor);
  }

  public deleteVendedor(id: string): Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+ id);
  }

} 
