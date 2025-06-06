import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/clients';
import { Center } from '../../../model/center';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Router } from '@angular/router';
import { User } from '../../../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  filterText: string = '';

  constructor(
    private apiserver: ApiSpringbootService,
    private router: Router,
    private toats: MatSnackBar
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

    get filteredClients(): Center[] {
  if (!this.filterText.trim()) {
    return this.centers;
  }

  const search = this.filterText.toLowerCase();
  return this.centers.filter(cente =>
    cente.location.toLowerCase().includes(search)
  );
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
        this.toats.open('¡Operación completada correctamente! ', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',   
          verticalPosition: 'top' 
        });
        this.getCenterbyClient(this.client.id);
      },
      error => {
        this.toats.open('La acción no se ha podido realizar.  ', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',   
          verticalPosition: 'top' 
        });
        console.error('Error al archivar el cliente:', error);
      }
    );
  }
  // Metodo para eliminar el centro
  btnDeleteCenter(center: Center): void {
    this.apiserver.deleteCenter(center.id).subscribe(
      () => {
        this.toats.open('¡Centro eliminado correctamente! ', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',   
          verticalPosition: 'top' 
        });
        this.getCenterbyClient(this.client.id);
      },
      error => {
        this.toats.open('No se ha podido eliminar el centro.  ', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',   
          verticalPosition: 'top' 
        });
        console.error('Error al eliminar el centro:', error);
      }
    );
  }
  // Metodo para volver a la pagina anterior
    back(){
    this.router.navigate(['/home/main']);
  }
}
