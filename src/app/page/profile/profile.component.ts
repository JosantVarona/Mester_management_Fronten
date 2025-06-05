import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  perfilForm!: FormGroup;
  user!: User;

  constructor(private apiserve: ApiSpringbootService, 
    private fb: FormBuilder) {}

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
        level: [this.user.level ?? 0]
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
    if (this.perfilForm.valid) {
      const updatedUser: User = {
        id: this.user.id, // Mantener el ID del usuario existente
        name: this.perfilForm.get('name')?.value,
        dni: this.perfilForm.get('dni')?.value,
        email: this.perfilForm.get('email')?.value,
        telephone: this.perfilForm.get('telephone')?.value,
        level: this.perfilForm.get('level')?.value
      };

      this.apiserve.UpdateUser(this.user.id! ,updatedUser).subscribe({
        next: (response) => {
          console.log('Perfil actualizado correctamente:', response);
          this.perfilForm.disable(); // Deshabilitar el formulario después de la actualización
          this.user = updatedUser; // Actualizar la variable user con los nuevos datos
          localStorage.setItem('User', JSON.stringify(this.user)); // Actualizar el localStorage
          window.location.reload(); // Recargar la página para reflejar los cambios
        },
        error: (error) => {
          console.error('Error al actualizar el perfil:', error);
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      });
    } else {
      console.error('Formulario inválido');
    }
  }
}
