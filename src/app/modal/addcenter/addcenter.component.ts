import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Center } from '../../../model/center';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addcenter',
  standalone: false,
  templateUrl: './addcenter.component.html',
  styleUrl: './addcenter.component.css'
})
export class AddcenterComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  @Input() updatecenter: Center | null = null;
  @Input() id_client!: number;
  form!: FormGroup;

  constructor(
    private apiservice: ApiSpringbootService,
    private formbuilder: FormBuilder,
    private toats: MatSnackBar
  ){
    
  }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      location: new FormControl(''),
      telephone: new FormControl(''),
      zipCode: new FormControl(''),
      address: new FormControl('')
    });
    if (this.updatecenter) {
      this.form.patchValue({
        location: this.updatecenter.location,
        telephone: this.updatecenter.telephone,
        zipCode: this.updatecenter.zipCode,
        address: this.updatecenter.address
      });
    }else{
    this.form.reset();
  }
  }

  close() {
    this.onClose.emit();
  }

  saveCenter(){
    console.log(this.id_client)
    if (this.form.value.location == "") {
    this.toats.open('Tiene que poner donde se encuentra el centro', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error-snackbar']
    });
    console.log('Tiene que poner donde se encuentra el centro');
    return;
  }
  if (this.form.value.telephone == "") {
    this.toats.open('Tiene que introducir un numero de telefono', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error-snackbar']
    });
    console.log('Tiene que introducir numero');
    return;
  }
  if (this.form.value.zipCode == "") {
    this.toats.open('Codigo postal esta vacío', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error-snackbar']
    });
    console.log('Codigo postal esta vacío');
    return;
  }
  if (this.form.value.address == "") {
    this.toats.open('Domiciolo vacio', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error-snackbar']
    });
    console.log('Domiciolo vacio');
    return;
  }
  const dataCenter = this.form.value;
  if (this.updatecenter == null) {
    this.apiservice.addCenter(this.id_client, dataCenter).subscribe({
    next: (response) => {
      console.log('Centro guardado:', response);
      this.toats.open('Centro guardado correctamente', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['success-snackbar']
      });
      window.location.reload();
      this.close(); 
    },
    error: (err) => {
      this.toats.open('Error al guardar centro', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar']
      });
      console.error('Error al guardar Centro:', err);
    }
  });
  }else{
    this.apiservice.updateCenter(this.updatecenter.id, dataCenter).subscribe({
      next: (response) => {
        this.toats.open('Centro actualizado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['success-snackbar']
        });
        console.log('Centro actualizado:', response);
        window.location.reload();
        this.close(); 
      },
      error: (err) => {
        this.toats.open('Error al actualizar centro', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['error-snackbar']
        });
        console.error('Error al actualizar Centro:', err);
      }
    });
  }
  
  }
}
