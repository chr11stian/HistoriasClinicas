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
    dataConsulta: any;
    idConsulta: string;

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
        this.dataConsulta = JSON.parse(localStorage.getItem('datosConsultaActual'));
        this.idConsulta = this.dataConsulta.id;
    }

    ngOnInit(): void {
        this.buildForm();
        this.getLab();
        this.recuperaDataPaciente();
        console.log("Data Consulta", this.idConsulta)
    }

    getLab() {
        this.servicesService.getLab().subscribe((res: any) => {
            this.ListaLab = res.examenes;
            console.log('SOLICITUD LAB', this.ListaLab);

        })
    }

    recuperaDataPaciente() {
        this.formSolicitudLab.get('edad').setValue(this.dataConsulta.anioEdad);
        this.formSolicitudLab.get('HCL').setValue(this.dataConsulta.nroHcl);
        this.formSolicitudLab.get('servicio').setValue(this.dataConsulta.servicio);
        this.formSolicitudLab.get('apellidosNombres').setValue(this.dataConsulta.datosPaciente.apePaterno + ' ' + this.dataConsulta.datosPaciente.apeMaterno + ' ' + this.dataConsulta.datosPaciente.primerNombre + ' ' + this.dataConsulta.datosPaciente.otrosNombres);
    }

    buildForm() {
        this.formSolicitudLab = this.form.group({
            lista: new FormControl(''),

            apellidosNombres: new FormControl(''),
            edad: new FormControl(''),
            HCL: new FormControl(''),
            servicio: new FormControl(''),
            camaNro: new FormControl(''),
            DxPresuntivo: new FormControl(''),
            observaciones: new FormControl(''),

            /**HEMATOLOGÍA**/
            // first: new FormControl({value: '', disabled: true}, Validators.required),

            hemoglobina: new FormControl(''),
            Hematocrito: new FormControl(''),
            HemogCompleto: new FormControl({value: '', disabled: true}),
            TiempoCoagulacion: new FormControl({value: '', disabled: true}),
            TiempoSangria: new FormControl({value: '', disabled: true}),
            VSG: new FormControl({value: '', disabled: true}),
            RecuentoPlaquetas: new FormControl({value: '', disabled: true}),
            RecuentoGlobulosRojos: new FormControl({value: '', disabled: true}),
            RecuentoGlobulosBlancos: new FormControl({value: '', disabled: true}),
            ConstantesCorpusculares: new FormControl({value: '', disabled: true}),
            CompatibilidadSanguinea: new FormControl({value: '', disabled: true}),

            /**INMUNOLOGÍA**/
            GrupoSanguineo: new FormControl(''),
            ProteinaCReactiva: new FormControl({value: '', disabled: true}),
            ReaccionWidal: new FormControl({value: '', disabled: true}),
            FactorReumatoide: new FormControl({value: '', disabled: true}),
            RPR: new FormControl({value: '', disabled: false}),
            VIH: new FormControl({value: '', disabled: false}),
            AntigenoSuperficieHepatitisB: new FormControl({value: '', disabled: true}),
            BHGG: new FormControl({value: '', disabled: true}),
            Antiestreptolisinas: new FormControl({value: '', disabled: true}),
            antigenoFebrilBrucela: new FormControl({value: '', disabled: true}),
            Covid: new FormControl({value: '', disabled: true}),

            /**BIOQUÍMICA**/
            glucosa: new FormControl(''),
            ColesterolTotal: new FormControl({value: '', disabled: true}),
            Trigliceridos: new FormControl({value: '', disabled: true}),
            Urea: new FormControl({value: '', disabled: true}),
            Creatinina: new FormControl({value: '', disabled: true}),
            TGO: new FormControl({value: '', disabled: true}),
            TGP: new FormControl({value: '', disabled: true}),
            BilirrubinasTotal: new FormControl({value: '', disabled: true}),
            ProteinasTotales: new FormControl({value: '', disabled: true}),
            Albumina: new FormControl({value: '', disabled: true}),
            FosfatasaAlcalina: new FormControl({value: '', disabled: true}),

            /**PARASITOLOGÍA**/
            ExParasitologiaDirecto: new FormControl({value: '', disabled: true}),
            ExParasitologiaSeriado: new FormControl({value: '', disabled: true}),
            TestGraham: new FormControl({value: '', disabled: true}),
            Coprofuncional: new FormControl({value: '', disabled: true}),
            ThevenonHeces: new FormControl({value: '', disabled: true}),
            ReaccionInflamatoria: new FormControl({value: '', disabled: true}),

            /**UROANÁLISIS**/
            ExamenComplentoOrina: new FormControl(''),
            SedimientoUrinario: new FormControl({value: '', disabled: true}),
            ProteinuriaCC: new FormControl({value: '', disabled: true}),
            TestAcidoSulfosalicilico: new FormControl({value: '', disabled: true}),

            /**MICROBIOLOGÍA**/
            ExamenDirSecrecion: new FormControl({value: '', disabled: true}),

            otro1: new FormControl({value: '', disabled: false}),
            otro2: new FormControl({value: '', disabled: false}),
            otro3: new FormControl({value: '', disabled: false}),
            otro4: new FormControl({value: '', disabled: false}),
            otro5: new FormControl({value: '', disabled: false}),
            otro6: new FormControl({value: '', disabled: false}),

        })
    }

    hem1() {
        this.h1 = null;
        if (this.formSolicitudLab.value.hemoglobina[0] != undefined) {
            this.h1 = {
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                subTipo: "HEMATOLOGÍA",
                nombreExamen: this.formSolicitudLab.value.hemoglobina[0],
                nombreExamenSIS:"",
                cie10SIS: "85015",
                nombreUPS:"",
                nombreUPSaux:"",
                codPrestacion:"",
                codigoSIS:"",
                codigoHIS: "HIS",
                tipoDx:"",
                lab:"",
                lugarExamen:"CONSULTORIO",
                labExterno: false,
            }
        }

        console.log(this.formSolicitudLab.value.hemoglobina[0])
    }

    hem2() {
        this.h2 = null;
        if (this.formSolicitudLab.value.Hematocrito[0] != undefined) {
            this.h2 = {
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                subTipo: "HEMATOLOGÍA",
                nombreExamen: this.formSolicitudLab.value.Hematocrito[0],
                nombreExamenSIS:"",
                cie10SIS: "85014",
                nombreUPS:"",
                nombreUPSaux:"",
                codPrestacion:"",
                codigoSIS:"",
                codigoHIS: "HIS",
                tipoDx:"",
                lab:"",
                lugarExamen:"CONSULTORIO",
                labExterno: false,
            }
        }
    }

    hem12() {
        this.h3 = null;
        if (this.formSolicitudLab.value.GrupoSanguineo[0] != undefined) {
            this.h3 = {
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                subTipo: "INMUNOLOGÍA",
                nombreExamen: this.formSolicitudLab.value.GrupoSanguineo[0],
                nombreExamenSIS:"",
                cie10SIS: "86900",
                nombreUPS:"",
                nombreUPSaux:"",
                codPrestacion:"",
                codigoSIS:"",
                codigoHIS: "HIS",
                tipoDx:"",
                lab:"",
                lugarExamen:"CONSULTORIO",
                labExterno: false,
            }
        }
    }

    hem16() {
        this.h4 = null;
        if (this.formSolicitudLab.value.RPR[0] != undefined) {
            this.h4 = {
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                subTipo: "INMUNOLOGÍA",
                nombreExamen: this.formSolicitudLab.value.RPR[0],
                nombreExamenSIS:"",
                cie10SIS: "86592",
                nombreUPS:"",
                nombreUPSaux:"",
                codPrestacion:"",
                codigoSIS:"",
                codigoHIS: "HIS",
                tipoDx:"",
                lab:"",
                lugarExamen:"CONSULTORIO",
                labExterno: false,
            }
        }
    }

    hem17() {
        this.h5 = null;
        if (this.formSolicitudLab.value.VIH[0] != undefined) {
            this.h5 = {
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                subTipo: "INMUNOLOGÍA",
                nombreExamen: this.formSolicitudLab.value.VIH[0],
                nombreExamenSIS:"",
                cie10SIS: "Z0179",
                nombreUPS:"",
                nombreUPSaux:"",
                codPrestacion:"",
                codigoSIS:"",
                codigoHIS: "HIS",
                tipoDx:"",
                lab:"",
                lugarExamen:"CONSULTORIO",
                labExterno: false,
            }
        }
    }

    hem23() {
        this.h6 = null;
        if (this.formSolicitudLab.value.glucosa[0] != undefined) {
            this.h6 = {
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                subTipo: "BIOQUÍMICA",
                nombreExamen: this.formSolicitudLab.value.glucosa[0],
                nombreExamenSIS:"",
                cie10SIS: "82948",
                nombreUPS:"",
                nombreUPSaux:"",
                codPrestacion:"",
                codigoSIS:"",
                codigoHIS: "HIS",
                tipoDx:"",
                lab:"",
                lugarExamen:"CONSULTORIO",
                labExterno: false,
            }
        }
    }

    uroanalisis1() {
        this.h7 = null;
        if (this.formSolicitudLab.value.ExamenComplentoOrina[0] != undefined) {
            this.h7 = {
                tipoLaboratorio: "EXAMEN_LABORATORIO",
                subTipo: "UROANÁLISIS",
                nombreExamen: this.formSolicitudLab.value.ExamenComplentoOrina[0],
                nombreExamenSIS:"",
                cie10SIS: "Z0173",
                nombreUPS:"",
                nombreUPSaux:"",
                codPrestacion:"",
                codigoSIS:"",
                codigoHIS: "HIS",
                tipoDx:"",
                lab:"",
                lugarExamen:"CONSULTORIO",
                labExterno: false,
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


        console.log("no se puede2")
        this.listaSolicitud.push(this.formSolicitudLab.value.otro1);
        this.listaSolicitud.push(this.formSolicitudLab.value.otro2);
        this.listaSolicitud.push(this.formSolicitudLab.value.otro3);
        this.listaSolicitud.push(this.formSolicitudLab.value.otro4);
        this.listaSolicitud.push(this.formSolicitudLab.value.otro5);
        this.listaSolicitud.push(this.formSolicitudLab.value.otro6);

        console.log(this.listaSolicitud2)

        const data = {
            servicio: this.formSolicitudLab.value.servicio,
            nroCama: this.formSolicitudLab.value.camaNro,
            dxPresuntivo: this.formSolicitudLab.value.DxPresuntivo,
            examenesAuxiliares: this.listaSolicitud2,
            observaciones: this.formSolicitudLab.value.observaciones,
        }
        console.log("DATA", data)
        // this.servicesService.addSolicitudLab(this.idConsulta, data).subscribe((res: any) => {
        //     console.log('SOLICITUD LAB', res);
        // })
    }
}