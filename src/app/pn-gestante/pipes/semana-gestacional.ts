import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
    name:'SemanaGestacional'
})

export class SemanaGestacional implements PipeTransform{
    transform(date:string):any{
        if (date) {
            let today = new Date().getTime();
            let fum: any =date.split("/");
            console.log(fum);
            let newDay: any = fum[0];
            let newMonth: any =fum[1];
            let newYear: any = fum[2];
            let auxBirth = newYear + '/' + newMonth + '/' + newDay ;
            let auxFUR = new Date(auxBirth).getTime();
            auxFUR = auxFUR + 0;
            let auxWeek = today - auxFUR;
            let edadGestacional = Math.trunc(auxWeek / (1000 * 60 * 60 * 24));
            let semanas=Math.trunc(edadGestacional / 7);
            let dias=edadGestacional % 7
            if(semanas>39){
                return `finalizado`;
            }else{
                return `${Math.abs(semanas)} semanas ${Math.abs(dias)} dias`;
            }
        }
    }
            
}