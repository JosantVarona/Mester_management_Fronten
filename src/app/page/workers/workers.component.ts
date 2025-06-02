import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { ApiSpringbootService } from '../../service/api-springboot.service';

@Component({
  selector: 'app-workers',
  standalone: false,
  templateUrl: './workers.component.html',
  styleUrl: './workers.component.css'
})
export class WorkersComponent implements OnInit{
  user!: User;
  users: User [] = [];
  userupdate: User | null = null;
  showModal = false;

  constructor(
    private apiserve: ApiSpringbootService
  ){
    const userSesion = localStorage.getItem('User');
    if (userSesion) {
      this.user = JSON.parse(userSesion);
    } else {
      console.error('No hay usuario en sesión');
      // Aquí podrías redirigir o mostrar un mensaje al usuario
    }

  }
  ngOnInit(): void {
    this.getAlluser();
  }
  getAlluser() {
    this.apiserve.getAllUsers().subscribe(
      data => {
        this.users = data.filter((user: User) => user.id !== this.user.id);
      }
    );
  }
  // Metodo para cerrar el modal y limpiar la variable updateuser
  handleClose() {
    this.showModal = false;
    this.userupdate = null;
  }
  // Metodo para elegir un usuario para actualizar
  btnUpdateUser(user: User) {
    this.userupdate = user;
    this.showModal = true; 
  }
  // Metodo para deshabilitar o habilitar usuario
  btnUserDisable(user: User): void {
    const newState = user.state === "Habilitado" ? "Desabilitado" : "Habilitado";
    this.apiserve.Userstate(user.id!, newState).subscribe(
      () => {
        user.state = newState;
      },
      error => {
        console.error('Error al actualizar el estado del usuario:', error);
      }
    );
  }


}
