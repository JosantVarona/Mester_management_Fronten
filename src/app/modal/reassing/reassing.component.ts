import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { User } from '../../../model/user';
import { Activity } from '../../../model/activity';

@Component({
  selector: 'app-reassing',
  standalone: false,
  templateUrl: './reassing.component.html',
  styleUrl: './reassing.component.css'
})
export class ReassingComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  @Input() ReassingActivity: Activity | null = null;
  selectedUser!: User;


  users: User [] = [];


  constructor(
    private apiserve: ApiSpringbootService
  ) { }

  ngOnInit(): void {
    this.getAlluser();
  }

  getAlluser() {
    this.apiserve.getAllUsers().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  close() {
    this.onClose.emit();
  }
  selectUser(user: User) {
    this.selectedUser = user;
  }
  reassingActivity() {
    if (this.ReassingActivity && this.selectedUser) {
      this.apiserve.reassingActivity(this.ReassingActivity.id!, this.selectedUser.id!).subscribe(
        response => {
          console.log('Actividad reasignada correctamente', response);
          this.close();
        },
        error => {
          console.error('Error al reasignar la actividad', error);
        }
      );
    } else {
      console.error('No se ha seleccionado una actividad o un usuario');
    }
  }
}
