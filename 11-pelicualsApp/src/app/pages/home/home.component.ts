import { Component, OnInit, OnDestroy } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  cartelera$: Subscription;
  peliculas$: Subscription;
  infantiles$: Subscription;
  peliculas: any[] = [];
  peliculasCartelera: any[];
  peliculasInfantiles: any[];

  constructor(private peliculasService: PeliculasService) {
  }

  ngOnInit(): void {
    this.peliculas$ = this.peliculasService.getPopulares().subscribe(
      (results: any[]) => this.peliculas = results
    );
    this.cartelera$ = this.peliculasService
      .getCartelera()
      .subscribe(peliculas => this.peliculasCartelera = peliculas);
    this.infantiles$ = this.peliculasService.getPopularesInfantiles()
      .subscribe(
        (peliculas: any[]) => {
          return this.peliculasInfantiles = peliculas;
        }
    );

  }

    ngOnDestroy(): void {
      this.cartelera$.unsubscribe();
      this.peliculas$.unsubscribe();
      this.infantiles$.unsubscribe();
  }

}
