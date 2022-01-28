import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DocumentoIdentidadService} from "../../../../mantenimientos/services/documento-identidad/documento-identidad.service";
import Swal from "sweetalert2";
import {PacienteService} from "../../../../core/services/paciente/paciente.service";

@Component({
    selector: 'app-modal-cupos2',
    templateUrl: './modal-cupos2.component.html',
    styleUrls: ['./modal-cupos2.component.css']
})
export class ModalCupos2Component implements OnInit {
    formPacientesCupo: FormGroup;
    listaDocumentosIdentidad: any;
    dataPacientes: any;
    detallePago: string = "PENDIENTE";
    TipoDoc: string = "DNI";


    constructor(private fb: FormBuilder,
                private documentoIdentidadService: DocumentoIdentidadService,
                private pacienteService: PacienteService,) {
    }

    ngOnInit(): void {
        this.buildForm();
        this.formPacientesCupo.get('tipoDoc').setValue(this.TipoDoc);
        this.getDocumentosIdentidad();
    }

    buildForm() {
        this.formPacientesCupo = this.fb.group({
            primerNombre: new FormControl(''),
            otrosNombres: new FormControl(''),
            apePaterno: new FormControl(''),
            apeMaterno: new FormControl(''),
            sexo: new FormControl(''),
            fechaNacimiento: new FormControl(''),
            estadoCivil: new FormControl(''),
            celular: new FormControl(''),

            nacionalidad: new FormControl(''),
            departamento: new FormControl(''),
            provincia: new FormControl(''),
            distrito: new FormControl(''),
            centroPoblado: new FormControl(''),
            direccion: new FormControl(''),

            tipoDoc: new FormControl(''),
            nroDoc: new FormControl(''),

            tipoSeguro: new FormControl(''),
            transeunte: new FormControl(''),

            edadAnio: new FormControl(''),
            edadMes: new FormControl(''),
            edadDia: new FormControl(''),
        })
    }

    /**Lista los tipos de documentos de Identidad de un paciente**/
    getDocumentosIdentidad() {
        this.documentoIdentidadService.getDocumentosIdentidad().subscribe((res: any) => {
            this.listaDocumentosIdentidad = res.object;
            console.log('docs ', this.listaDocumentosIdentidad);
        })
    }

    obtenerFecha(fecha: Date): string {
        let arr = fecha.toString().split('-');
        const Year: string = arr[0];
        const Months: string = arr[1];
        const Day: string = arr[1];
        console.log(Year + '-' + Months + '-' + Day);
        return Year + '-' + Months + '-' + Day;
    }

    pacienteByNroDoc() {
        let auxNroDoc = {
            tipoDoc: this.formPacientesCupo.value.tipoDoc,
            nroDoc: this.formPacientesCupo.value.nroDoc,
        }
        this.pacienteService.getPacienteByNroDoc(auxNroDoc).subscribe((res: any) => {
            if (res.object != null || res.object != undefined) {
                this.dataPacientes = res.object
                console.log('paciente por doc ', this.dataPacientes)
                this.formPacientesCupo.get('apePaterno').setValue(this.dataPacientes.apePaterno);
                this.formPacientesCupo.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
                this.formPacientesCupo.get('primerNombre').setValue(this.dataPacientes.primerNombre);
                this.formPacientesCupo.get('otrosNombres').setValue(this.dataPacientes.otrosNombres);
                this.formPacientesCupo.get('sexo').setValue(this.dataPacientes.sexo);
                this.formPacientesCupo.get('fechaNacimiento').setValue(this.obtenerFecha(this.dataPacientes.nacimiento.fechaNacimiento));
                this.formPacientesCupo.get('estadoCivil').setValue(this.dataPacientes.estadoCivil);
                this.formPacientesCupo.get('celular').setValue(this.dataPacientes.celular);
                this.formPacientesCupo.get('nacionalidad').setValue(this.dataPacientes.nacionalidad);
                this.formPacientesCupo.get('tipoSeguro').setValue(this.dataPacientes.tipoSeguro);
                this.formPacientesCupo.get('departamento').setValue(this.dataPacientes.domicilio.departamento);
                this.formPacientesCupo.get('provincia').setValue(this.dataPacientes.domicilio.provincia);
                this.formPacientesCupo.get('distrito').setValue(this.dataPacientes.domicilio.distrito);
                this.formPacientesCupo.get('centroPoblado').setValue(this.dataPacientes.domicilio.ccpp);
                this.formPacientesCupo.get('direccion').setValue(this.dataPacientes.domicilio.direccion);
                this.formPacientesCupo.get('tipoSeguro').setValue(this.dataPacientes.tipoSeguro);
                if (this.dataPacientes.tipoSeguro == "SIS") {
                    this.detallePago = "GRATUITO"
                }
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Cupo',
                    text: 'Paciente no encontrado en la Base de Datos, debe ingresar todo sus datos para crearle Historia Clínica',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        });
    }
}
