import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Client } from '../../model/clients';
import { User } from '../../model/user';
import { Center } from '../../model/center';

@Injectable({
  providedIn: 'root'
})
export class ApiSpringbootService {

  URL = "http://localhost:8080"



  constructor(private http: HttpClient) { }

  //Obtenemos todos los clientes
  public getAllClients(){
    return this.http.get<any>(`${this.URL}/client`)
    .pipe(map(data => {
      return data;
    }));
  }
  // Metodo para obtener los centos del cliente
  public getCenterbyClient(id_client: number){
    return this.http.get<any>(`${this.URL}/client/${id_client}`)
    .pipe(map(data => {
      return data;
    }));
  }
  
  // Metodo que insertamos cliente nuevo
  public addClient(client: Client){
    return this.http.post<any>(`${this.URL}/client`, client);
  }

  // Metodo para añadir centro 
  public addCenter(id_client:number, center:Center){
    return this.http.post<any>(`${this.URL}/client/${id_client}/center`, center);
  }

  // Metodo para obtener actividades del centro 
  public getActivitybyCenter(id_center: number){
    return this.http.get<any>(`${this.URL}/center/${id_center}`)
    .pipe(map(data => {
      return data;
    }));
  }

  // Metodo para registrar usuario
  public regisUser(user: User){
    return this.http.post(`${this.URL}/user/insert`, user, { responseType: 'text' });
  }
  // Metodo para loguear un usuario
  public loginUser (email: string){
    return this.http.get<any>(`${this.URL}/user/findemail/${email}`)
    .pipe(map(data => {
      return data;
    }));
  }

  //Metod para obtener todos los usuario
  public getAllUsers(){
    return this.http.get<any>(`${this.URL}/user`)
    .pipe(map(data => {
      return data;
    }));
  }
  // Metodo para obtener un usuario por id
  public getUserbyId(id: number){
    return this.http.get<any>(`${this.URL}/user/${id}`)
    .pipe(map(data => {
      return data;
    }));
  }
  
}
