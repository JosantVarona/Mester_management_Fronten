import { Component, OnInit } from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { Client } from '../../../model/clients';
import { Center } from '../../../model/center';
import { Activity } from '../../../model/activity';

@Component({
  selector: 'app-activity',
  standalone: false,
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit {
  client! : Client;
  center! : Center;
  activity: Activity [] = [];

  constructor(
  private apiserve: ApiSpringbootService
  ){
    const clientm = localStorage.getItem('Client');
    const centerm = localStorage.getItem('Center');
    if(clientm !== null && centerm !== null){
      this.client = JSON.parse(clientm);
      this.center = JSON.parse(centerm);
    }else{
      console.log('no hay usuario')
    }

  }

  ngOnInit(): void {
    this.getActivitybyCenter(this.center.id);
  }
  getActivitybyCenter(id_center: number){
    this.apiserve.getActivitybyCenter(id_center).subscribe(actividata=>{
      this.activity = actividata.activity;
    });
  }
}
