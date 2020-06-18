import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('usuario')) {
      this.usuario.email = localStorage.getItem('usuario');
      this.recordarme = true;
      }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.auth.login(this.usuario).subscribe(data => {
      this.router.navigateByUrl('/home');

      if (this.recordarme) {
        localStorage.setItem('usuario', this.usuario.email);
      }
    }, error => {
        console.log('Error');
    });
  }
}
