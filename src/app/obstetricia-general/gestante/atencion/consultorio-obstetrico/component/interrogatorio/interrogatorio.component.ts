import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import { ConsultasService } from "../../services/consultas.service";

@Component({
  selector: "app-interrogatorio",
  templateUrl: "./interrogatorio.component.html",
  styleUrls: ["./interrogatorio.component.css"],
  providers: [DialogService]
})
export class InterrogatorioComponent implements OnInit {
  form: FormGroup;
  formExamenFetal: FormGroup;
  formExamFisico: FormGroup;
  listaSituacion = [
    { name: "Lontitudinal", code: "Lontitudinal" },
    { name: "Transversal", code: "Transversal" },
    { name: "No Aplica", code: "No Aplica" },
  ];
  listaPresentacion = [
    { name: "Cefalica", code: "Cefalica" },
    { name: "Pelvica", code: "Pelvica" },
    { name: "No Aplica", code: "No Aplica" },
  ];
  listaPosicion = [
    { name: "Derecha", code: "Derecha" },
    { name: "Izquierda", code: "Izquierda" },
    { name: "No Aplica", code: "No Aplica" },
  ];
  listaEdema = [
    { name: "+" },
    { name: "++" },
    { name: "+++" },
    { name: "se" }

  ]
  interrogatorioData: any;
  ref: DynamicDialogRef;
  encargadoDialog: boolean = false;
  examenesFetales: any;
  listaExamenesFetos: any[] = [];
  listaOtrosPruebasFisicas: any[] = [];
  examenesFisicosDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialog: DialogService,
    private consultaObstetricaService: ConsultasService,
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm() {
    this.form = this.fb.group({
      temperatura: new FormControl(""),
      presion: new FormControl(""),
      fc: new FormControl(""),
      fr: new FormControl(""),
      peso: new FormControl(""),
      talla: new FormControl(""),
      imc: new FormControl(""),
      apetito: new FormControl(""),
      sed: new FormControl(""),
      suenos: new FormControl(""),
      estadoAnimo: new FormControl(""),
      orina: new FormControl(""),
      deposiciones: new FormControl(""),
      motivoConsulta: new FormControl(""),
      tiempoEnfermedad: new FormControl(""),
      observaciones: new FormControl(""),
      piel: new FormControl(""),
      mucosas: new FormControl(""),
      cabeza: new FormControl(""),
      cuello: new FormControl(""),
      cardioVasc: new FormControl(""),
      pulmones: new FormControl(""),
      mamas: new FormControl(""),
      pezones: new FormControl(""),
      abdomen: new FormControl(""),
      examenFisicoOtro: new FormControl(""),
      alturaUterina: new FormControl(""),
      selectSituacion: new FormControl(""),
      selectPresentacion: new FormControl(""),
      listaPosicion: new FormControl(""),
      fetal: new FormControl(""),
      edema: new FormControl(""),
      clinico: new FormControl(""),
      movimientoFetal: new FormControl(""),
      latidosCardiacosFetales: new FormControl(""),
      miembrosInferiores: new FormControl(""),
      osteotendinoso: new FormControl(""),
      genitalesExter: new FormControl(""),
      vagina: new FormControl(""),
      cuelloUterino: new FormControl(""),
      semanas: new FormControl(""),
      dias: new FormControl(""),
      obsExamFisico: new FormControl(""),
    });

    this.formExamenFetal = this.fb.group({
      movimientoFetal: new FormControl(""),
      selectSituacion: new FormControl(""),
      selectPresentacion: new FormControl(""),
      selectPosicion: new FormControl(""),
      latidosCardiacos: new FormControl(""),
    })

    this.formExamFisico = this.fb.group({
      examName: new FormControl(""),
      examResult: new FormControl(""),
    })
  }

  recuperarDatos() {
    this.interrogatorioData = {
      nroHcl: '10101013',
      nroAtencion: 1,
      nroControlSis: 1,
      nroEmbarazo: 1,
      tipoDoc: 'DNI',
      nroDoc: '10101013',
      funcionesVitales: {
        t: this.form.value.temperatura,
        presionSistolica: this.form.value.presion,
        fc: this.form.value.fc,
        fr: this.form.value.fr,
        peso: this.form.value.peso,
        talla: this.form.value.talla,
        imc: this.form.value.imc,
        presionDiastolica: 70,
      }
      ,
      funcionesBiologicas: [
        { funcion: 'Apetito', valor: this.form.value.apetito },
        { funcion: 'Sed', valor: this.form.value.sed },
        { funcion: 'Sueños', valor: this.form.value.suenos },
        { funcion: 'Estado Animo', valor: this.form.value.estadoAnimo },
        { funcion: 'Orina', valor: this.form.value.orina },
        { funcion: 'Deposiciones', valor: this.form.value.deposiciones },
      ],
      interrogatorio: [
        { pregunta: 'Motido de consulta', respuesta: this.form.value.motivoConsulta },
        { pregunta: 'Tiempo de enfermedad', respuesta: this.form.value.tiempoEnfermedad },
        { pregunta: 'observacion', respuesta: this.form.value.observaciones },
      ],
      examenesFisicos: [
        { funcion: 'piel', valor: this.form.value.piel },
        { funcion: 'mucosas', valor: this.form.value.mucosas },
        { funcion: 'cabeza', valor: this.form.value.cabeza },
        { funcion: 'cuello', valor: this.form.value.cuello },
        { funcion: 'cardioVasc', valor: this.form.value.cardioVasc },
        { funcion: 'pulmones', valor: this.form.value.pulmones },
        { funcion: 'mamas', valor: this.form.value.mamas },
        { funcion: 'pezones', valor: this.form.value.pezones },
        { funcion: 'abdomen', valor: this.form.value.abdomen },
      ],
      examenesObstetricos: {
        alturaUterina: this.form.value.alturaUterina,
        miembrosInferiores: this.form.value.miembrosInferiores,
        reflejoOsteotendinoso: this.form.value.osteotendinoso,
        genitalesExternos: this.form.value.genitalesExter,
        vagina: this.form.value.vagina,
        cuelloUterino: this.form.value.cuelloUterino,
        edema: this.form.value.edema,
        semanas: this.form.value.semanas,
        dias: this.form.value.dias,
      },
      examenesFetos: this.listaExamenesFetos,
      examenFisicoObservaciones: this.form.value.obsExamFisico
    }
  }

  asignarDatos() {
    this.form.patchValue({ pulmones: '' })
  }

  guardarDatos() {
    this.recuperarDatos();
    console.log('data to save ', this.interrogatorioData);
    // this.consultaObstetricaService.addConsultas('DNI', '10101013', this.interrogatorioData).subscribe((res: any) => {
    //   console.log('rpta ', res.object);
    // });


    this.consultaObstetricaService.updateConsultas(this.interrogatorioData).subscribe((res: any) => {
      console.log('rpta', res);
    });
  }

  openDialogExamenesFeto() {
    this.formExamenFetal.reset();
    this.encargadoDialog = true;
  }

  recuperarDatosExamFet() {
    this.examenesFetales = {
      movimientosFetales: this.formExamenFetal.value.movimientoFetal,
      situacion: this.formExamenFetal.value.selectSituacion,
      presentacion: this.formExamenFetal.value.selectPresentacion,
      posicion: this.formExamenFetal.value.selectPosicion,
      fcf: this.formExamenFetal.value.latidosCardiacos
    }
  }

  btnGuardar() {
    console.log('form ', this.formExamenFetal.value.selectSituacion)
    this.recuperarDatosExamFet();
    this.encargadoDialog = false;
    this.listaExamenesFetos.push(this.examenesFetales)
  }

  btnCancelar() {
    this.encargadoDialog = false;

  }
  openDialogExamenesFinal() {
    this.formExamFisico.reset();
    this.examenesFisicosDialog = true;
  }

  btnGuardarExamFis() {
    let auxExamFis = {
      funcion: this.formExamFisico.value.examName,
      valor: this.formExamFisico.value.examResult
    }

    this.listaOtrosPruebasFisicas.push(auxExamFis);
    this.examenesFisicosDialog = false;
  }

  btnCancelarExamFis() {
    this.examenesFisicosDialog = false;
  }
}
