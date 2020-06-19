import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from '../models/mensaje.interface';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore, private auth: AuthService) {
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>(
      'chats',
      ref => ref.orderBy('createAt', 'desc').limit(5)
    );

    return this.itemsCollection.valueChanges().pipe(
      tap(console.log),
      map((mensajes: Mensaje[]) => {
        this.chats = mensajes.sort((mensajeA, mensajeB) => mensajeA.createAt - mensajeB.createAt);
      })
    );
  }

  agregarMensaje(texto: string) {
    const mensaje: Mensaje = {
      uid: this.auth.user.uid,
      nombre: this.auth.user.nombre,
      mensaje: texto,
      createAt: new Date().getTime()
    };

    return this.itemsCollection.add(mensaje);
  }
}
