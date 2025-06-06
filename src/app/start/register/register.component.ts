import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Router } from '@angular/router';
import { User } from '../../../model/user';
import { json } from 'stream/consumers';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiserve: ApiSpringbootService,
    private router: Router,
    private toats: MatSnackBar,
  ){
    // Inicialización del formulario
  this.form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)]],
    lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)]],
    dni: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w.-]+@(gmail|hotmail)\.com$/)]],
    telephone: ['', [Validators.required]], // acepta de 7 a 15 dígitos
    pass: ['', Validators.required]
  });

  }
  ngOnInit(): void {

  }
  // Metodo para mostrar u ocultar la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit(){
    if (this.form.valid) {
    const formValue = this.form.value;

  const user: User = {
    name: `${formValue.name} ${formValue.lastname}`,
    dni: formValue.dni,
    email: formValue.email,
    telephone: formValue.telephone,
    pass: formValue.pass
  };

  this.apiserve.regisUser(user).subscribe({
    next: (response) => {
      this.toats.open('¡Usuario registrado exitosamente!', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',   
        verticalPosition: 'top' 
      });
      console.log('Usuario registrado:', response);
      this.router.navigate(['/login']); 
    },
    error: (error) => {
    // Manejo de errores al registrar el usuario
        this.toats.open('Error, correo ya extente', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',   
        verticalPosition: 'top' 
      });
      console.error('Error al registrar el usuario:', error);
    }
  });
  }else {
    // Manejo de errores si el formulario no es válido
    this.toats.open('Error, complete con datos validos', 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',   
      verticalPosition: 'top' 
    });
    console.error('Formulario inválido');
  }
}
  
}
