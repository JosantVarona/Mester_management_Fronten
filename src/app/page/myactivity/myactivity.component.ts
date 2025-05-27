import { Component, OnInit } from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { User } from '../../../model/user';
import { Activity } from '../../../model/activity';

@Component({
  selector: 'app-myactivity',
  standalone: false,
  templateUrl: './myactivity.component.html',
  styleUrl: './myactivity.component.css'
})
export class MyactivityComponent implements OnInit {
  user!: User;
  activis: Activity[] = [];
  constructor(
    private apiserve: ApiSpringbootService
  ){
    const user = localStorage.getItem('User');
    if(user !== null){
      this.user = JSON.parse(user);
    }else{
      console.log('no hay usuario');
    }

  }

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities() {
    this.apiserve.getUserbyId(this.user.id!).subscribe( data => {
      this.activis = data.activities;
    });
  }
}
