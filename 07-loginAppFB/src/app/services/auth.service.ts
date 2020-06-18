import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Iniciar con email y password
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyAkxn71dpulTW78_dswpSeX6x87gQofR28';
  userToken: string;

  constructor(private http: HttpClient) { }

  logout() {
    this.userToken = '';
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {
    const { email, password } = usuario;
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`, authData
    ).pipe(
      map((resp: any) => {
        this.guardarToken(resp.idToken);
        return resp;
    })
    );
  }

  registrarNuevoUsuario(usuario: UsuarioModel) {

    const { email, password } = usuario;
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`, authData
    ).pipe(
      map((resp: any) => {
        this.guardarToken(resp.idToken);
        return resp;
    })
    );

  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    const hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  private leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }

  estaAutenticado(): boolean {
    if (typeof this.userToken === 'undefined') {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
