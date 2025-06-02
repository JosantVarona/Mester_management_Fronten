import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/clients';
import { Center } from '../../../model/center';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Router } from '@angular/router';
import { User } from '../../../model/user';

@Component({
  selector: 'app-center',
  standalone: false,
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit {
  user!: User;
  client!: Client;
  centers: Center [] = [];
  updatecenter: Center | null = null;
  clientreload = false;
  showModal = false;

  constructor(
    private apiserver: ApiSpringbootService,
    private router: Router
  )
  {
    const client = localStorage.getItem('Client');
    const userSesion = localStorage.getItem('User');
    if(client !== null && userSesion !== null){
      this.client = JSON.parse(client);
      this.user = JSON.parse(userSesion);
      this.clientreload = true;
    }else{
      this.clientreload = false;
      console.log('no hay usuario')
    }
  }

  ngOnInit(): void {
    this.getCenterbyClient(this.client.id);

  }

  // Metodo para obtenemos los centros del cliente
  getCenterbyClient(id_client:number){
    this.apiserver.getCenterbyClient(id_client).subscribe(centerData => {
      this.centers = centerData.center;
    });
  }
  // Accerde a las actividades del centro
  btnAccederCenter(center: Center){
    localStorage.setItem('Center', JSON.stringify(center));
    this.router.navigate(['/home/center_activity']);
  }

    btnAddCenter() {
    this.updatecenter = null;          // Asegúrate de esto
    this.showModal = true;             // Esto hace que se renderice el modal con el id_client
  }

  
  // Metodo para actualizar el center
  btnEditCenter(center: Center): void {
    this.updatecenter = center; 
    this.showModal = true;
  }
  // Metodo para cerrar el modal y limpiar la variable updatecenter
  handleClose() {
    this.showModal = false;
    this.updatecenter = null;
  }
  // Metodo para archivar el centro
  btnArchiveCenter(center: Center): void {
    const state = center.archive == 1 ? 0 : 1; 
    this.apiserver.archiveCenter(center.id, state).subscribe(
      () => {
        this.getCenterbyClient(this.client.id);
      },
      error => {
        console.error('Error al archivar el cliente:', error);
      }
    );
  }
  // Metodo para eliminar el centro
  btnDeleteCenter(center: Center): void {
    this.apiserver.deleteCenter(center.id).subscribe(
      () => {
        this.getCenterbyClient(this.client.id);
      },
      error => {
        console.error('Error al eliminar el centro:', error);
      }
    );
  }
}
