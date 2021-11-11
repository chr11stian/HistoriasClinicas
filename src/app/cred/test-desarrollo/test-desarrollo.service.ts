import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class TestDesarrollo {

   constructor(private http: HttpClient) { }

   getImagenes() {
      return this.http.get<any>('/assets/data/test-desarollo-img.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
   }
}
