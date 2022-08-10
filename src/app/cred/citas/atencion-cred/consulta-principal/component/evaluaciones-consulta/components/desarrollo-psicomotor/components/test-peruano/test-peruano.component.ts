import { Component, OnInit } from "@angular/core";
import { TestPeruano } from "../../services/test-peruano/test-peruano.service";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { dato } from "../../../../../../../../models/data";
import { ConsultaGeneralService } from "../../../../../../services/consulta-general.service";
import { MessageService } from "primeng/api";
import { LoginComponent } from "../../../../../../../../../../login/login.component";

@Component({
  selector: "app-test-peruano",
  templateUrl: "./test-peruano.component.html",
  styleUrls: ["./test-peruano.component.css"],
  providers: [TestPeruano],
})
export class TestPeruanoComponent implements OnInit {
  arregloForm: FormArray;
  displayDialog: boolean = false;
  listaMeses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 18, 21, 24, 30];
  imagenes:any[]
  listaTestPeruano:any[]
  edadMeses:number
  edadMax:number=5
  constructor(
    private testDesarrollo: TestPeruano,
    private form: FormBuilder,
    private consultaGeneralService: ConsultaGeneralService,
    private messageService: MessageService
  ){
    this.buildFormArray();
    this.testDesarrollo.getImagenes().then((data) => {
      this.imagenes= data;
    });
  }


  ngOnInit(): void {
   
  }
  //rehaciendo
  ruta(sale: any, mes: number) {
    return sale[`img_${mes}`];
  }
  buildFormArray() {
    this.arregloForm = new FormArray([
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
    ]);
  }
  pruebas() {
    console.log("estado Arreglo", this.arregloForm);
  }
}
