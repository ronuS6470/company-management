import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'cmp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  title = 'company-management';
  
  showHeaderSidebar: boolean = false; //showHeaderSidebar to hide and show header and sidebar wherever needed.

  ngOnInit() {
  }

  constructor(private router: Router) {
    // on route change to '/login' and '/registration', set the variable showHead to false
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login' || event['url'] == '/registration') { //if url is /login or /registration then showHeaderSidebar will be false
            this.showHeaderSidebar = false;
          } else {
              this.showHeaderSidebar = true;
          }
        }
      });
    }
}
