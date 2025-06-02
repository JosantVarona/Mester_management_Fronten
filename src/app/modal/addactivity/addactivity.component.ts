import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Activity } from '../../../model/activity';
import { User } from '../../../model/user';

@Component({
  selector: 'app-addactivity',
  standalone: false,
  templateUrl: './addactivity.component.html',
  styleUrl: './addactivity.component.css'
})
export class AddactivityComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  @Input() updateactivity: Activity | null = null;
  @Input() id_center!: number;
  user!: User;
  form!: FormGroup;

  constructor(
    private apiserve: ApiSpringbootService,
    private formBuilder: FormBuilder
  ){
    // Obtener el usuario desde el localStorage
    const userData = localStorage.getItem('User');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      console.error('Usuario no encontrado en localStorage');
    }
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(''),
      type: new FormControl('')
    });
    // Si se está actualizando una actividad, precargar los valores en el formulario
    if (this.updateactivity) {
      this.form.patchValue({
        name: this.updateactivity.name,
        type: this.updateactivity.type
      });
    }else {
      // Si no hay actividad para actualizar, inicializar el formulario vacío
      this.form.reset();
    }
  }
  close() {
    this.onClose.emit();
  }
  saveClient() {
    console.log(this.user);
    const name = this.form.value.name;
    const type = this.form.value.type;
    

    // Validación de campos obligatorios
    if (!name || name.trim() === '') {
      console.log('Nombre vacío');
      return;
    }
    if (!type || type.trim() === '') {
      console.log('Tipo vacío');
      return;
    }
    
    if(this.updateactivity == null){
      // Formatear fecha actual como yyyy-mm-dd
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];

      // Crear objeto de tipo Activity
      const activity: Activity = {
        name: this.form.value.name,
        type: this.form.value.type,
        fecha_acti: formattedDate
      };

      this.apiserve.addActivity(this.id_center, this.user.id! ,activity).subscribe({
        next: (response) => {
          console.log('Actividad guardada:', response);
          window.location.reload();
          this.close();
        },
        error: (err) => {
          console.error('Error al guardar actividad:', err);
        }
      });
    }else{
      // Actualizar actividad existente
      const updatedActivity: Activity = {
        name: this.form.value.name,
        type: this.form.value.type,

      };

      this.apiserve.updateActivity(this.updateactivity.id!, updatedActivity).subscribe({
        next: (response) => {
          console.log('Actividad actualizada:', response);
          window.location.reload();
          this.close();
        },
        error: (err) => {
          console.error('Error al actualizar actividad:', err);
        }
      });
    }
   
  }
}
