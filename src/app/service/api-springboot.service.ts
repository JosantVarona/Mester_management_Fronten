import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Client } from '../../model/clients';

@Injectable({
  providedIn: 'root'
})
export class ApiSpringbootService {

  URL = "http://localhost:8080"

  constructor(private http: HttpClient) { }


  public getAllClients(){
    return this.http.get<any>(`${this.URL}/client`)
    .pipe(map(data => {
      return data;
    }));
  }
  public addClient(client: Client){
    return this.http.post<any>(`${this.URL}/client`, client);
  }
}
