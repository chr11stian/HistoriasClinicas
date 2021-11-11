import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-partos",
  templateUrl: "./partos.component.html",
  styleUrls: ["./partos.component.css"],
})
export class PartosComponent implements OnInit {
  treeOptionsOptions: any[];
  twoOptions: any[];
  myGroup: FormGroup;

  constructor(public fb: FormBuilder) {
    this.twoOptions = [
      { label: "Si", value: "Si" },
      { label: "No", value: "No" },
    ];
    this.treeOptionsOptions = [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "No Apli.", value: "no aplica" },
    ];
    this.buildForm();
  }
  buildForm() {
    this.myGroup = new FormGroup({
      hcmp: new FormControl("", [Validators.required]),
      pc: new FormControl("", [Validators.required]),
      orden: new FormControl("", Validators.required),
      referenciaIngreso: new FormControl("", Validators.required),
      pulsoMaterno: new FormControl("", Validators.required),
      presionArterial: new FormControl("", Validators.required),
      frecuenciaRespiratoria: new FormControl("", Validators.required),
      temperatura: new FormControl("", Validators.required),
      peso: new FormControl("", Validators.required),
      eg: new FormControl("", Validators.required),
      situacion: new FormControl("", Validators.required),
      posicion: new FormControl("", Validators.required),
      tamañoFetalAcorde: new FormControl("", Validators.required),
      inicio: new FormControl("", Validators.required),
      dilatacion: new FormControl("", Validators.required),
      presentacion: new FormControl("", Validators.required),
      alturaUterina: new FormControl("", Validators.required),
      fcf: new FormControl("", Validators.required),
      menbranas: new FormControl("", Validators.required),
      liquidoAmniotico: new FormControl("", Validators.required),
      fechaRuptura: new FormControl("", Validators.required),
      anasarca: new FormControl("", Validators.required),
      cianosis: new FormControl("", Validators.required),
      escotomas: new FormControl("", Validators.required),
      epigastralgia: new FormControl("", Validators.required),
      dolorDerecho: new FormControl("", Validators.required),
      hermaturia: new FormControl("", Validators.required),
      hipoOrtostatica: new FormControl("", Validators.required),
      ictericia: new FormControl("", Validators.required),
      petequies: new FormControl("", Validators.required),
      proteuniria: new FormControl("", Validators.required),
      corticoidesAntenatales: new FormControl("", Validators.required),
      semanaInicio: new FormControl("", Validators.required),
      cesaria: new FormControl("", Validators.required),
      aborto: new FormControl("", Validators.required),
      // cuarta fila
      terminacion: new FormControl("", Validators.required),
      desgarros: new FormControl("", Validators.required),
      posicionGestante: new FormControl("", Validators.required),
      duracion: new FormControl("", Validators.required),
      alumbramiento: new FormControl("", Validators.required),
      partoGrama: new FormControl("", Validators.required),
      muerteIntrauterina: new FormControl("", Validators.required),
      placenta: new FormControl("", Validators.required),
      partoAconpanante: new FormControl("", Validators.required),
      episiotomia: new FormControl("", Validators.required),
      ligaduraCordon: new FormControl("", Validators.required),
      indicacionPrincipalHubo: new FormControl("", Validators.required),
      indicacionPrincipalPartoOperatorio: new FormControl(
        "",
        Validators.required
      ),
      // quinta fila
      nivel: new FormControl("", Validators.required),
      partoLegrado: new FormControl("", Validators.required),
      neonato: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    // this.myGroup.valueChanges.pipe(debounceTime(350)).subscribe((value) => {
    //   console.log(value);
    // });
  }

  // ngDoCheck(): void {
  //   this.mostrarDatos();
  // }
  save() {
    console.log(this.myGroup.value);
  }
}
