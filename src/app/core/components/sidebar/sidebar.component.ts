import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'cmp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>; 

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; 
  }

  //method to call when logout button is clicked, and will navigate to login page
  onLogout() {
    this.authService.logout();
  }
}
