import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Center } from '../../../model/center';

@Component({
  selector: 'app-addcenter',
  standalone: false,
  templateUrl: './addcenter.component.html',
  styleUrl: './addcenter.component.css'
})
export class AddcenterComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  @Input() id_client!: number;
  form!: FormGroup;

  constructor(
    private apiservice: ApiSpringbootService,
    private formbuilder: FormBuilder
  ){
    
  }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      location: new FormControl(''),
      telephone: new FormControl(''),
      zipCode: new FormControl(''),
      address: new FormControl('')
    })
  }

  close() {
    this.onClose.emit();
  }

  saveCenter(){
    console.log(this.id_client)
    if (this.form.value.location == "") {
    console.log('Tiene que poner donde se encuentra el centro');
    return;
  }
  if (this.form.value.telephone == "") {
    console.log('Tiene que introducir numero');
    return;
  }
  if (this.form.value.zipCode == "") {
    console.log('Codigo postal esta vacío');
    return;
  }
  if (this.form.value.address == "") {
    console.log('Domiciolo vacio');
    return;
  }
  const dataCenter = this.form.value;
  this.apiservice.addCenter(this.id_client, dataCenter).subscribe({
    next: (response) => {
      console.log('Centro guardado:', response);
      window.location.reload();
      this.close(); 
    },
    error: (err) => {
      console.error('Error al guardar Centro:', err);
    }
  });
  }
}
