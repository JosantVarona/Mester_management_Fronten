import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { User } from '../../model/user';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user!: User;
  sidenavOpened = false;
  constructor(
    private router : Router
  ){
    const user = localStorage.getItem('User');
    if(user !== null){
      this.user = JSON.parse(user);
    }else{
      console.log('no hay usuario')
    }
  }
  ngOnInit(): void {
    
  }
  
  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
  closeSidenav() {
  this.sidenavOpened = false;
}

  get isInHomeOrMain(): boolean {
    return this.router.url === '/home' || this.router.url === '/home/main';
  }
  logout() {
    localStorage.removeItem('User');
    this.router.navigate(['/login']);
  }

  
}
