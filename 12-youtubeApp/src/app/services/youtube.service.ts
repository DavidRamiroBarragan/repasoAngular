import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video, YoutubeModel } from '../models/youtube.models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private API_KEY = 'AIzaSyBu7BV3Jp1Md1Vod-iGwWgD7GlEnEyvLL0';
  private UPLOADS = 'UUuaPTYj15JSkETGnEseaFFg';
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private nextPageToken = '';

  constructor(private http: HttpClient) { }

  getVideos(): Observable<Video[]> {
    const url = `${this.youtubeUrl}/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.UPLOADS)
      .set('key', this.API_KEY);

    return this.http.get<YoutubeModel>(url, { params })
      .pipe(
        map((response => {
        this.nextPageToken = response.nextPageToken;
        return response.items.map(video => video.snippet);
      })));
  }

}
