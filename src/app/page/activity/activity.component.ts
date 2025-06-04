import { Component, OnInit } from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Client } from '../../../model/clients';
import { Center } from '../../../model/center';
import { Activity } from '../../../model/activity';
import { User } from '../../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  standalone: false,
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit {
  user! : User;
  client! : Client;
  center! : Center;
  activity: Activity [] = [];
  updateactivity: Activity | null = null;
  showModal = false;
  showModalReassing = false;

  constructor(
  private apiserve: ApiSpringbootService,
  private router: Router
  ){
    const userm = localStorage.getItem('User');
    const clientm = localStorage.getItem('Client');
    const centerm = localStorage.getItem('Center');
    if(clientm !== null && centerm !== null && userm !== null){
      this.client = JSON.parse(clientm);
      this.center = JSON.parse(centerm);
      this.user = JSON.parse(userm);
    }else{
      console.log('no hay usuario')
    }

  }

  ngOnInit(): void {
    this.getActivitybyCenter(this.center.id);
  }
  getActivitybyCenter(id_center: number){
    this.apiserve.getActivitybyCenter(id_center).subscribe(actividata=>{
      this.activity = actividata.activity;
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
    this.showModalReassing = true;     
  }

  // Método para cerrar el modal y limpiar la variable de update
    handleClose() {
    this.showModal = false;
    this.showModalReassing = false;
    this.updateactivity = null;
  }
  
  // Método para archivar una actividad
  archiveActivity(activity: Activity) {
    const state = activity.archive == 1 ? 0 : 1;
    this.apiserve.archiveActivity(activity.id!, state).subscribe({
      next: (response) => {
        console.log('Actividad archivada:', response);
        this.getActivitybyCenter(this.center.id); 
      },
      error: (error) => {
        console.error('Error al archivar la actividad:', error);
      }
    });
  }
  // Método para eliminar una actividad
  deleteActivity(activity: Activity) {
    this.apiserve.deleteActivity(activity.id!).subscribe({
      next: (response) => {
        console.log('Actividad eliminada:', response);
        this.getActivitybyCenter(this.center.id); 
      },
      error: (error) => {
        console.error('Error al eliminar la actividad:', error);
      }
    });
  }

  back(){
    this.router.navigate(['/home/center_client']);
  }
  // Metodo para accerder a la actividad
  btnShowActivity(activity: Activity) {
    this.router.navigate(['/home/show_activity', activity.id]);
  }
}
