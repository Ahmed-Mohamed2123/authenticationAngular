import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  
  userIsAuthenticated = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserId();
    this.authService.aotoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  logout() {
    this.authService.logout();
  }

}
