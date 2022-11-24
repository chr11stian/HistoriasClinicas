import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "AnemiaGestantes",
})
export class AnemiaGestantes implements PipeTransform {
  transform(valor: string): any {
    let number = parseFloat(valor);
    if (valor == "") {
      return -1;
    } else {
      if (number < 11) {
        return 1;
      } else if (number >= 11) {
        return 0;
      }
    }
  }
}
