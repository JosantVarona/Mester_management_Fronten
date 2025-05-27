import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { ApiSpringbootService } from '../../service/api-springboot.service';

@Component({
  selector: 'app-workers',
  standalone: false,
  templateUrl: './workers.component.html',
  styleUrl: './workers.component.css'
})
export class WorkersComponent implements OnInit{

  users: User [] = []

  constructor(
    private apiserve: ApiSpringbootService
  ){

  }
  ngOnInit(): void {
    this.getAlluser();
  }
  getAlluser(){
    this.apiserve.getAllUsers().subscribe(
      data => {this.users = data}
    )
  }
}
