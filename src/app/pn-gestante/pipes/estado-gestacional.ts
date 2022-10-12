import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
    name:'EstadoGestacional'
})

export class EstadoGestacional implements PipeTransform{
    transform(date:string):string {
    let first=new Date(date)
    let second = new Date();
    if(first>second){
        return `Gestante`;
    }else{
        return `No gestante`;
    }
    
    }
}