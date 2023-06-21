import { Injectable } from '@angular/core';
import { GifsModule } from '../gifs.module';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey: string = 'nBhqXxdpueCGeGen6ZdEJAmZHY0ZwpBa';

  constructor( private http: HttpClient ) { }

  get tagsHistory() {
    return [...this._tagsHistory]

  }

  private organizeHistory(tag: string ) {
    tag = tag.toLocaleLowerCase();

    if ( this._tagsHistory.includes(tag) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !==tag );
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);

  }

  searchTag(tag:string):void {
    if (tag.length===0 ) return;
    this.organizeHistory(tag);

    this.http.get( 'https://api.giphy.com/v1/gifs/search?api_key=nBhqXxdpueCGeGen6ZdEJAmZHY0ZwpBa&q=diablo iv&limit=20' )
    .subscribe( resp => {
      console.log(resp);
    })


  }

}
