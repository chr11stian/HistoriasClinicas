import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
    name:'EstadoGestacional'
})

export class SemanaGestacional implements PipeTransform{
    transform(date:string):string {
    let dateDiference = function (date1, date2) {
            date1 = Date.parse(date1);
            let diffInMs = Math.abs(date2 - date1);
            return diffInMs / (1000 * 60 * 60 * 24);
    }

    let formatoFecha=function(fecha){
            var mydate =fecha.split('/')
            return `${mydate[2]}-${mydate[1]}-${mydate[0]}`;
    }

    let fechaActual = Date.now();
    let fur=formatoFecha(date);
    let diference =(dateDiference(fur, fechaActual)/7);
    let semanas=Math.floor(diference);
    let dias=Math.floor(diference%2)
    if(semanas>38){
        return `finalizado`;
    }else{
        return `${semanas} semanas ${dias} dias`;
    }
    
    }
}