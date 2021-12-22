import {Component, OnInit} from '@angular/core';
import {ObstetriciaGeneralService} from './services/obstetricia-general.service';
import {Router} from '@angular/router'
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CitasService} from "./services/citas.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {PacienteService} from "../core/services/paciente/paciente.service";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-citas',
    templateUrl: './citas.component.html',
    styleUrls: ['./citas.component.css'],
    providers: [DialogService],
})
export class CitasComponent implements OnInit {

    options: data[]
    selectedOption: data
    citas: any[]


    dataCitas: any;
    formCitas: FormGroup;
    datePipe = new DatePipe('en-US');
    fechaActual = new Date();

    Pacientes: any;
    ProximaCita: any;
    dataPaciente: any;
    dataPaciente2: any;


    constructor(private obstetriciaGeneralService: ObstetriciaGeneralService,
                private obstetriciaService: ObstetriciaGeneralService,
                private citasService: CitasService,
                private fb: FormBuilder,
                private pacienteService: PacienteService,
                private messageService: MessageService,
    ) {
        this.options = [
            {name: "DNI", code: 1},
            {name: "CARNET RN", code: 2},
            {name: "C EXTRANJERIA", code: 3},
            {name: "OTROS", code: 4},
        ]
        this.citas = [
            {
                dni: "10101013",
                apellidos: "ABARCA MELGAREJO",
                nombres: "KATHERIN",
                consultorio: "OBS01",
                horario: "8:00AM",
                fecha: "20/11/2021"
            },
        ]

    }


    ngOnInit(): void {
        this.buildForm();
        this.formCitas.get('fechaFinal').setValue(this.fechaActual);
        let FechaAtrazada = this.fechaActual.getFullYear() + '-' + this.fechaActual.getMonth() + '-' + this.fechaActual.getDate();
        this.formCitas.get('fechaInicio').setValue(FechaAtrazada);

        const data = {
            fechaInicio: FechaAtrazada,
            fechaFin: this.datePipe.transform(this.formCitas.value.fechaFinal, 'yyyy-MM-dd')
        }
        this.citasService.getProximaCitasGestacion(data).subscribe((res: any) => {
            this.dataCitas = res.object;
            console.log('Lista de Citas: ', this.dataCitas);
        });
    }

    buildForm() {
        this.formCitas = this.fb.group({
            fechaInicio: new FormControl(''),
            fechaFinal: new FormControl(''),
            nroDoc: new FormControl(''),
        })
    }

    getPacientesXnroDocumento() {
        let data = {
            tipoDoc: "DNI",
            nroDoc: this.formCitas.value.nroDoc,
        }
        this.pacienteService.getPacienteByNroDoc(data).subscribe((res: any) => {
            this.dataPaciente = res.object;
            if (this.dataPaciente == null) {
                this.showInfo();
            } else {
                this.showSuccess();
                let nombre = this.dataPaciente.primerNombre;
                let apellidoPaterno = this.dataPaciente.apePaterno;
                let apellidoMaterno = this.dataPaciente.apeMaterno;
                let nroDoc = this.dataPaciente.nroDoc;
                let telefono = this.dataPaciente.celular;
                let tipoDoc = this.dataPaciente.tipoDoc;
                this.dataPaciente2 = [{apellidoPaterno, apellidoMaterno, nombre, nroDoc, telefono, tipoDoc}]
            }

            console.log('paciente por doc ', this.dataPaciente2);


        });

    }

    /**Modulo para hacer cosultas no gestantes**/
    irConsultaNoControl(row) {
        console.log('pasando data ', row);
        this.obstetriciaService.data = row;
    }

    /**Citas del paciente en gestacion**/
    getCitasGestantes() {
        const data = {
            fechaInicio: this.datePipe.transform(this.formCitas.value.fechaInicio, 'yyyy-MM-dd'),
            fechaFin: this.datePipe.transform(this.formCitas.value.fechaFinal, 'yyyy-MM-dd')
        }

        console.log("DATA FECHAS", data);
        this.citasService.getProximaCitasGestacion(data).subscribe((res: any) => {
            this.dataCitas = res.object;

            this.ProximaCita = this.dataCitas.proxCita;
            this.Pacientes = this.dataCitas.datosPacientes;

            console.log('Lista de Citas: ', this.dataCitas);
        });
    }

    enviarData(event) {
        console.log("EVENTO", event);
        // this.obstetriciaGeneralService.observable$.emit(event.id);
        this.obstetriciaGeneralService.tipoDoc = event.tipoDoc;
        this.obstetriciaGeneralService.nroDoc = event.nroDoc;
    }

    showSuccess() {
        this.messageService.add({
            severity: 'success',
            summary: 'Paciente',
            detail: 'Recuperado con exito'
        });
    }

    showInfo() {
        this.messageService.add({
            severity: 'info',
            summary: 'Paciente',
            detail: 'No existe en la Base de Datos'
        });
    }
}

interface data {
    name: string
    code: number
}
