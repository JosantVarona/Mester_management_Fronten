import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiSpringbootService } from '../../service/api-springboot.service';
import { User } from '../../../model/user';
import { Activity } from '../../../model/activity';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  filterText: string = '';


  users: User [] = [];


  constructor(
    private apiserve: ApiSpringbootService,
    private toats: MatSnackBar
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

    get filteredClients(): User[] {
    if (!this.filterText.trim()) {
      return this.users;
    }

    const search = this.filterText.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(search)
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
          this.toats.open('Actividad reasignada correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          console.log('Actividad reasignada correctamente', response);
          window.location.reload();

          this.close();
        },
        error => {
          this.toats.open('Error al reasignar la actividad', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          console.error('Error al reasignar la actividad', error);
        }
      );
    }
  }
}
