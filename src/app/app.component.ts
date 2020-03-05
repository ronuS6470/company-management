import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'cmp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'company-management';
  
  constructor(private router: Router) {
    this.changeOfRoutes();
  }
  /**
   * Function which runs on every route change
   */
  changeOfRoutes() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (localStorage.getItem('username') != null && event['url'] == '/login') {
          this.router.navigate(['/company']);
        }
      }
    });
  }
}
