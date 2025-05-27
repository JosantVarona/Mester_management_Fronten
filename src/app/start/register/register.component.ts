import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Router } from '@angular/router';
import { User } from '../../../model/user';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiserve: ApiSpringbootService,
    private router: Router
  ){
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(''),
      lastname: new FormControl(''),
      dni: new FormControl(''),
      email: new FormControl(''),
      telephone: new FormControl(''),
      pass: new FormControl('')
    })
  }
  ngSubmit(){
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
      console.log('Usuario registrado:', response);
      this.router.navigate(['/home']); 
    },
    error: (error) => {
      console.error('Error al registrar el usuario:', error);
    }
  });
  }
  
}
