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
    // on route change to '/login' and '/registration', set the variable showHead to false
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] === '/login' || event['url'] === '/registration' || event['url'] === '/')
        { 
          // if url is /login or /registration then showHeaderSidebar will be false
          this.showHeaderSidebar = false;
        } else {
          this.showHeaderSidebar = true;
        }
      }
    });
  }

  /**
   * Function which runs on every route change
   */
  public changeOfRoutes(): void {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (localStorage.getItem('username') != null && (event.url === '/login' || event.url === '/')) {
          this.router.navigate(['/company']);
        }
      }
    });
  }
}
