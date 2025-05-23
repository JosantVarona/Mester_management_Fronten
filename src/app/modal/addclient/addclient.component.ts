import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-addclient',
  standalone: false,
  templateUrl: './addclient.component.html',
  styleUrl: './addclient.component.css'
})
export class AddclientComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
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
    })
  }
  close() {
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
}
}
