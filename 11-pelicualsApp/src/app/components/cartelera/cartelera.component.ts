import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent {

  cartelera$: Subscription;
  @Input() peliculasCartelera;
  @Input() titulo = 'Cartelera';

  constructor() { }

}
