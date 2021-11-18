import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-control-crecimiento',
  templateUrl: './control-crecimiento.component.html',
  styleUrls: ['./control-crecimiento.component.css']
})
export class ControlCrecimientoComponent implements OnInit {
  stateOptions: any[];
  controlCrecimientoFG: FormGroup;
  expandir: boolean=true; 

  constructor(private fb: FormBuilder) { 
    this.stateOptions = [{label: 'SI', value: true},
                          {label: 'NO', value: false}];
  }

  ngOnInit(): void {
    this.fetchControlCrecimiento();
    
  }
  fetchControlCrecimiento() {
    this.controlCrecimientoFG = this.fb.group({          
      RN1peso: ["", Validators.required],
      RN1talla: ["", Validators.required],
      RN1fecha: ["", Validators.required],
      RN2peso: ["", Validators.required],
      RN2talla: ["", Validators.required],
      RN2fecha: ["", Validators.required],
      Menor1peso: ["", Validators.required],
      Menor1talla: ["", Validators.required],
      Menor1fecha: ["", Validators.required],
      Menor2peso: ["", Validators.required],
      Menor2talla: ["", Validators.required],
      Menor2fecha: ["", Validators.required],
      Menor3peso: ["", Validators.required],
      Menor3talla: ["", Validators.required],
      Menor3fecha: ["", Validators.required],
      Menor4peso: ["", Validators.required],
      Menor4talla: ["", Validators.required],
      Menor4fecha: ["", Validators.required],
      Menor5peso: ["", Validators.required],
      Menor5talla: ["", Validators.required],
      Menor5fecha: ["", Validators.required],
      Menor6peso: ["", Validators.required],
      Menor6talla: ["", Validators.required],
      Menor6fecha: ["", Validators.required],
      Menor7peso: ["", Validators.required],
      Menor7talla: ["", Validators.required],
      Menor7fecha: ["", Validators.required],
      Menor8peso: ["", Validators.required],
      Menor8talla: ["", Validators.required],
      Menor8fecha: ["", Validators.required],
      Menor9peso: ["", Validators.required],
      Menor9talla: ["", Validators.required],
      Menor9fecha: ["", Validators.required],
      Menor10peso: ["", Validators.required],
      Menor10talla: ["", Validators.required],
      Menor10fecha: ["", Validators.required],
      Menor11peso: ["", Validators.required],
      Menor11talla: ["", Validators.required],
      Menor11fecha: ["", Validators.required],
      Anio_1peso: ["", Validators.required],
      Anio_1talla: ["", Validators.required],
      Anio_1fecha: ["", Validators.required],
      Anio_2peso: ["", Validators.required],
      Anio_2talla: ["", Validators.required],
      Anio_2fecha: ["", Validators.required],
      Anio_3peso: ["", Validators.required],
      Anio_3talla: ["", Validators.required],
      Anio_3fecha: ["", Validators.required],
      Anio_4peso: ["", Validators.required],
      Anio_4talla: ["", Validators.required],
      Anio_4fecha: ["", Validators.required],
      Anio_5peso: ["", Validators.required],
      Anio_5talla: ["", Validators.required],
      Anio_5fecha: ["", Validators.required],
      Anio_6peso: ["", Validators.required],
      Anio_6talla: ["", Validators.required],
      Anio_6fecha: ["", Validators.required],
      Anio2_1peso: ["", Validators.required],
      Anio2_1talla: ["", Validators.required],
      Anio2_1fecha: ["", Validators.required],
      Anio2_2peso: ["", Validators.required],
      Anio2_2talla: ["", Validators.required],
      Anio2_2fecha: ["", Validators.required],
      Anio2_3peso: ["", Validators.required],
      Anio2_3talla: ["", Validators.required],
      Anio2_3fecha: ["", Validators.required],
      Anio2_4peso: ["", Validators.required],
      Anio2_4talla: ["", Validators.required],
      Anio2_4fecha: ["", Validators.required],
      Anio3_1peso: ["", Validators.required],
      Anio3_1talla: ["", Validators.required],
      Anio3_1fecha: ["", Validators.required],
      Anio3_2peso: ["", Validators.required],
      Anio3_2talla: ["", Validators.required],
      Anio3_2fecha: ["", Validators.required],
      Anio3_3peso: ["", Validators.required],
      Anio3_3talla: ["", Validators.required],
      Anio3_3fecha: ["", Validators.required],
      Anio3_4peso: ["", Validators.required],
      Anio3_4talla: ["", Validators.required],
      Anio3_4fecha: ["", Validators.required],
      Anio4_1peso: ["", Validators.required],
      Anio4_1talla: ["", Validators.required],
      Anio4_1fecha: ["", Validators.required],
      Anio4_2peso: ["", Validators.required],
      Anio4_2talla: ["", Validators.required],
      Anio4_2fecha: ["", Validators.required],
      Anio4_3peso: ["", Validators.required],
      Anio4_3talla: ["", Validators.required],
      Anio4_3fecha: ["", Validators.required],
      Anio4_4peso: ["", Validators.required],
      Anio4_4talla: ["", Validators.required],
      Anio4_4fecha: ["", Validators.required],
      Anio5peso: ["", Validators.required],
      Anio5talla: ["", Validators.required],
      Anio5fecha: ["", Validators.required],
      Anio6peso: ["", Validators.required],
      Anio6talla: ["", Validators.required],
      Anio6fecha: ["", Validators.required],
      Anio7peso: ["", Validators.required],
      Anio7talla: ["", Validators.required],
      Anio7fecha: ["", Validators.required],
      Anio8peso: ["", Validators.required],
      Anio8talla: ["", Validators.required],
      Anio8fecha: ["", Validators.required],
      Anio9peso: ["", Validators.required],
      Anio9talla: ["", Validators.required],
      Anio9fecha: ["", Validators.required]
    });    
    console.log("control crecimiento", this.controlCrecimientoFG);
    
  }

}
