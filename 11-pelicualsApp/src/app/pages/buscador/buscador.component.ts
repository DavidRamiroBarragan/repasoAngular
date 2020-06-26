import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  termino: string;
  peliculas$: Subscription;
  peliculasEncontradas: any[];

  constructor(private peliculasService: PeliculasService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.peliculasEncontradas = this.peliculasService.peliculasEncontradas;

    this.activatedRoute.params.subscribe(({ termino }) => {
      if (termino) {
        this.termino = termino;
        this.buscar();
      }
    });
  }

  buscar() {
    if (!this.termino) {
      return;
    }
    this.peliculasService.searchPeliculas(this.termino).subscribe(
      (data: any[]) => this.peliculasEncontradas = data
    );
  }

}
