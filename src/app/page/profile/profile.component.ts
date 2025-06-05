import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { User } from '../../../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  perfilForm!: FormGroup;
  user!: User;
  updateleve= false;

  constructor(private apiserve: ApiSpringbootService, 
  private fb: FormBuilder,
  private toats: MatSnackBar,
  private router: Router
  ) {

    
  }

  ngOnInit(): void {
    const userSesion = localStorage.getItem('User');

    if (userSesion) {
      this.user = JSON.parse(userSesion);

      // Inicializar el formulario con los datos del usuario
      this.perfilForm = this.fb.group({
        name: [this.user.name || ''],
        dni: [this.user.dni || ''],
        email: [this.user.email || ''],
        telephone: [this.user.telephone || ''],
        level: [this.user.level ?? 0],
        pass: [this.user.pass || ''] // Campo para la contraseña, si es necesario
      });
      this.perfilForm.disable();

    } else {
      console.error('No hay usuario en sesión');
      // Aquí podrías redirigir o mostrar un mensaje al usuario
    }
  }
  habilitarEdicion(){
    // Habilitar todos los campos del formulario para edición
    if (this.perfilForm.disabled) {
      this.perfilForm.enable();
    }else {
      this.perfilForm.disable();
    }
  }
  btnCancelar(){
    window.location.reload();
  }
updateProfile() {

  const form = this.perfilForm;

  const name = form.get('name')?.value.trim();
  const dni = form.get('dni')?.value.trim();
  const email = form.get('email')?.value.trim();
  const telephone = form.get('telephone')?.value.trim();
  const level = form.get('level')?.value;
  const pass = form.get('pass')?.value;

  const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const emailPattern = /^[\w.-]+@(gmail|hotmail)\.com$/;
  const telephonePattern = /^\d{7,15}$/;

  // Validaciones
  if (!name || !namePattern.test(name)) {
    this.toats.open('Nombre inválido. Solo letras y espacios.', 'Cerrar', { duration: 3000 });
    return;
  }


  if (!email || !emailPattern.test(email)) {
    this.toats.open('Email inválido. Solo se permite gmail.com o hotmail.com.', 'Cerrar', { duration: 3000 });
    return;
  }

  if (!telephone || !telephonePattern.test(telephone)) {
    this.toats.open('Teléfono inválido. Debe tener entre 7 y 15 dígitos.', 'Cerrar', { duration: 3000 });
    return;
  }

  if (!pass) {
    this.toats.open('Contraseña obligatoria.', 'Cerrar', { duration: 3000 });
    return;
  }

  const updatedUser: User = {
    id: this.user.id,
    name,
    dni,
    email,
    telephone,
    level,
    pass
  };
 
  if (this.user.level != 1){
    if (+level === 1) {
    const confirmacion = window.confirm('Si Selecionas el nivel tecnico saldras de la aplicación, ¿Deseas continuar?');
    if (!confirmacion) {
      return; // Cancelado por el usuario
    } else {
      this.updateleve = true;
    }
    }
  }
  

  this.apiserve.UpdateUser(this.user.id!, updatedUser).subscribe({
    next: (response) => {
      console.log('Perfil actualizado correctamente:', response);
      if (this.updateleve) {
        localStorage.removeItem('User');
        this.router.navigate(['/login']);
      }else {
      this.perfilForm.disable();
      this.user = updatedUser;
      localStorage.setItem('User', JSON.stringify(this.user));
      this.toats.open('Perfil actualizado correctamente', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      window.location.reload();
    }
    },
    error: (error) => {
      console.error('Error al actualizar el perfil:', error);
      this.toats.open('Error al actualizar el perfil', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  });
}

}
