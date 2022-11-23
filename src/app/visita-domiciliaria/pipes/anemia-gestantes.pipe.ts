import { Pipe,PipeTransform } from '@angular/core';
@Pipe({
    name:'AnemiaGestantesPipe'
})

export class AnemiaGestantes implements PipeTransform{
      transform(valor:string):any {
      if(parseFloat(valor)<11){
            return "SI";
      }else if(parseFloat(valor)>=11){
            return "NO";
      }else if(valor==""){
            return "SIN VALOR";
      }
      }
}