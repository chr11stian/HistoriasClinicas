import { Pipe,PipeTransform } from '@angular/core';
@Pipe({
    name:'AnemiaPuerperasPipe'
})

export class AnemiaPuerperas implements PipeTransform{
      transform(valor:string):any {
      if(parseFloat(valor)<12){
            return "SI";
      }else if(parseFloat(valor)>=12){
            return "NO";
      }else if(valor==""){
            return "SIN VALOR";
      }
      }
}