import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../model/user';

@Component({
  selector: 'app-adduser',
  standalone: false,
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  @Input() updateuser: User| null = null;
  formuser!: FormGroup;

  constructor(
    private apiserve: ApiSpringbootService,
    private fb: FormBuilder
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
      this.formuser.reset(); // Limpia todos los campos
    }
    this.updateuser = null;
    this.onClose.emit();
    
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
            console.log('Usuario actualizado correctamente');
            window.location.reload(); // Recargar la página para reflejar los cambios
            this.close();
          },
          error => {
            console.error('Error al actualizar el usuario:', error);
          }
        );
      }
    }
  }

}
