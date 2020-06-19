import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  ingresar(proveedor: string) {
    if (proveedor === 'google') {
      this.auth.loginGoogle();
    }

    this.auth.loginTwitter();


  }

    logout() {
    this.auth.logout();
  }

}
