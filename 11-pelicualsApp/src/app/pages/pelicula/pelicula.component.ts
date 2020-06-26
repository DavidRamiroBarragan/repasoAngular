import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  idPelicula: string;

  pelicula: any;
  constructor(private activatedRoute: ActivatedRoute, private peliculasService: PeliculasService) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.idPelicula = id;
    });
   }

  ngOnInit(): void {
    this.peliculasService.getPeliculaById(this.idPelicula).subscribe(
        pelicula => {
          this.pelicula = pelicula;
        }
      );
  }

}
