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
      if (number < 12) {
        return 1;
      } else if (number >= 12) {
        return 0;
      }
    }
  }
}
