import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
    name:'SemanaGestacional'
})

export class SemanaGestacional implements PipeTransform{
    transform(date:string):any{
        if (date) {
            let today = new Date().getTime();
            let auxFUR = new Date(date).getTime();
            auxFUR = auxFUR + 0;
            let auxWeek = today - auxFUR;
            let edadGestacional = Math.trunc(auxWeek / (1000 * 60 * 60 * 24));
            let semanas=Math.trunc(edadGestacional / 7);
            let dias=edadGestacional % 7
            if(semanas>39){
                return `finalizado`;
            }else{
                return `${semanas} semanas ${dias} dias`;
            }
        }
    }
            
}