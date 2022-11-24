import { Pipe,PipeTransform } from '@angular/core';
@Pipe({
    name:'AnemiaNinios'
})

export class AnemiaNinios implements PipeTransform{
      transform(valor:string):any {
      let number=valor!=""?parseFloat(valor):"";
      if(valor==""){
            return -1;
      }else{
            if(number<10){
                  return 1;
            }else if(number>=10){
                  return 0;
            }
      }
      }
}