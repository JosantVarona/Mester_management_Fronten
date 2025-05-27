import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/clients';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  clients: Client [] = [];
  showModal = false;

  constructor(
    private apiserve: ApiSpringbootService,
    private router: Router
  ){

  }
  
  ngOnInit(): void {
    this.getAllclients();
  }
  getAllclients(){
    this.apiserve.getAllClients().subscribe(
      data =>{this.clients = data}
    )
  }
  btnClient(client: Client){
    localStorage.setItem('Client', JSON.stringify(client));
    this.router.navigate(['/home/center_client']);
  }
}
