import { Component, OnInit } from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Client } from '../../../model/clients';
import { Center } from '../../../model/center';
import { Activity } from '../../../model/activity';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  filterText: string = '';
  isDisabled = false;

  constructor(
  private apiserve: ApiSpringbootService,
  private router: Router,
  private toats: MatSnackBar,
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

  // Metodo para filtrar actividades
  get filteredClients(): Activity[] {
  if (!this.filterText.trim()) {
    return this.activity;
  }

  const search = this.filterText.toLowerCase();
  return this.activity.filter(acti =>
    acti.name!.toLowerCase().includes(search)
  );
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
        this.toats.open('¡Accion de archivado con exito!', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
         // Actualizar la lista de actividades después de archivar
        console.log('Actividad archivada:', response);
        this.getActivitybyCenter(this.center.id); 
      },
      error: (error) => {
        this.toats.open('Error de accion de archivado', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
         // Manejo de errores al archivar
         console.error('Error al archivar la actividad:', error);
      }
    });
  }
  // Método para eliminar una actividad
  deleteActivity(activity: Activity) {
    this.apiserve.deleteActivity(activity.id!).subscribe({
      next: (response) => {
        this.toats.open('¡Actividad eliminada correctamente!', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      
        console.log('Actividad eliminada:', response);
        this.getActivitybyCenter(this.center.id); 
      },
      error: (error) => {
        this.toats.open('Error al eliminar la actividad', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
         // Manejo de errores al eliminar
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

  // Metodo para Generar el PDF de la actividad
  async btnGeneratePDF(activity: Activity) {
    this.isDisabled = true; 
          this.toats.open('Generando PDF...', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });

    // Llamamos al servicio para traernos la información de la actividad
    try {
      const activityData = await this.apiserve.getAllinfoActivity(activity.id!).toPromise();
  
      const pdfBlob = await this.apiserve.generateReportActivity(activityData);
      const blobUrl = new Blob([pdfBlob], { type: 'application/pdf' });
      const link = window.URL.createObjectURL(blobUrl);
      window.open(link);
    }
    catch(error) {
      console.error('Error al generar el PDF:', error);
      this.toats.open('Error al generar el PDF', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }finally {
      this.isDisabled = false; // Volver a habilitar el botón
    }
  }
}
