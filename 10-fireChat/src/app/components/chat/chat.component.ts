import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Mensaje } from '../../models/mensaje.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  public mensaje: string = '';
  public elemento: any;

  constructor(public chatService: ChatService, public auth: AuthService) { }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
    this.chatService.cargarMensajes().subscribe(() => {
      setTimeout(() => {
        this.elemento.scrollTo = this.elemento.scrollHeight;
      }, 20);

    }
    );
  }

  enviarMensaje() {
    if (this.mensaje.length === 0) {
      return;
    }
    this.chatService.agregarMensaje(this.mensaje)
      .then(() => this.mensaje = '')
      .catch(error => console.log(error.message));
  }

}
