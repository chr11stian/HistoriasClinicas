import { Pipe,PipeTransform } from '@angular/core';
import { GestanteModel } from '../interfaces/GestanteModel';

@Pipe({
    name:'EstadoGestacional'
})

export class EstadoGestacional implements PipeTransform{
    transform(gestante:GestanteModel):any {
    if (gestante) {
        let date=gestante.fur;
        let aborto=gestante.aborto;
        let fum: any =date.split("/");
        let newDay: any = fum[0];
        let newMonth: any =fum[1];
        let newYear: any = fum[2];
        let auxBirth = newYear + '/' + newMonth + '/' + newDay ;
        let today = new Date().getTime();
        let auxFUR = new Date(auxBirth).getTime();
        auxFUR = auxFUR + 0;
        let auxWeek = today - auxFUR;
        let edadGestacional = Math.trunc(auxWeek / (1000 * 60 * 60 * 24));
        let semanas=Math.trunc(edadGestacional / 7);
        let dias=edadGestacional % 7

        if(semanas<40 && aborto==false){
            return `Gestante`;
        }else if(semanas>=40 && semanas<=47){
            return `Puerpera`;
        }else if(semanas<40 && aborto==true){
            return `Puerpera`
        }
        }
    }
}