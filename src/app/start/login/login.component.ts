import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../model/user';
import { AuthGuard } from '../../service/auth.guard';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiserve: ApiSpringbootService, 
    private router: Router,
    private toats: MatSnackBar,
    private auth: AuthGuard
  ){
  }

  ngOnInit(): void {
      if (this.auth.canActivate()) {
        this.toats.open('Bienvenido', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'center',   
            verticalPosition: 'top' 
          });
        
      // Si el usuario ya está autenticado, redirigir a la página de inicio
      this.router.navigate(['/home']);
    }
    this.form = this.formBuilder.group({
      email: new FormControl(''),
      pass: new FormControl('')
    })
  }
  loginUser() {
  const email = this.form.value.email;
  const pass = this.form.value.pass;
  if (email && pass) {
      this.apiserve.loginUser(email).subscribe({
        next: (userDB:User) => {
          if (userDB && userDB.pass == pass) {
            if (userDB.state != 'Desabilitado') {
              this.toats.open('Usuario autenticado', 'Cerrar', {
                duration: 3000,
                panelClass: ['success-snackbar'],
                horizontalPosition: 'center',   
                verticalPosition: 'top' 
              });
              localStorage.setItem('User', JSON.stringify(userDB));
              this.router.navigate(['/home']); 
              console.log('Usuario autenticado');
            }else{
              // Usuario no es ADMIN
              this.toats.open('Usuario no habilitado', 'Cerrar', {
                duration: 3000,
                panelClass: ['error-snackbar'],
                horizontalPosition: 'center',   
                verticalPosition: 'top' 
              });
            }
            
          } else {
            // Contraseña incorrecta
            this.toats.open('No se ha contrado usuario', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',   
            verticalPosition: 'top' 
          });
          }
        },
        error: (err) => {
          // Email no encontrado o error de red
          console.error('Error al buscar el usuario:', err);
        }
      });
    } else {
      console.error('Email y contraseña son requeridos');
    }
  }
    // Metodo para mostrar u ocultar la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

 recoverPassword() {
  const email = this.form.value.email;
  if (email) {
    this.apiserve.recoverPassword(email)
      .then(response => {
        this.toats.open('Se ha enviado un enlace de recuperación a tu correo. Esto puede tomar unos momentos', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      })
      .catch(error => {
        console.error('Error al enviar el enlace de recuperación:', error);
        this.toats.open('Error al enviar el enlace de recuperación', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      });
  } else {
    this.toats.open('Por favor, ingresa tu correo electrónico', 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}


}
