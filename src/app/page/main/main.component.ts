import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/clients';
import { ApiSpringbootService } from '../../service/api-springboot.service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  clients: Client [] = [];

  constructor(
    private apiserve: ApiSpringbootService
  ){

  }

  showModal = false;
  ngOnInit(): void {
    this.getAllclients();
  }
  getAllclients(){
    this.apiserve.getAllClients().subscribe(
      data =>{this.clients = data}
    )
  }
}
