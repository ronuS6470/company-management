import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'cmp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showHeaderSidebar: boolean; // showHeaderSidebar to hide and show header and sidebar wherever needed.

  constructor(private router: Router) {
    this.changeOfRoutes();
    this.showHeaderSidebar = false;
  }

  /**
   * Function which runs on every route change
   */
  public changeOfRoutes(): void {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (localStorage.getItem('username') != null && (event.url === '/login' || event.url === '/') || event.url === '/registration') {
          this.router.navigate(['/company']);
        } else if (localStorage.getItem('username') === null &&
        (event.url === '/company/list' || event.url === '/document/list' || event.url === '/registration'))
        {
          this.router.navigate(['/login']);
        } else if (localStorage.getItem('username') != null)
        {
          this.showHeaderSidebar = true;
        } else 
        {
          this.showHeaderSidebar = false;
        }
      }
    });
  }
}
