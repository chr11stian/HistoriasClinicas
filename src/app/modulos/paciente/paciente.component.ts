import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TipoEtnia } from 'src/app/core/models/mantenimiento.models';
import { Departamentos, Distrito, Provincias } from 'src/app/core/models/ubicacion.models';
import { IpressService } from 'src/app/core/services/ipress/ipress.service';
import { PacienteService } from 'src/app/core/services/paciente/paciente.service';
import { DocumentoIdentidadService } from 'src/app/mantenimientos/services/documento-identidad/documento-identidad.service';
import { EtniaService } from 'src/app/mantenimientos/services/etnia/etnia.service';
import { UbicacionService } from 'src/app/mantenimientos/services/ubicacion/ubicacion.service';
import { DialogPacienteComponent } from "./dialog-paciente/dialog-paciente.component";


@Component({
    selector: 'app-paciente',
    templateUrl: './paciente.component.html',
    styleUrls: ['./paciente.component.css'],
    providers: [DialogService],
})
export class PacienteComponent implements OnInit {

    listaPacientes: any;
    dataDepartamentos: any;
    ref: DynamicDialogRef;
    // idIpressLapostaMedica = "616de45e0273042236434b51";
    // iprees: string = "la posta medica";
    auxipress: string = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    dataPacienteEditar: any;

    constructor(
        private fb: FormBuilder,
        private documentoIdentidadService: DocumentoIdentidadService,
        private ipressService: IpressService,
        private pacienteService: PacienteService,
        private ubicacionService: UbicacionService,
        private etniaService: EtniaService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private dialog: DialogService,
    ) {

    }

    ngOnInit(): void {
        this.getDepartamentos();
        this.cargarPacientes();
    }


    cargarPacientes() {
        this.pacienteService.getPacientes().subscribe((res: any) => {
            this.listaPacientes = res.object;
            console.log('lista de pacientes ', this.listaPacientes)
        });
    }

    getDepartamentos() {
        this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
            this.dataDepartamentos = resp.object;
        });
    }

    /**Enviar data por localStorage para poder editar datos de un paciente**/
    editar(evemt) {
        localStorage.setItem('pacienteLocalStorage', JSON.stringify(evemt));
        localStorage.setItem('pacienteDepartamento', JSON.stringify(this.dataDepartamentos));
        let auxData = {
            typeData: 1,
            dataPaciente: evemt
        }
        this.ref = this.dialog.open(DialogPacienteComponent, {
            header: "PACIENTE",
            width: "90%",
            height: "100%",
            data: auxData
        })
        this.ref.onClose.subscribe((data: any) => {
            this.cargarPacientes();
        });
    }

    openDialogPacienteComp() {
        this.ref = this.dialog.open(DialogPacienteComponent, {
            header: "PACIENTE",
            width: "90%",
            height: "100%"
        })
        localStorage.removeItem('pacienteDepartamento');
        localStorage.removeItem('pacienteLocalStorage');
        this.ref.onClose.subscribe((data: any) => {
            this.cargarPacientes();
        });
    }
}
