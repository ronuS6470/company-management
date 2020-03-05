import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 
  constructor(private authService:AuthenticationService) { }

  ngOnInit() { 
  }

  public onLogout():void {
    this.authService.logout();
  }

}
