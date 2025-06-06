import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Client } from '../../model/clients';
import { User } from '../../model/user';
import { Center } from '../../model/center';
import { Activity } from '../../model/activity';

@Injectable({
  providedIn: 'root'
})
export class ApiSpringbootService {

  URL = "http://localhost:8080"

  jsreport = "http://localhost:5488/api/report";



  constructor(private http: HttpClient) { }

  //#region CLIENTES

  //Obtenemos todos los clientes
  public getAllClients(level: number){
    return this.http.get<any>(`${this.URL}/client/bylevel/${level}`)
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
  // Metodo para actualizar cliente
  public updateClient(id: number, client: Client) {
    return this.http.put<any>(`${this.URL}/client/update_client/${id}`, client);
  }
  // Metodo para archivar cliente
  public archiveClient(id: number, state:number) {
    return this.http.put<any>(`${this.URL}/client/archive/${id}/${state}`, null);
  }

  // Metodo para eliminar cliente
  public deleteClient(id: number) {
    return this.http.delete<any>(`${this.URL}/client/delete/${id}`);
  }
  //#endregion CLIENTES
  //#region CENTER

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
  // Metodo para archivar centro
  public archiveCenter(id: number, state:number) {
    return this.http.put<any>(`${this.URL}/center/archive/${id}/${state}`, null);
  }
  // Metodo para Actualizar Centro
  public updateCenter(id: number, center: Center) {
    return this.http.put<any>(`${this.URL}/center/update_center/${id}`, center);
  }
  // Metodo para eliminar centro
  public deleteCenter(id: number) {
    return this.http.delete<any>(`${this.URL}/center/delete/${id}`);
  }

  //#endregion CENTER
  //#region USER

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
  // Metodo para actualizar un usuario
  public UpdateUser(id: number, user: User) {
    return this.http.put<any>(`${this.URL}/user/update_user/${id}`, user);
  }
  // Metodo para cambiar el estado de un usuario
  public Userstate(id: number, state: String) {
    return this.http.put<any>(`${this.URL}/user/state_user/${id}/${state}`, null);
  }

  // Metodo para recuperar el password del usuario
public recoverPassword(email: string): Promise<any> {
  return firstValueFrom(this.http.post(`${this.URL}/user/recuperar/${email}`, null, { responseType: 'text' }));
}
public deleteUser(id: number) {
  return this.http.delete<any>(`${this.URL}/user/delete/${id}`);
}


  //#endregion USER
  //#region ACTIVIDAD

  // Metodo para insertar Actividad
  public addActivity(id_center: number, id_user: number, activity: Activity){
    return this.http.post<any>(`${this.URL}/center/${id_center}/${id_user}/activity`, activity);
  }
  // Metodo para Actualizar Actividad
  public updateActivity(id: number, activity: Activity) {
    return this.http.put<any>(`${this.URL}/activity/update_activity/${id}`, activity);
  }
  // Metodo para archivar Actividad
  public archiveActivity(id: number, state:number) {
    return this.http.put<any>(`${this.URL}/activity/archive/${id}/${state}`, null);
  }
  // Metodo para Eliminar Actividad
  public deleteActivity(id: number) {
    return this.http.delete<any>(`${this.URL}/activity/delete/${id}`);
  }

  //Metodo para actualizar el estado de la actividad
  public updateStateActivity(id: number, state: String) {
    return this.http.put<any>(`${this.URL}/activity/update_state/${id}/${state}`, null);
  }

  // Metodo para Obtener todo la información de la actividad
  public getAllinfoActivity(id: number) {
    return this.http.get<any>(`${this.URL}/activity/info_activity/${id}`)
    .pipe(map(data => {
      return data;
    }));
  }

  //Metodo para actiualizar la imagen y especificaciones de la actividad
  public updateImageActivity(id: number, activity: Activity) {
    return this.http.put<any>(`${this.URL}/activity/complit/${id}`, activity);
  }
  public reassingActivity(id: number, id_user: number) {
    return this.http.put<any>(`${this.URL}/activity/reassign/${id}/${id_user}`, null);
  }
  // Generar informe de actividad
  public generateReportActivity(data:any): Promise<Blob> {
    const requqestbody = {
      template: { shortid: 'sC95FFfH6' },
      data: data
    };
    return firstValueFrom(
      this.http.post(this.jsreport, requqestbody, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
        }),
        responseType: 'blob' // Esperamos un blob para el PDF
      })
    );
  }

  //#endregion ACTIVIDAD
}
