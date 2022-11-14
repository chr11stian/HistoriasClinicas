import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VisitaDomiciliariaService } from '../services/visita-domiciliaria.service';

@Pipe({name: 'imagenSegura'})// pipe para transformar el src de la etiqueta img y mandar headers

export class ImagePipe implements PipeTransform {

constructor(private http: HttpClient, private sanitizer: DomSanitizer,private visitaDomiciliariaServicio:VisitaDomiciliariaService) {}

transform(url: string):Observable<SafeUrl> {
      const urlFoto =this.visitaDomiciliariaServicio.urlImagen(url);
      this.visitaDomiciliariaServicio.couch=true;
      return this.http
            .get(urlFoto, {responseType: 'blob' })//recuperar la imagen y guardar en un blob
            .pipe(map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val))));//crear url segura de la imagen local blob; Para no mostrar informacion sensible 
      }
}
