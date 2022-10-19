import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
    name:'EstadoGestacional'
})

export class EstadoGestacional implements PipeTransform{
    transform(date:any):any {
    if (date) {
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

        if(semanas<40){
            return `Gestante`;
        }else if(semanas>40 && semanas<44){
            return `Puerpera`;
        }else{
            return `No Gestante`
        }
        }
    }
}