import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatosGeneralesService } from 'src/app/consulta-generica/services/datos-generales/datos-generales.service';
import { MotivoConsulta } from 'src/app/core/models/consultaGenerica';

@Component({
  selector: 'app-motivo-consulta',
  templateUrl: './motivo-consulta.component.html',
  styleUrls: ['./motivo-consulta.component.css']
})
export class MotivoConsultaComponent implements OnInit {

  formMotivoConsulta: FormGroup;
  formVitalSigns: FormGroup;
  formPhysicalExam: FormGroup;
  formExtraData: FormGroup;
  formBiologicalFunctions: FormGroup;
  dataMotivoConsulta: MotivoConsulta;
  idConsulta: string;
  listaFuncionesBiologicas = [
    { name: "Conservado" },
    { name: "Alterado" }
  ];

  constructor(
    private consultaGeneralService: DatosGeneralesService,
  ) {
    this.inicializarForm();
    this.idConsulta = JSON.parse(localStorage.getItem('documento')).idConsulta;
    this.consultaGeneralService.searchConsultaDatosGenerales(this.idConsulta).subscribe((res:any)=>{

    })
  }

  ngOnInit(): void {
  }

  inicializarForm() {
    this.formMotivoConsulta = new FormGroup({
      detailMotivoFC: new FormControl('')
    });
    this.formVitalSigns = new FormGroup({
      temperatura: new FormControl(''),
      presionSistolica: new FormControl(''),
      presionDiastolica: new FormControl(''),
      fc: new FormControl(''),
      fr: new FormControl(''),
      peso: new FormControl(''),
      talla: new FormControl(''),
      imc: new FormControl(''),
      perimetroCefalico: new FormControl(''),
      obsSignosVitales: new FormControl('')
    });

    this.formPhysicalExam = new FormGroup({
      piel: new FormControl(""),
      cabeza: new FormControl(""),
      cara: new FormControl(""),
      cuello: new FormControl(""),
      torax: new FormControl(""),
      abdomen: new FormControl(""),
      columnaVert: new FormControl(""),
      extremidades: new FormControl(""),
      genitouriano: new FormControl(""),
      ano: new FormControl(""),
      obsExamenFisico: new FormControl(""),
    });
    this.formExtraData = new FormGroup({
      anamnesis: new FormControl(""),
      tiempoEnfermedad: new FormControl(""),
      formaInicio: new FormControl(""),
      curso: new FormControl(""),
      observacion: new FormControl(""),
    });
    this.formBiologicalFunctions = new FormGroup({
      apetito: new FormControl(""),
      sed: new FormControl(""),
      suenos: new FormControl(""),
      estadoAnimo: new FormControl(""),
      orina: new FormControl(""),
      deposiciones: new FormControl(""),
      apetitoDetalle: new FormControl(""),
      sedDetalle: new FormControl(""),
      suenosDetalle: new FormControl(""),
      estadoAnimoDetalle: new FormControl(""),
      orinaDetalle: new FormControl(""),
      deposicionesDetalle: new FormControl(""),
    })
  }
  recoverData() {
    this.dataMotivoConsulta = {
      id: this.idConsulta,
      funcionesBiologicas: [
        { funcion: 'APETITO', valor: this.formBiologicalFunctions.value.apetito, detalle: this.formBiologicalFunctions.value.apetitoDetalle },
        { funcion: 'SED', valor: this.formBiologicalFunctions.value.sed, detalle: this.formBiologicalFunctions.value.sedDetalle },
        { funcion: 'SUEÑOS', valor: this.formBiologicalFunctions.value.suenos, detalle: this.formBiologicalFunctions.value.suenosDetalle },
        { funcion: 'ESTADO ANIMO', valor: this.formBiologicalFunctions.value.estadoAnimo, detalle: this.formBiologicalFunctions.value.estadoAnimoDetalle },
        { funcion: 'ORINA', valor: this.formBiologicalFunctions.value.orina, detalle: this.formBiologicalFunctions.value.orinaDetalle },
        { funcion: 'DEPOSICIONES', valor: this.formBiologicalFunctions.value.deposiciones, detalle: this.formBiologicalFunctions.value.deposicionesDetalle },
      ],
      signosVitales: {
        temperatura: this.formVitalSigns.value.temperatura,
        presionSistolica: this.formVitalSigns.value.presionSistolica,
        presionDiastolica: this.formVitalSigns.value.presionDiastolica,
        fc: this.formVitalSigns.value.fc,
        fr: this.formVitalSigns.value.fr,
        peso: this.formVitalSigns.value.peso,
        talla: this.formVitalSigns.value.talla,
        imc: this.formVitalSigns.value.imc,
      },
      examenesFisicos: [
        { nombreExamen: 'PIEL', detalle: this.formPhysicalExam.value.piel },
        { nombreExamen: 'CABEZA', detalle: this.formPhysicalExam.value.cabeza },
        { nombreExamen: 'CARA', detalle: this.formPhysicalExam.value.cara },
        { nombreExamen: 'CUELLO', detalle: this.formPhysicalExam.value.cuello },
        { nombreExamen: 'TORAX', detalle: this.formPhysicalExam.value.torax },
        { nombreExamen: 'ABDOMEN', detalle: this.formPhysicalExam.value.abdomen },
        { nombreExamen: 'COLUMNA_VERT', detalle: this.formPhysicalExam.value.columnaVert },
        { nombreExamen: 'EXTREMIDADES', detalle: this.formPhysicalExam.value.extremidades },
      ],
      obsExamenFisico: this.formPhysicalExam.value.obsExamenFisico,
      anamnesis: this.formExtraData.value.anamnesis,
      motivoConsulta: this.formMotivoConsulta.value.detailMotivoFC,
      interMedicinaGeneral: {
        tiempoEnfermedad: this.formExtraData.value.tiempoEnfermedad,
        formaInicio: this.formExtraData.value.formaInicio,
        curso: this.formExtraData.value.curso,
        observacion: this.formExtraData.value.observacion
      }
    }
  }
  save() {
    this.recoverData();
    // console.log('data to save ', this.dataMotivoConsulta);
    this.consultaGeneralService.putUpdateConsultaGeneralByIdConsulta(this.dataMotivoConsulta).subscribe((res:any)=>{})
  }
}
