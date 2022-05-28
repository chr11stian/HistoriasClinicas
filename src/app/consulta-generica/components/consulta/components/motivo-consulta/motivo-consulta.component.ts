import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatosGeneralesService } from 'src/app/consulta-generica/services/datos-generales/datos-generales.service';
import { MotivoConsulta } from 'src/app/core/models/consultaGenerica';
import Swal from 'sweetalert2';

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
  dataResMotivoCons: any;
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
    let idCupo = JSON.parse(localStorage.getItem('documento')).idCupo;
    this.consultaGeneralService.searchConsultaDatosGenerales(this.idConsulta).subscribe((res: any) => {
      this.consultaGeneralService.searchConsultaDatosGenerales(this.idConsulta).subscribe((res: any) => {
        console.log('datos de consulta motivo de consulta', res.object);
        this.dataResMotivoCons = res.object;
        if (this.dataResMotivoCons.signosVitales == null) {
          this.consultaGeneralService.getDatosTriajeByIdCupo(idCupo).subscribe((res: any) => {
            console.log('datos de triaje ', res);
            this.setDataTriaje(res.object.funcionesVitales);
          })
        } else {
          console.log('no es triaje');
          this.loadDataMotivoConsulta(this.dataResMotivoCons)
        }

      })
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

      pielDetalle: new FormControl(""),
      mucosasDetalle: new FormControl(""),
      cabezaDetalle: new FormControl(""),
      caraDetalle: new FormControl(""),
      cuelloDetalle: new FormControl(""),
      toraxDetalle: new FormControl(""),
      abdomenDetalle: new FormControl(""),
      columnaVertDetalle: new FormControl(""),
      extremidadesDetalle: new FormControl(""),
      // examenFisicoOtro: new FormControl(""),
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
  loadDataMotivoConsulta(data) {
    this.formMotivoConsulta.patchValue({ detailMotivoFC: data.motivoConsulta });
    this.formVitalSigns.patchValue({ temperatura: data.signosVitales.temperatura });
    this.formVitalSigns.patchValue({ presionSistolica: data.signosVitales.presionSistolica });
    this.formVitalSigns.patchValue({ presionDiastolica: data.signosVitales.presionDiastolica });
    this.formVitalSigns.patchValue({ fc: data.signosVitales.fc });
    this.formVitalSigns.patchValue({ fr: data.signosVitales.fr });
    this.formVitalSigns.patchValue({ peso: data.signosVitales.peso });
    this.formVitalSigns.patchValue({ talla: data.signosVitales.talla });
    this.formVitalSigns.patchValue({ imc: data.signosVitales.imc });

    this.formPhysicalExam.patchValue({ piel: data.examenesFisicos[0].valor });
    this.formPhysicalExam.patchValue({ cabeza: data.examenesFisicos[1].valor });
    this.formPhysicalExam.patchValue({ cara: data.examenesFisicos[2].valor });
    this.formPhysicalExam.patchValue({ cuello: data.examenesFisicos[3].valor });
    this.formPhysicalExam.patchValue({ torax: data.examenesFisicos[4].valor });
    this.formPhysicalExam.patchValue({ abdomen: data.examenesFisicos[5].valor });
    this.formPhysicalExam.patchValue({ columnaVert: data.examenesFisicos[6].valor });
    this.formPhysicalExam.patchValue({ extremidades: data.examenesFisicos[7].valor });

    this.formPhysicalExam.patchValue({ pielDetalle: data.examenesFisicos[0].detalle });
    this.formPhysicalExam.patchValue({ cabezaDetalle: data.examenesFisicos[1].detalle });
    this.formPhysicalExam.patchValue({ caraDetalle: data.examenesFisicos[2].detalle });
    this.formPhysicalExam.patchValue({ cuelloDetalle: data.examenesFisicos[3].detalle });
    this.formPhysicalExam.patchValue({ toraxDetalle: data.examenesFisicos[4].detalle });
    this.formPhysicalExam.patchValue({ abdomenDetalle: data.examenesFisicos[5].detalle });
    this.formPhysicalExam.patchValue({ columnaVertDetalle: data.examenesFisicos[6].detalle });
    this.formPhysicalExam.patchValue({ extremidadesDetalle: data.examenesFisicos[7].detalle });

    this.formExtraData.patchValue({ anamnesis: data.anamnesis });
    this.formExtraData.patchValue({ tiempoEnfermedad: data.interMedicinaGeneral.tiempoEnfermedad });
    this.formExtraData.patchValue({ formaInicio: data.interMedicinaGeneral.formaInicio });
    this.formExtraData.patchValue({ curso: data.interMedicinaGeneral.curso });
    this.formExtraData.patchValue({ observacion: data.interMedicinaGeneral.observacion });

    this.formBiologicalFunctions.patchValue({ apetito: data.funcionesBiologicas[0].valor });
    this.formBiologicalFunctions.patchValue({ apetitoDetalle: data.funcionesBiologicas[0].detalle });
    this.formBiologicalFunctions.patchValue({ sed: data.funcionesBiologicas[1].valor });
    this.formBiologicalFunctions.patchValue({ sedDetalle: data.funcionesBiologicas[1].detalle });
    this.formBiologicalFunctions.patchValue({ suenos: data.funcionesBiologicas[2].valor });
    this.formBiologicalFunctions.patchValue({ suenosDetalle: data.funcionesBiologicas[2].detalle });
    this.formBiologicalFunctions.patchValue({ estadoAnimo: data.funcionesBiologicas[3].valor });
    this.formBiologicalFunctions.patchValue({ estadoAnimoDetalle: data.funcionesBiologicas[3].detalle });
    this.formBiologicalFunctions.patchValue({ orina: data.funcionesBiologicas[4].valor });
    this.formBiologicalFunctions.patchValue({ orinaDetalle: data.funcionesBiologicas[4].detalle });
    this.formBiologicalFunctions.patchValue({ deposiciones: data.funcionesBiologicas[5].valor });
    this.formBiologicalFunctions.patchValue({ deposicionesDetalle: data.funcionesBiologicas[5].detalle });

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
        { nombreExamen: 'PIEL', valor: this.formPhysicalExam.value.piel, detalle: this.formPhysicalExam.value.pielDetalle },
        { nombreExamen: 'CABEZA', valor: this.formPhysicalExam.value.piel, detalle: this.formPhysicalExam.value.cabezaDetalle },
        { nombreExamen: 'CARA', valor: this.formPhysicalExam.value.piel, detalle: this.formPhysicalExam.value.caraDetalle },
        { nombreExamen: 'CUELLO', valor: this.formPhysicalExam.value.piel, detalle: this.formPhysicalExam.value.cuelloDetalle },
        { nombreExamen: 'TORAX', valor: this.formPhysicalExam.value.piel, detalle: this.formPhysicalExam.value.toraxDetalle },
        { nombreExamen: 'ABDOMEN', valor: this.formPhysicalExam.value.piel, detalle: this.formPhysicalExam.value.abdomenDetalle },
        { nombreExamen: 'COLUMNA_VERT', valor: this.formPhysicalExam.value.piel, detalle: this.formPhysicalExam.value.columnaVertDetalle },
        { nombreExamen: 'EXTREMIDADES', valor: this.formPhysicalExam.value.piel, detalle: this.formPhysicalExam.value.extremidadesDetalle },
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

  setDataTriaje(data) {
    this.formVitalSigns.patchValue({ temperatura: data.temperatura });
    this.formVitalSigns.patchValue({ presionSistolica: data.presionSistolica });
    this.formVitalSigns.patchValue({ presionDiastolica: data.presionDiastolica });
    this.formVitalSigns.patchValue({ fc: data.fc });
    this.formVitalSigns.patchValue({ fr: data.fr });
    this.formVitalSigns.patchValue({ peso: data.peso });
    this.formVitalSigns.patchValue({ talla: data.talla });
    this.formVitalSigns.patchValue({ imc: data.imc.toFixed(2) });
  }

  save() {
    this.recoverData();
    // console.log('data to save ', this.dataMotivoConsulta);
    this.consultaGeneralService.putUpdateConsultaGeneralByIdConsulta(this.dataMotivoConsulta).subscribe((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Datos guardados correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
    })
  }
}
