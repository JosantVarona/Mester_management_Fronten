import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/clients';
import { Center } from '../../../model/center';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-center',
  standalone: false,
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit {
  client!: Client;
  centers: Center [] = [];
  clientreload = false;
  showModal = false;

  constructor(
    private apiserver: ApiSpringbootService,
    private router: Router
  )
  {
    const client = localStorage.getItem('Client');
    if(client !== null){
      this.client = JSON.parse(client);
      this.clientreload = true;
    }else{
      this.clientreload = false;
      console.log('no hay usuario')
    }
  }

  ngOnInit(): void {
    this.getCenterbyClient(this.client.id);

  }

  getCenterbyClient(id_client:number){
    this.apiserver.getCenterbyClient(id_client).subscribe(centerData => {
      this.centers = centerData.center;
    });
  }
  btnAccederCenter(center: Center){
    localStorage.setItem('Center', JSON.stringify(center));
    this.router.navigate(['/home/center_activity']);
  }

}
