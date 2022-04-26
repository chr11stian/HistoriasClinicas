import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {
    ServicesService
} from "../../../obstetricia-general/gestante/atencion/consultorio-obstetrico/component/evaluaciones/laboratorio/services-lab/services.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-lab-inmunologia',
    templateUrl: './lab-inmunologia.component.html',
    styleUrls: ['./lab-inmunologia.component.css']
})
export class LabInmunologiaComponent implements OnInit {
    formInmunologia: FormGroup;
    DataInmunologia: any;
    datePipe = new DatePipe('en-US');
    fechaActual = new Date();
    idIpres: string = "616de45e0273042236434b51";

    constructor(private ref: DynamicDialogRef,
                private dialog: DialogService,
                private fb: FormBuilder,
                private servicesService: ServicesService,
                private config: DynamicDialogConfig,) {
        this.DataInmunologia = config.data.data;
        console.log(this.DataInmunologia);
    }


    ngOnInit(): void {
        this.buildForm();
        this.formInmunologia.get('Fecha').setValue(this.fechaActual);
        this.recuperarDataFormulario();
    }

    recuperarDataFormulario() {
        this.formInmunologia.get('apellidosNombres').setValue(this.DataInmunologia.datosPaciente.apePaterno + ' ' + this.DataInmunologia.datosPaciente.apeMaterno + ' ' + this.DataInmunologia.datosPaciente.primerNombre + ' ' + this.DataInmunologia.datosPaciente.otrosNombres);
        this.formInmunologia.get('edad').setValue(this.DataInmunologia.datosPaciente.edad);
        this.formInmunologia.get('HCL').setValue(this.DataInmunologia.datosPaciente.nroHcl);
        this.formInmunologia.get('servicio').setValue(this.DataInmunologia.datosLaboratorio.servicio);
        this.formInmunologia.get('camaNro').setValue(this.DataInmunologia.datosPaciente.nroCama);
        this.formInmunologia.get('nroSIS').setValue(this.DataInmunologia.datosPaciente.codSeguro);
        this.formInmunologia.get('LugarExamen').setValue(this.DataInmunologia.datosPaciente.codSeguro);
        this.formInmunologia.get('solicitante').setValue(this.DataInmunologia.profesionalAcargo.apePaterno + ' ' + this.DataInmunologia.profesionalAcargo.apeMaterno + ' ' + this.DataInmunologia.profesionalAcargo.primerNombre + ' ' + this.DataInmunologia.profesionalAcargo.otrosNombres);
    }


    guardarInmunologia() {
        const data = {
            codigo: '',
            nombre: this.DataInmunologia.datosPaciente.apePaterno + ' ' + this.DataInmunologia.datosPaciente.apeMaterno + ' ' + this.DataInmunologia.datosPaciente.primerNombre + ' ' + this.DataInmunologia.datosPaciente.otrosNombres,
            // cie10: this.DataInmunologia.datosLaboratorio.cie10SIS,
            cie10: '1010102',
            codigoHIS: this.DataInmunologia.datosLaboratorio.codigoHIS,
            labExterno: false,
            consultorio: this.DataInmunologia.datosLaboratorio.servicio,
            nroMuestra: '',
            Solicitante: this.DataInmunologia.profesionalAcargo.apePaterno + ' ' + this.DataInmunologia.profesionalAcargo.apeMaterno + ' ' + this.DataInmunologia.profesionalAcargo.primerNombre + ' ' + this.DataInmunologia.profesionalAcargo.otrosNombres,
            fechaHoraTomaMuestra: this.datePipe.transform(this.formInmunologia.value.Fecha, 'yyyy-MM-dd'),
            resultados: this.formInmunologia.value.resultados,
            tipoMuestra: this.formInmunologia.value.tipoMuestra,
            lugarExamen: this.formInmunologia.value.LugarExamen,
            reaccionWidal: this.formInmunologia.value.reaccionWidal,
            agTiphyco_o: this.formInmunologia.value.TiphycoO,
            agTiphyco_h: this.formInmunologia.value.TiphycoH,
            agTiphyco_a: this.formInmunologia.value.ParaTiphycoA,
            agTiphyco_b: this.formInmunologia.value.ParaTiphycoB,
            HBsAg: this.formInmunologia.value.HBsAg,
            grupoSanguineo: this.formInmunologia.value.GrupoSanguineo,
            factorRH: this.formInmunologia.value.FactorRH,

            proteinaCReactiva: this.formInmunologia.value.ProteinaReactivaPCR,
            factorReumatoideo: this.formInmunologia.value.FactorReumatoide,
            antiestreptolisinasO: this.formInmunologia.value.AntiestreptolisinasASO,
            rpr: this.formInmunologia.value.RPR,
            sifilis: this.formInmunologia.value.Sifilis,
            vih12: this.formInmunologia.value.VIH12,
            psaTotal: this.formInmunologia.value.PSAtotal,
            otros: this.formInmunologia.value.otros,
            LaboratorioInmuTestEmbarazo: {
                resultado: this.formInmunologia.value.BHCGresultado,
                muestra: this.formInmunologia.value.BHCGmuestra,
                reactivo: this.formInmunologia.value.BHCGreactivo,
            }
        }

        console.log("DATA", data);
        // this.servicesService.addInmunologia(this.DataInmunologia.id, this.idIpres, data).subscribe((res: any) => {
        //     console.log('SOLICITUD LAB', res);
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Registro',
        //         text: 'El resgistro fue con exito',
        //         showConfirmButton: false,
        //         target: document.getElementById('swal'),
        //         timer: 2000,
        //     })
        // })
    }

    buildForm() {
        this.formInmunologia = this.fb.group({
            apellidosNombres: new FormControl(''),
            edad: new FormControl(''),
            HCL: new FormControl(''),
            servicio: new FormControl(''),
            camaNro: new FormControl(''),
            nroSIS: new FormControl(''),

            solicitante: new FormControl(''),
            nroMuestra: new FormControl(''),
            LugarExamen: new FormControl(''),

            resultados: new FormControl(''),
            tipoMuestra: new FormControl(''),
            Fecha: new FormControl(''),

            reaccionWidal: new FormControl(''),
            TiphycoO: new FormControl(''),
            TiphycoH: new FormControl(''),
            ParaTiphycoA: new FormControl(''),
            ParaTiphycoB: new FormControl(''),
            HBsAg: new FormControl(''),
            GrupoSanguineo: new FormControl(''),
            FactorRH: new FormControl(''),

            ProteinaReactivaPCR: new FormControl(''),
            FactorReumatoide: new FormControl(''),
            AntiestreptolisinasASO: new FormControl(''),
            RPR: new FormControl(''),
            Sifilis: new FormControl(''),
            VIH12: new FormControl(''),
            PSAtotal: new FormControl(''),
            otros: new FormControl(''),

            BHCGresultado: new FormControl(''),
            BHCGmuestra: new FormControl(''),
            BHCGreactivo: new FormControl(''),


        })
    }
}
