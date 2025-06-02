import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/clients';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Router } from '@angular/router';
import { User } from '../../../model/user';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  user! : User;
  updateclient: Client | null = null;
  clients: Client [] = [];
  showModal = false;

  constructor(
    private apiserve: ApiSpringbootService,
    private router: Router
  ){
    const userSesion = localStorage.getItem('User');
    if (userSesion) {
      this.user = JSON.parse(userSesion);
    } else {
      console.error('No hay usuario en sesión');
      // Aquí podrías redirigir o mostrar un mensaje al usuario
    }


  }
  
  ngOnInit(): void {
    this.getAllclients();
  }
  // Metodo para obtener todos los clientes
  getAllclients(){
    this.apiserve.getAllClients().subscribe(
      data =>{this.clients = data}
    )
  }
  // Metodo para accerder al cliente 
  btnClient(client: Client){
    localStorage.setItem('Client', JSON.stringify(client));
    this.router.navigate(['/home/center_client']);
  }
  // Metodo para actualizar el cliente
  btnEditClient(client: Client): void {
    this.updateclient = client; 
    this.showModal = true;
  }
  // Metodo para cerrar el modal y limpiar la variable updateclient
  handleClose() {
    this.showModal = false;
    this.updateclient = null;
  }
  // Metodo para archivar el cliente
  btnArchivarClient(client: Client): void {
    const state = client.archive == 1 ? 0 : 1; 
    this.apiserve.archiveClient(client.id, state).subscribe(
      () => {
        this.getAllclients();
      },
      error => {
        console.error('Error al archivar el cliente:', error);
      }
    );
  }
  // Metodo para eliminar el cliente
  btnDeleteClient(client: Client): void {
    this.apiserve.deleteClient(client.id).subscribe(
      () => {
        this.getAllclients();
      },
      error => {
        console.error('Error al eliminar el cliente:', error);
      }
    );
  }
}
