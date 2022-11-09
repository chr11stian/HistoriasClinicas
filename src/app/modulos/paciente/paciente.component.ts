
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PacienteService } from 'src/app/core/services/paciente/paciente.service';
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
    totalRecords: number;
    first: number = 0;
    rows: number = 20;
    searchForm: FormGroup;

    constructor(
        private pacienteService: PacienteService,
        private ubicacionService: UbicacionService,
        private dialog: DialogService,
    ) {
        this.initializeForm();
    }
    initializeForm(): void {
        this.searchForm = new FormGroup({
            search: new FormControl({ value: '', disabled: false })
        })
    }

    ngOnInit(): void {
        this.getDepartamentos();
        // this.cargarPacientes();
    }

    cargarPacientes() {
        this.pacienteService.getPacientes().subscribe((res: any) => {
            this.listaPacientes = res.object;
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
        });
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

    pagination(event): void {
        let page: number = event.first / 20 + 1;
        this.pacienteService.getPaginatedPatients(page).subscribe((res: any) => {
            this.listaPacientes = res.object;
            this.totalRecords = res.totalPages * 20;
        });
    }
    searchPatient(): void {
        let keyWord: string = this.searchForm.value.search;
        if (keyWord == "") {
            this.pacienteService.getPaginatedPatients(1).subscribe((res: any) => {
                this.listaPacientes = res.object;
                this.totalRecords = res.totalPages * 20;
            });
        } else {
            this.pacienteService.getSearchPatientByNroDocNames(keyWord).subscribe((res: any) => {
                this.listaPacientes = res.object;
                this.totalRecords = this.listaPacientes.length;
            });
        }
        
    }
}
