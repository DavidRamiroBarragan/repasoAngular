import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   chats: Observable<any[]>;
  constructor(db: AngularFirestore, public auth: AuthService) {
    this.chats = db.collection('chats').valueChanges();
  }
}
