import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
    name:'fechaPipe'
})

export class EsFecha implements PipeTransform{
    transform(valor:string):string {
        let fecha=new Date(valor);
        let dia = fecha.getDay();
        let mes=fecha.getMonth();
        let anio=fecha.getFullYear()
        return dia?`${dia}/${mes+1}/${anio}`:valor;
}
}