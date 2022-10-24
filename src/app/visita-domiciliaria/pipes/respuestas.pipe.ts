import { Pipe,PipeTransform } from '@angular/core';
@Pipe({
    name:'fechaPipe'
})

export class EsFecha implements PipeTransform{
    transform(valor:string):any {
        let array1=valor.split('T')
        let array2=valor.split(' ')
        if(array1.length>2 || array2.length>2){
            return valor;
        }
        else if(array1.length==2){
            let fecha=new Date(array1[0]).toLocaleDateString();
            return fecha;
        }else if(array2.length==2){
            let fecha=new Date(array2[0]).toLocaleDateString();
            return fecha;
        }    
}
}