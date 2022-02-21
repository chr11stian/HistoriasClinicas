import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ObstetriciaGeneralService} from "../../../obstetricia-general/services/obstetricia-general.service";
import {FiliancionService} from "../../../obstetricia-general/gestante/atencion/h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";
import {ListaConsultaService} from '../services/lista-consulta.service';
import {dato} from "src/app/cred/citas/models/data"

@Component({
    selector: 'app-lista-consulta',
    templateUrl: './lista-consulta.component.html',
    styleUrls: ['./lista-consulta.component.css']
})
export class ListaConsultaComponent implements OnInit {
    attributeLocalS = 'documento'
    dataConsulta: any;
    dataLifiado: any;
    FormPaciente: FormGroup;
    tipoDoc: any;
    nroDoc: any;
    apellidosNombres: any;
    tipoDocRecuperado: string;
    nroDocRecuperado: string;
    data: dato
    fechaNacimiento: string

    constructor(private form: FormBuilder,
                private obstetriciaGeneralService: ObstetriciaGeneralService,
                private filiancionService: FiliancionService,
                private listaConsultaService: ListaConsultaService) {
    }

    ngOnInit(): void {
        this.consultasNroDoc();
    }

    getpacientesFiliados(nroDoc) {
        this.listaConsultaService.getConsultasCRED(nroDoc).subscribe((r: any) => {
            this.dataConsulta = r.object;
        })
    }

    atencion(event) {
        this.listaConsultaService.getConsulta(event.id).subscribe((r: any) => {
            this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS))
            let data: dato = {
                nroDocumento: this.data.nroDocumento,
                tipoDoc: this.data.tipoDoc,
                idConsulta: event.id,
                anio: r.object.anioEdad,
                mes: r.object.mesEdad,
                dia: r.object.diaEdad
            }
            localStorage.setItem(this.attributeLocalS, JSON.stringify(data));
        })

    }

    nuevaConsulta() {
        let data: dato = {
            nroDocumento: this.data.nroDocumento,
            tipoDoc: this.data.tipoDoc,
            idConsulta: '',
        }
        localStorage.setItem(this.attributeLocalS, JSON.stringify(data));
    }

    consultasNroDoc() {
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS))

        this.filiancionService.getPacienteNroDocFiliacion(this.data.tipoDoc, this.data.nroDocumento).subscribe((res: any) => {
            this.dataLifiado = res.object
            this.fechaNacimiento = res.object.nacimiento.fechaNacimiento
            console.log('paciente por doc ', res.object)
            this.tipoDoc = this.dataLifiado.tipoDoc
            this.nroDoc = this.dataLifiado.nroDoc;
            this.apellidosNombres = this.dataLifiado.apePaterno + ' ' + this.dataLifiado.apeMaterno + ' ' + this.dataLifiado.primerNombre + ' ' + this.dataLifiado.otrosNombres;
        });
        this.getpacientesFiliados(this.data.nroDocumento);
    }
}

