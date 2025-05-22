import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  perfilForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      nombre: [{ value: 'Juan Pérez', disabled: true }],
      dni: [{ value: '12345678A', disabled: true }],
      telefono: [{ value: '+34 600 123 456', disabled: true }],
      correo: [{ value: 'juan@example.com', disabled: true }],
      rol: [{ value: 'Administrador', disabled: true }]
    });
  }

  // ✅ Método que habilita todos los campos
  habilitarCampos(): void {
    this.perfilForm.enable();
  }

}
