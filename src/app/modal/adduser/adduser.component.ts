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
const form = this.formuser;

  const name = form.get('name')?.value.trim();
  const dni = form.get('dni')?.value.trim();
  const email = form.get('email')?.value.trim();
  const telephone = form.get('telephone')?.value.trim();
  const level = form.get('level')?.value;

  const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const emailPattern = /^[\w.-]+@(gmail|hotmail)\.com$/;

  // Validaciones
  if (!name || !namePattern.test(name)) {
    this.toats.open('Nombre inválido. Solo letras y espacios.', 'Cerrar', { duration: 3000 });
    return;
  }


  if (!email || !emailPattern.test(email)) {
    this.toats.open('Email inválido. Solo se permite gmail.com o hotmail.com.', 'Cerrar', { duration: 3000 });
    return;
  }
  if (!telephone ) {
    this.toats.open('Teléfono inválido. Debe tener entre 7 y 15 dígitos.', 'Cerrar', { duration: 3000 });
    return;
  }
  if (!dni || dni.trim().length === 0 ) {
    this.toats.open('El DNI es obligatorio.', 'Cerrar', { duration: 3000 });
    return;
  }
  


  const updatedUser: User = {
    name,
    dni,
    email,
    telephone,
    level,
    pass: this.updateuser?.pass 
  };

      if (this.updateuser) {
        // Actualizar usuario existente
        this.apiserve.UpdateUser(this.updateuser.id!, updatedUser).subscribe(
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
