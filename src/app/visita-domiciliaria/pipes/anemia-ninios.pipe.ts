import { Pipe,PipeTransform } from '@angular/core';
@Pipe({
    name:'AnemiaNiniosPipe'
})

export class AnemiaNinios implements PipeTransform{
      transform(valor:string):any {
      if(parseFloat(valor)<10){
            return "SI";
      }else if(parseFloat(valor)>=10){
            return "NO";
      }else if(valor==""){
            return "SIN VALOR";
      }
      }
}