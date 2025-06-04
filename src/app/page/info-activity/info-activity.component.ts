import { Component, OnInit } from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Activity } from '../../../model/activity';

@Component({
  selector: 'app-info-activity',
  standalone: false,
  templateUrl: './info-activity.component.html',
  styleUrl: './info-activity.component.css'
})
export class InfoActivityComponent implements OnInit {
  selectedFile!: File;
  info_activity!: any;
  id_activity!: number;
  loading_info: boolean = true;
  imagePreview: string | ArrayBuffer | null = null;
  form!: FormGroup;


  constructor(private apiserve: ApiSpringbootService,
  private router: ActivatedRoute ,
  private router2: Router,
  private formbuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
     this.router.params.subscribe(params => {
      this.id_activity = params['id']; 
      this.dataActivity(this.id_activity);
    });
    this.form = this.formbuilder.group({
      especificaciones: [''],
      picture: [null]
    });
  }
  // Metodo para obtener la informacion de la actividad
  dataActivity(id: number): void {
    this.apiserve.getAllinfoActivity(id).subscribe(data => {
      setTimeout(() => {
        this.info_activity = data;
        
        this.loading_info = false;
        this.form.patchValue({
          especificaciones: this.info_activity.especificaciones || ''
        });
      }, 1500);
    });
  }

  previewImage(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
    }
  }
  // Metodo para actualizar la actividad
guardarCambios() {
  const formValues = this.form.value;

  if (this.selectedFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;

      const activityData = {
        specifics: formValues.especificaciones,
        picture: base64Image
      };

      this.enviarDatosAlServidor(activityData);
    };

    reader.readAsDataURL(this.selectedFile); // ¡FALTA ESTO EN TU CÓDIGO!
  } else {
    const activityData = {
      specifics: formValues.especificaciones,
      picture: null
    };

    this.enviarDatosAlServidor(activityData);
  }
}

private enviarDatosAlServidor(activityData: any) {
  this.apiserve.updateImageActivity(this.id_activity, activityData).subscribe({
    next: (response) => {
      console.log('Actividad actualizada con éxito:', response);
      this.router2.navigate(['/home/center_activity']);
    },
    error: (error) => {
      console.error('Error al actualizar la actividad:', error);
    }
  });
}



}