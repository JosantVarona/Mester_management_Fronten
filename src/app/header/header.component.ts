import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  sidenavOpened = false;
  constructor(
    private router : Router
  ){
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
  
}
