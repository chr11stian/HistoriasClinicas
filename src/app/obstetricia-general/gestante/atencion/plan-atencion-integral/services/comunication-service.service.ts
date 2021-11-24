import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComunicationServiceService {
  // mensajeId:string;
  // private enviarMensajeSubject=new Subject<string>();
  // enviarMensajeObservable=this.enviarMensajeSubject.asObservable();
  // enviarMensaje(mensaje:string){
  //   this.mensajeId=mensaje;
  //   this.enviarMensajeSubject.next(mensaje);
  // }
  idPacienteCompartido:string='valor inicial';
  nombrePaciente:string='sin nombre';
  apellidosPaciente:string="sin apellido"
  constructor() { }
}
