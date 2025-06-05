import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Activity } from '../../../model/activity';
import { get } from 'http';

@Component({
  selector: 'app-adduser',
  standalone: false,
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  @Input() updateuser: User| null = null;
  activiUser: Activity[] = [];
  formuser!: FormGroup;
  filtroNombre: string = '';
  filtroEstado: string = '';

  constructor(
    private apiserve: ApiSpringbootService,
    private fb: FormBuilder,
    private toats: MatSnackBar
  ){

  }

  ngOnInit(): void {
    console.log(this.updateuser)
    this.formuser = this.fb.group({
      name: [''],
      dni: [''],
      email: [''],
      telephone: [''],
      level: [0]
    });

    if (this.updateuser) {
      this.getActivities(this.updateuser.id!);
      // Si hay un usuario para actualizar, precargar los datos en el formulario
      this.formuser.patchValue({
        name: this.updateuser.name,
        dni: this.updateuser.dni,
        email: this.updateuser.email,
        telephone: this.updateuser.telephone,
        level: this.updateuser.level
      });
    }
    this.formuser.disable();
    
  }
 close() {
    if (this.formuser) {
      this.formuser.reset(); 
    }
    this.updateuser = null;
    this.onClose.emit();
    
  }

    getActivities(id: number) {
    this.apiserve.getUserbyId(id).subscribe( data => {
      this.activiUser = data.activities;
    });
  }

// Habilitar todos los campos del formulario para edición
  habilitarEdicion(){
  
    if (this.formuser.disabled) {
      this.formuser.enable();
    }else {
      this.formuser.disable();
    }
  }
  updateUser() {
    if (this.formuser.valid) {
      const user: User = {
        name: this.formuser.get('name')?.value,
        dni: this.formuser.get('dni')?.value,
        email: this.formuser.get('email')?.value,
        telephone: this.formuser.get('telephone')?.value,
        level: this.formuser.get('level')?.value
      };

      if (this.updateuser) {
        // Actualizar usuario existente
        this.apiserve.UpdateUser(this.updateuser.id!, user).subscribe(
          () => {
            this.toats.open('Usuario actualizado correctamente', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['success-snackbar']
            });
            console.log('Usuario actualizado correctamente');
            window.location.reload(); // Recargar la página para reflejar los cambios
            this.close();
          },
          error => {
            this.toats.open('Error al actualizar el usuario', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['error-snackbar']
            });
            console.error('Error al actualizar el usuario:', error);
          }
        );
      }
    }
  }
    // 🔍 Filtro dinámico aplicado en el HTML
  getFilteredActivities(): Activity[] {
    const nombre = this.filtroNombre.toLowerCase();
    const estado = this.filtroEstado.toLowerCase();

    return this.activiUser.filter(act => {
      const matchNombre = act.name!.toLowerCase().includes(nombre);
      const matchEstado = estado ? act.state!.toLowerCase() === estado : true;
      return matchNombre && matchEstado;
    });
  }

}
