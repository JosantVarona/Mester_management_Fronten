import { Component, OnInit } from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { User } from '../../../model/user';
import { Activity } from '../../../model/activity';
import { Router } from '@angular/router';
@Component({
  selector: 'app-myactivity',
  standalone: false,
  templateUrl: './myactivity.component.html',
  styleUrl: './myactivity.component.css'
})
export class MyactivityComponent implements OnInit {
  user!: User;
  activis: Activity[] = [];
  updateactivity: Activity | null = null;
  showModal = false;
  showReassing = false;


  constructor(
    private apiserve: ApiSpringbootService,
    private router: Router
  ){
    const user = localStorage.getItem('User');
    if(user !== null){
      this.user = JSON.parse(user);
    }else{
      console.log('no hay usuario');
    }

  }

  ngOnInit(): void {
    this.getActivities(this.user.id!);
  }

  getActivities(id: number) {
    this.apiserve.getUserbyId(id).subscribe( data => {
      this.activis = data.activities;
    });
  }

   // Metodo para actualizar el estado de la actividad
  btnUpdateState(activity :Activity, update?:number) {
    switch (activity.state) {
      case 'Pendiente':
        this.apiserve.updateStateActivity(activity.id!, 'En curso').subscribe({
          next: (response) => {
            console.log('Estado actualizado a En Proceso:', response);
            this.getActivities(this.user.id!); 
          },
          error: (error) => {
            console.error('Error al actualizar el estado:', error);
          }
        });
      break;
      case 'En curso':
        if (update == 1) {
          this.apiserve.updateStateActivity(activity.id!, 'Finalizada').subscribe({
            next: (response) => {
              console.log('Estado actualizado a Finalizada:', response);
              this.getActivities(this.user.id!); 
            },
            error: (error) => {
              console.error('Error al actualizar el estado:', error);
            }
          });
        }
        if (update == 0) {
          this.apiserve.updateStateActivity(activity.id!, 'Pendiente').subscribe({
            next: (response) => {
              console.log('Estado actualizado a Pendiente:', response);
              this.getActivities(this.user.id!); 
            },
            error: (error) => {
              console.error('Error al actualizar el estado:', error);
            }
          });
        }
      break;
      case 'Finalizada':
          this.apiserve.updateStateActivity(activity.id!, 'En curso').subscribe({
            next: (response) => {
              console.log('Estado actualizado a Pendiente:', response);
              this.getActivities(this.user.id!); 
            },
            error: (error) => {
              console.error('Error al actualizar el estado:', error);
            }
          });
      break;
    }
  }
  // Metodo para accerder a la actividad y dar detalles
  btnActivity(activity: Activity) {
    this.router.navigate(['/home/info_activity', activity.id]);
  }

  // Metodo para archivar actividad
  archiveActivity(activity: Activity) {
    const state = activity.archive == 1 ? 0 : 1;
    this.apiserve.archiveActivity(activity.id!, state).subscribe({
      next: (response) => {
        console.log('Actividad archivada:', response);
        this.getActivities(this.user.id!); 
      },
      error: (error) => {
        console.error('Error al archivar la actividad:', error);
      }
    });
  }

  // Metodo para abrir modal para añadir actividad
  btnAddCenter() {
    this.updateactivity = null;         
    this.showModal = true;             
  }

  // Metodo para abrir modal para actualizar actividad
  btnUpdateActivity(activity: Activity) {
    this.updateactivity = activity;    
    this.showModal = true;             
  }
  // Metodo para abrir modal para reasignar actividad
  btnReassingActivity(activity: Activity) {
    this.updateactivity = activity;
    this.showReassing = true;     
  }

  // Método para cerrar el modal y limpiar la variable de update
    handleClose() {
    this.showModal = false;
    this.showReassing = false;
    this.updateactivity = null;
  }
    // Método para eliminar una actividad
  deleteActivity(activity: Activity) {
    this.apiserve.deleteActivity(activity.id!).subscribe({
      next: (response) => {
        console.log('Actividad eliminada:', response);
        this.getActivities(this.user.id!); 
      },
      error: (error) => {
        console.error('Error al eliminar la actividad:', error);
      }
    });
  }
}
