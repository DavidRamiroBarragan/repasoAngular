import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  image = 'http://image.tmdb.org/t/p/w500';

  transform(pelicula: any, poster = false): string {

    if (poster) {
      return `${this.image}/${pelicula.poster_path}`;
    }

    if (pelicula?.backdrop_path) {
      return `${this.image}/${pelicula.backdrop_path}`;
    } else if (pelicula?.poster_path){
       return `${this.image}/${pelicula.poster_path}`;
    }
    return 'assets/images/no-image.png';
  }

}
