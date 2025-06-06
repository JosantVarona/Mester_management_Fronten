import { Component, OnInit } from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ver-activity',
  standalone: false,
  templateUrl: './ver-activity.component.html',
  styleUrl: './ver-activity.component.css'
})
export class VerActivityComponent implements OnInit {

  info_activity!: any;
  id_activity!: number;
  loading_info: boolean = true;
  verImagen: boolean = false;

  constructor(
  private apiserve: ApiSpringbootService,
  private router: ActivatedRoute,
  private toats: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id_activity = params['id']; 
      this.dataActivity(this.id_activity);
    });
    
  }

  // Metodo para obtener la informacion de la actividad
  dataActivity(id: number): void {
    this.apiserve.getAllinfoActivity(id).subscribe(data => {
      setTimeout(() => {
        this.info_activity = data;
        this.loading_info = false;
      }, 1500);
    });
  }
  abrirImagen(): void {
  this.verImagen = true;
  }

  cerrarImagen(): void {
    this.verImagen = false;
  }

}
