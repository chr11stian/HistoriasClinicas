import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../../core/services/personal-services/personal.service';
import {FormBuilder, Validators, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { Personal } from 'src/app/core/models/personal.models';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DocumentoIdentidadService } from 'src/app/mantenimientos/services/documento-identidad/documento-identidad.service';
import { ColegioProfesional, DocumentoIdentidad, Especialidad, TipoPersonal } from 'src/app/core/models/mantenimiento.models';
import { TipoPersonalService } from 'src/app/mantenimientos/services/tipo-personal/tipo-personal.service';
import { EspecialidadService } from 'src/app/mantenimientos/services/especialidad/especialidad.service';
import { ColegioProfesionalService } from 'src/app/mantenimientos/services/colegio-profesional/colegio-profesional.service';


@Component({
    selector: 'app-personal-salud',
    templateUrl: './personal-salud.component.html',
    styleUrls: ['./personal-salud.component.css'],
})
export class PersonalSaludComponent implements OnInit{
    // Creacion del formulario
    form: FormGroup;

    data: Personal[] = [];
    isUpdate: boolean = false;
    idUpdate: string = "";
    docList: DocumentoIdentidad[];
    tiposPersonalList: TipoPersonal[];
    especialidadesList: Especialidad[];
    colegiosList: ColegioProfesional[];

    personalDialog: boolean;
    constructor(
        private personalservice: PersonalService,
        private documentoservice: DocumentoIdentidadService,
        private tipoPersonalservice: TipoPersonalService,
        private especialidadservice: EspecialidadService,
        private colegioservice: ColegioProfesionalService,
        private formBuilder: FormBuilder
    ) {
        this.buildForm();
        this.getPersonal();
        this.getDocumentos();
        this.getTiposPersonal();
        this.getEspecialidades();
        this.getColegios();
    }

    getDocumentos(){
        this.documentoservice.getDocumentosIdentidad().subscribe((res: any) => {
            this.docList = res.object;
            console.log(this.docList);
        });
    }
    getTiposPersonal(){
        this.tipoPersonalservice.getTipoPersonales().subscribe((res: any) => {
            this.tiposPersonalList = res.object;
            console.log(this.tiposPersonalList);
        });
    }
    getEspecialidades(){
        this.especialidadservice.getEspecialidad().subscribe((res: any) => {
            this.especialidadesList = res.object;
            console.log(this.especialidadesList);
        });
    }
    getColegios(){
        this.colegioservice.getColegioProfesional().subscribe((res: any) => {
            this.colegiosList = res.object;
            console.log(this.colegiosList);
        });
    }
    buildForm() {
        this.form = this.formBuilder.group({
            tipoDoc: ['', [Validators.required]],
            nroDoc: ['', [Validators.required]],
            apePaterno: ['', [Validators.required]],
            apeMaterno: ['', [Validators.required]],
            primerNombre: ['', [Validators.required]],
            otrosNombres: ['', [Validators.required]],
            fechaNacimiento: ['', [Validators.required]],
            tipoPersonal: ['', [Validators.required]],
            colegioProfesional: ['', [Validators.required]],
            colegiatura: ['', [Validators.required]],
            especialidad: ['', [Validators.required]],
            estado: ['', [Validators.required]],
            tipoContrato: ['', [Validators.required]],
            sexo: ['', [Validators.required]],
            detalleIpress: ['', [Validators.required]],
            estadoCivil: ['', [Validators.required]],
            domicilioActual: ['', [Validators.required]],
            nacionalidad: ['', [Validators.required]],
            departamento: ['', [Validators.required]],
            provincia: ['', [Validators.required]],
            distrito: ['', [Validators.required]],
        })
    }
    getPersonal() {
        this.personalservice.getPersonal().subscribe((res: any) => {
            this.data = res.object;
            console.log(this.data);
        });
    }
    saveForm() {
        this.isUpdate = false;
        const req = {
            tipoDoc: this.form.value.tipoDoc,
            nroDoc: this.form.value.nroDoc,
            apePaterno: this.form.value.apePaterno,
            apeMaterno: this.form.value.apeMaterno,
            primerNombre: this.form.value.primerNombre,
            otrosNombres: this.form.value.otrosNombres,
            fechaNacimiento: this.form.value.fechaNacimiento,
            tipoPersonal: this.form.value.tipoPersonal,
            colegioProfesional: this.form.value.colegioProfesional,
            colegiatura: this.form.value.colegiatura,
            especialidad: this.form.value.especialidad,
            estado: this.form.value.estado,
            tipoContrato: this.form.value.tipoContrato,
            sexo: this.form.value.sexo,
            detalleIpress: this.form.value.detalleIpress
        }
        if (req.nroDoc.trim() !== "") {
            this.personalservice.createPersonal(req).subscribe(
                result => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Agregado correctamente',
                        text: '',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    this.getPersonal();
                    this.personalDialog = false;
                }
            )
        }
    }

    openNew() {
        this.isUpdate = false;
        this.form.reset();
        this.form.get('nroDoc').setValue("");
        this.form.get('tipoDoc').setValue("");
        this.form.get('apePaterno').setValue("");
        this.form.get('apeMaterno').setValue("");
        this.form.get('primerNombre').setValue("");
        this.form.get('otrosNombres').setValue("");
        this.form.get('fechaNacimiento').setValue("");
        this.form.get('tipoPersonal').setValue("");
        this.form.get('colegioProfesional').setValue("");
        this.form.get('colegiatura').setValue("");
        this.form.get('especialidad').setValue("");
        this.form.get('estado').setValue("");
        this.form.get('tipoContrato').setValue("");
        this.form.get('sexo').setValue("");
        this.form.get('detalleIpress').setValue("");
        this.personalDialog = true;
    }
    editar(rowData) {
        this.isUpdate = true;
        this.form.get('nroDoc').setValue(rowData.nroDoc);
        this.form.get('tipoDoc').setValue(rowData.tipoDoc);
        this.form.get('apePaterno').setValue(rowData.apePaterno);
        this.form.get('apeMaterno').setValue(rowData.apeMaterno);
        this.form.get('primerNombre').setValue(rowData.primerNombre);
        this.form.get('otrosNombres').setValue(rowData.otrosNombres);
        this.form.get('fechaNacimiento').setValue(rowData.fechaNacimiento);
        this.form.get('tipoPersonal').setValue(rowData.tipoPersonal.nombre);
        this.form.get('colegioProfesional').setValue(rowData.colegioProfesional.nombre);
        this.form.get('colegiatura').setValue(rowData.colegiatura);
        this.form.get('especialidad').setValue(rowData.especialidad.nombre);
        this.form.get('estado').setValue(rowData.estado);
        this.form.get('tipoContrato').setValue(rowData.tipoContrato);
        this.form.get('sexo').setValue(rowData.sexo);
        this.form.get('detalleIpress').setValue(rowData.detalleIpress.eess);
        this.idUpdate = rowData.id;
        this.personalDialog = true;
    }
    editarDatos(rowData) {
        const req = {
            id: this.idUpdate,
            tipoDoc: this.form.value.tipoDoc,
            nroDoc: this.form.value.nroDoc,
            apePaterno: this.form.value.apePaterno,
            apeMaterno: this.form.value.apeMaterno,
            primerNombre: this.form.value.primerNombre,
            otrosNombres: this.form.value.otrosNombres,
            fechaNacimiento: this.form.value.fechaNacimiento,
            tipoPersonal: this.form.value.tipoPersonal,
            colegioProfesional: this.form.value.colegioProfesional,
            colegiatura: this.form.value.colegiatura,
            especialidad: this.form.value.especialidad,
            estado: this.form.value.estado,
            tipoContrato: this.form.value.tipoContrato,
            sexo: this.form.value.sexo,
            detalleIpress: this.form.value.detalleIpress
        }

        this.personalservice.editPersonal(req).subscribe(
            result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Agregado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500,
                })
                this.getPersonal();
                this.personalDialog = false;
            }
        )
    }

    eliminar(rowData) {
        this.isUpdate = false;
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.personalservice.deletePersonal(rowData.id).subscribe(
                    result => {
                        this.getPersonal()
                    }
                );
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.personalDialog = false;
    }

    titulo() {
        if (this.isUpdate) return "Edite Personal de Salud";
        else return "Ingrese Nuevo Personal de Salud";
    }

    ngOnInit(): void {
    }
}
