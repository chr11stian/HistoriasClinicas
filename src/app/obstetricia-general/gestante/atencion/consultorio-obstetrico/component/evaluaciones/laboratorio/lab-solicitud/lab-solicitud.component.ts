import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ServicesService} from "../services-lab/services.service";

@Component({
    selector: 'app-lab-solicitud',
    templateUrl: './lab-solicitud.component.html',
    styleUrls: ['./lab-solicitud.component.css']
})
export class LabSolicitudComponent implements OnInit {
    formSolicitudLab: FormGroup;
    listaSolicitud: any[] = [];
    listaSolicitud2: any[] = [];
    ListaLab: any;
    idConsulta = "6228b26e1fcf0a0ee9ec50d3";

    h1: any;
    h2: any;
    h3: any;
    h4: any;
    h5: any;
    h6: any;
    h7: any;

    constructor(private ref: DynamicDialogRef,
                public config: DynamicDialogConfig,
                private servicesService: ServicesService,
                private form: FormBuilder) {
    }

    ngOnInit(): void {
        this.buildForm();
        this.getLab();


    }

    getLab() {
        this.servicesService.getLab().subscribe((res: any) => {
            this.ListaLab = res.examenes;
            console.log('SOLICITUD LAB', this.ListaLab);

        })
    }

    buildForm() {
        this.formSolicitudLab = this.form.group({
            lista: new FormControl(''),

            /**HEMATOLOGÍA**/
            hemoglobina: new FormControl(''),
            Hematocrito: new FormControl(''),
            HemogCompleto: new FormControl(''),
            TiempoCoagulacion: new FormControl(''),
            TiempoSangria: new FormControl(''),
            VSG: new FormControl(''),
            RecuentoPlaquetas: new FormControl(''),
            RecuentoGlobulosRojos: new FormControl(''),
            RecuentoGlobulosBlancos: new FormControl(''),
            ConstantesCorpusculares: new FormControl(''),
            CompatibilidadSanguinea: new FormControl(''),

            /**INMUNOLOGÍA**/
            GrupoSanguineo: new FormControl(''),
            ProteinaCReactiva: new FormControl(''),
            ReaccionWidal: new FormControl(''),
            FactorReumatoide: new FormControl(''),
            RPR: new FormControl(''),
            VIH: new FormControl(''),
            AntigenoSuperficieHepatitisB: new FormControl(''),
            BHGG: new FormControl(''),
            Antiestreptolisinas: new FormControl(''),
            antigenoFebrilBrucela: new FormControl(''),
            Covid: new FormControl(''),

            /**BIOQUÍMICA**/
            glucosa: new FormControl(''),
            ColesterolTotal: new FormControl(''),
            Trigliceridos: new FormControl(''),
            Urea: new FormControl(''),
            Creatinina: new FormControl(''),
            TGO: new FormControl(''),
            TGP: new FormControl(''),
            BilirrubinasTotal: new FormControl(''),
            ProteinasTotales: new FormControl(''),
            Albumina: new FormControl(''),
            FosfatasaAlcalina: new FormControl(''),

            /**PARASITOLOGÍA**/
            ExParasitologiaDirecto: new FormControl(''),
            ExParasitologiaSeriado: new FormControl(''),
            TestGraham: new FormControl(''),
            Coprofuncional: new FormControl(''),
            ThevenonHeces: new FormControl(''),
            ReaccionInflamatoria: new FormControl(''),

            /**UROANÁLISIS**/
            ExamenComplentoOrina: new FormControl(''),
            SedimientoUrinario: new FormControl(''),
            ProteinuriaCC: new FormControl(''),
            TestAcidoSulfosalicilico: new FormControl(''),

            /**MICROBIOLOGÍA**/
            ExamenDirSecrecion: new FormControl(''),

            arregloSolicitud: new FormControl(''),
        })
    }

    hem1() {
        this.h1 = null;
        if (this.formSolicitudLab.value.hemoglobina[0] != undefined) {
            this.h1 = {
                codigoHIS: "HIS",
                cie10: "85015",
                nombreExamen: this.formSolicitudLab.value.hemoglobina[0],
                subTipo: "HEMATOLOGÍA",
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                codigo: '',
                codPrestacion: '',
                labExterno: '',
            }
        }

        console.log(this.formSolicitudLab.value.hemoglobina[0])
    }

    hem2() {
        this.h2 = null;
        if (this.formSolicitudLab.value.Hematocrito[0] != undefined) {
            this.h2 = {
                codigoHIS: "HIS",
                cie10: "85014",
                nombreExamen: this.formSolicitudLab.value.Hematocrito[0],
                subTipo: "HEMATOLOGÍA",
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                codigo: '',
                codPrestacion: '',
                labExterno: '',
            }
        }
    }

    hem12() {
        this.h3 = null;
        if (this.formSolicitudLab.value.GrupoSanguineo[0] != undefined) {
            this.h3 = {
                codigoHIS: "HIS",
                cie10: "85014",
                nombreExamen: this.formSolicitudLab.value.GrupoSanguineo[0],
                subTipo: "INMUNOLOGÍA",
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                codigo: '',
                codPrestacion: '',
                labExterno: '',
            }
        }
    }

    hem16() {
        this.h4 = null;
        if (this.formSolicitudLab.value.RPR[0] != undefined) {
            this.h4 = {
                codigoHIS: "HIS",
                cie10: "85014",
                nombreExamen: this.formSolicitudLab.value.RPR[0],
                subTipo: "INMUNOLOGÍA",
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                codigo: '',
                codPrestacion: '',
                labExterno: '',
            }
        }
    }

    hem17() {
        this.h5 = null;
        if (this.formSolicitudLab.value.VIH[0] != undefined) {
            this.h5 = {
                codigoHIS: "HIS",
                cie10: "85014",
                nombreExamen: this.formSolicitudLab.value.VIH[0],
                subTipo: "INMUNOLOGÍA",
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                codigo: '',
                codPrestacion: '',
                labExterno: '',
            }
        }
    }

    hem23() {
        this.h6 = null;
        if (this.formSolicitudLab.value.glucosa[0] != undefined) {
            this.h6 = {
                codigoHIS: "HIS",
                cie10: "85014",
                nombreExamen: this.formSolicitudLab.value.glucosa[0],
                subTipo: "BIOQUÍMICA",
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                codigo: '',
                codPrestacion: '',
                labExterno: '',
            }
        }
    }

    uroanalisis1() {
        this.h7 = null;
        if (this.formSolicitudLab.value.ExamenComplentoOrina[0] != undefined) {
            this.h7 = {
                codigoHIS: "HIS",
                cie10: "85014",
                nombreExamen: this.formSolicitudLab.value.ExamenComplentoOrina[0],
                subTipo: "UROANÁLISIS",
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                codigo: '',
                codPrestacion: '',
                labExterno: '',
            }
        }
    }

    add() {
        this.listaSolicitud2 = [];
        this.listaSolicitud = [];
        this.listaSolicitud.push(this.h1)
        this.listaSolicitud.push(this.h2)
        this.listaSolicitud.push(this.h3)
        this.listaSolicitud.push(this.h4)
        this.listaSolicitud.push(this.h5)
        this.listaSolicitud.push(this.h6)
        this.listaSolicitud.push(this.h7)
        // console.log(this.listaSolicitud)
        for (let i = 0; i <= this.listaSolicitud.length; i++) {
            if (this.listaSolicitud[i] != undefined) {
                this.listaSolicitud2.push(this.listaSolicitud[i]);
            }
        }
        console.log(this.listaSolicitud2)

        const data = {
            servicio: 'OBSTETRICIA',
            nroCama: '',
            dxPresuntivo: '',
            examenesAuxiliares: this.listaSolicitud2,
            observaciones: ''
        }
        console.log("DATA", data)
        this.servicesService.addSolicitudLab(this.idConsulta, data).subscribe((res: any) => {
            console.log('SOLICITUD LAB', res);
        })
    }
}