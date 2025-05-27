import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private apiserve: ApiSpringbootService, 
    private router: Router
  ){
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('Manuel@example.com'),
      pass: new FormControl('123')
    })
  }
  loginUser() {
  const email = this.form.value.email;
  const pass = this.form.value.pass;
  if (email && pass) {
      this.apiserve.loginUser(email).subscribe({
        next: (userDB) => {
          if (userDB && userDB.pass === pass) {
            // Login exitoso
            localStorage.setItem('User', JSON.stringify(userDB));
            this.router.navigate(['/home']); 
            console.log('Usuario autenticado');
          } else {
            // Contraseña incorrecta
            console.error('Credenciales incorrectas');
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

}
