import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { KeyData } from "../models/fua";
import { FuaService } from "../services/fua.service";

@Component({
  selector: "app-atenion",
  templateUrl: "./atenion.component.html",
  styleUrls: ["./atenion.component.css"],
})
export class AtenionComponent implements OnInit {
  formDeLaAtencion: FormGroup;
  formAtencion: FormGroup;
  formPrestacional: FormGroup;
  formReferencia: FormGroup;
  formActiPreventivas: FormGroup;
  data: any[] = [];
  /**ngModels */
  atencionDirecta: string;
  alta: boolean;
  cita: boolean;
  hospitalizacion: boolean;
  referido: string;
  keyData: KeyData;
  /**Fin ngModels */
  listReferido = [
    { name: "Emergencia", value: "EMERGENCIA" },
    { name: "Consulta Externa", value: "CONSULTA_EXTERNA" },
    { name: "Apoyo al Diagnostico", value: "APOYO_AL_DIAGNOSTICO" },
  ];
  sino = [
    { label: "Si", value: "SI" },
    { label: "No", value: "NO" },
  ];
  idFUA: string;

  constructor(
    private form: FormBuilder,
    private fuaService: FuaService
  ) {
    this.idFUA = JSON.parse(localStorage.getItem("dataFUA")).idFUA;
    console.log('id de FUA ', this.idFUA);
    this.getDataFUA();
  }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.formDeLaAtencion = this.form.group({
      apPaterno: new FormControl(""),
      fecha: new FormControl(""),
      // // ApMaterno: new FormControl(''),
      // // nombres: new FormControl(''),
      // aplica: new FormControl(''),
      // referencia: new FormControl(''),
    });
    this.formAtencion = new FormGroup({
      fechaAtencion: new FormControl(""),
      fecha: new FormControl(""),
    });
    this.formPrestacional = new FormGroup({
      nroAutorizacion: new FormControl(""),
    });
    this.formReferencia = new FormGroup({
      codRenaes: new FormControl(""),
      nombreIpress: new FormControl(""),
      nroHojaReferencia: new FormControl(""),
    });
    this.formActiPreventivas = new FormGroup({
      peso: new FormControl(""),
      talla: new FormControl(""),
      pa: new FormControl(""),
      corteTardio: new FormControl(""),
    });
  }

  save() {
    console.log("recuperar campo", this.formActiPreventivas.value.corteTardio);
  }

  async getDataFUA() {
    await this.fuaService.getPromiseIpressAseguradoxidFUA(this.idFUA).then((data) => {
      console.log('data ', data);
      this.keyData = data;
    });
    // console.log('idConsulta ', this.keyData.idConsulta, 'codPrestacion ', this.keyData.codPrestacion, 'idFUA ', this.keyData.id);
    await this.fuaService.getPromiseSegundaParteFUA(this.keyData.idConsulta, this.keyData.id, this.keyData.codPrestacion).then((data)=>{
      
    })
  }
}
