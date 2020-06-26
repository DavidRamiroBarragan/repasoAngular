import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiKey = '515f378a95ecec04875b1d0cefac12df';
  private urlMoviedv = 'https://api.themoviedb.org/3';
  peliculasEncontradas: any[];

  constructor(private http: HttpClient) { }

  getPopulares() {
    const url = `${this.urlMoviedv}/movie/popular?api_key=${this.apiKey}&language=es&sort_by=popularity.desc`;
    return this.http.get(url).pipe(
      pluck('results'),
    );
  }

  searchMovie(texto: string) {
    const url = `${this.urlMoviedv}/search/movie?api_key=${this.apiKey}&query=${texto}`;
    return this.http.get(url);
  }

  getCartelera(): Observable<any[]> {
    const url = `${this.urlMoviedv}/movie/now_playing?api_key=${this.apiKey}&language=es-ES&page=1`;
    return this.http.get(url).pipe(
      pluck('results'),
    );
  }

  getPopularesInfantiles() {
    const url = `${this.urlMoviedv}/discover/movie?api_key=${this.apiKey}&language=es&sort_by=popularity.desc&certification_country=US&certification.lte=G&include_adult=false`;
    return this.http.get(url).pipe(pluck('results'));
  }

  searchPeliculas(termino: string) {
    const url = `${this.urlMoviedv}/search/movie?api_key=${this.apiKey}&language=es&query=${termino}&page=1&include_adult=false`;
    return this.http.get(url)
      .pipe(
        pluck('results'),
        map((data: any[]) => {
          this.peliculasEncontradas = data;
          return this.peliculasEncontradas;
        })
      );
  }

  getPeliculaById(movieId: string) {
    const url = `${this.urlMoviedv}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }
}
