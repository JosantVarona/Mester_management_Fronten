import { Component, Output, EventEmitter, OnInit, input, Input} from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Client } from '../../../model/clients';
@Component({
  selector: 'app-addclient',
  standalone: false,
  templateUrl: './addclient.component.html',
  styleUrl: './addclient.component.css'
})
export class AddclientComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  @Input() updateclient: Client | null = null;
  form!: FormGroup;

  constructor(
    private apiserve: ApiSpringbootService,
    private formBuilder: FormBuilder
  ){

  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(''),
      cif: new FormControl(''),
      email: new FormControl('')
    });
    if (this.updateclient) {
    this.form.patchValue({
      name: this.updateclient.name,
      cif: this.updateclient.cif,
      email: this.updateclient.email
    });
  }else{
    this.form.reset();
  }
  }
    close() {
      if (this.form) {
        this.form.reset(); // Limpia todos los campos
      }

      this.updateclient = null;
      this.onClose.emit();
    }
  saveClient() {
    if (this.form.value.name == "") {
      console.log('Nombre vacío');
      return;
    }
    if (this.form.value.cif == "") {
      console.log('CIF vacío');
      return;
    }
    if (this.form.value.email == "") {
      console.log('Email vacío');
      return;
    }
    const dataclient = this.form.value;
    if (this.updateclient === null) {
    // Inserta Cliente 
    this.apiserve.addClient(dataclient).subscribe({
      next: (response) => {
        console.log('Cliente guardado:', response);
        window.location.reload();
        this.close(); 
      },
      error: (err) => {
        console.error('Error al guardar cliente:', err);
      }
    });
    }else {
      // Actualiza Cliente
      this.apiserve.updateClient(this.updateclient.id! , dataclient).subscribe({
        next: (response) => {
          console.log('Cliente actualizado:', response);
          window.location.reload();
          this.close(); 
        },
        error: (err) => {
          console.error('Error al actualizar cliente:', err);
        }
      });

    }
    
  }
}
