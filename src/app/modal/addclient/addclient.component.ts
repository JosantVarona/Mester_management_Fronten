import { Component, Output, EventEmitter, OnInit, input, Input} from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Client } from '../../../model/clients';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-addclient',
  standalone: false,
  templateUrl: './addclient.component.html',
  styleUrl: './addclient.component.css'
})
export class AddclientComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  @Input() updateclient: Client | null = null;
  form!: FormGroup;

  constructor(
    private apiserve: ApiSpringbootService,
    private formBuilder: FormBuilder,
    private toats: MatSnackBar
  ){

  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(''),
      cif: new FormControl(''),
      email: new FormControl('')
    });
    if (this.updateclient) {
    this.form.patchValue({
      name: this.updateclient.name,
      cif: this.updateclient.cif,
      email: this.updateclient.email
    });
  }else{
    this.form.reset();
  }
  }
    close() {
      if (this.form) {
        this.form.reset(); // Limpia todos los campos
      }

      this.updateclient = null;
      this.onClose.emit();
    }
  saveClient() {
    if (this.form.value.name == "") {
      this.toats.open('Nombre vacío', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar']
      });
      console.log('Nombre vacío');
      return;
    }
    if (this.form.value.cif == "") {
      this.toats.open('CIF vacío', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar']
      });
      return;
    }
    if (this.form.value.email == "") {
      this.toats.open('Email vacío', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar']
      });

      return;
    }
    const dataclient = this.form.value;
    if (this.updateclient === null) {
    // Inserta Cliente 
    this.apiserve.addClient(dataclient).subscribe({
      next: (response) => {
        console.log('Cliente guardado:', response);
        this.toats.open('Cliente guardado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['success-snackbar']
        });
        window.location.reload();
        this.close(); 
      },
      error: (err) => {
        this.toats.open('Error al guardar cliente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['error-snackbar']
        });
        console.error('Error al guardar cliente:', err);
      }
    });
    }else {
      // Actualiza Cliente
      this.apiserve.updateClient(this.updateclient.id! , dataclient).subscribe({
        next: (response) => {
          this.toats.open('Cliente actualizado correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['success-snackbar']
          });
          console.log('Cliente actualizado:', response);
          window.location.reload();
          this.close(); 
        },
        error: (err) => {
          this.toats.open('Error al actualizar cliente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['error-snackbar']
          });
          console.error('Error al actualizar cliente:', err);
        }
      });

    }
    
  }
}
