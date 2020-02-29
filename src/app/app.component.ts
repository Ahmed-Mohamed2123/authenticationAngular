import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-meanStack';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.aotoAuthUser();
    
  }

}
