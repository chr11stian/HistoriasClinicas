import { Component, OnInit } from '@angular/core';

import { DocumentoIdentidadService } from '../../services/documento-identidad/documento-identidad.service';
import { DocumentoIdentidad } from 'src/app/core/models/mantenimiento.models';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-documento-identidad',
    templateUrl: './documento-identidad.component.html',
    styleUrls: ['./documento-identidad.component.css']
})
export class DocumentoIdentidadComponent implements OnInit {

    form: FormGroup;
    listaDocumentosIdentidad: DocumentoIdentidad;
    selectedDoc: any;
    datosDocIdentidad: any;
    update: boolean = false;
    id: string;
    agregarDoc: boolean;


    constructor(
        private docIdentidadService: DocumentoIdentidadService,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.getDocumentosIdentidad();
        this.inicializarForm();
    }

    inicializarForm() {
        this.form = this.fb.group({
            nombre: new FormControl(''),
            abreviatura: new FormControl(''),
            longitud: new FormControl('')
        })
    }

    getDocumentosIdentidad() {
        this.docIdentidadService.getDocumentosIdentidad().subscribe((res: any) => {
            this.listaDocumentosIdentidad = res.object;
            // console.log('docs ', this.listaDocumentosIdentidad);
        })
    }

    recuperarDatos() {
        this.datosDocIdentidad = {
            nombre: this.form.value.nombre,
            abreviatura: this.form.value.abreviatura,
            longitud: this.form.value.longitud
        }
    }

    guardarDocumentoIdentidad() {
        this.recuperarDatos();
        if (this.datosDocIdentidad.nombre == '' || this.datosDocIdentidad.abreviatura == '' || this.datosDocIdentidad.longitud == '') {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Datos Incompletos',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        this.docIdentidadService.postDocumentoIdentidad(this.datosDocIdentidad).subscribe(res => {
            // console.log('res dni ', res)
            this.limpiarCampos();
            this.getDocumentosIdentidad();
            this.closeDialog();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se guardo con exito',
                showConfirmButton: false,
                timer: 1500
            });

        });
    }

    editarDocumento() {
        this.recuperarDatos();
        this.datosDocIdentidad = {
            nombre: this.datosDocIdentidad.nombre,
            abreviatura: this.datosDocIdentidad.abreviatura,
            longitud: this.datosDocIdentidad.longitud,
            id: this.id
        }

        // console.log('dato a editar', this.datosDocIdentidad)
        this.docIdentidadService.putDocumentoIdentidad(this.datosDocIdentidad).subscribe((res: any) => {
            this.limpiarCampos();
            this.getDocumentosIdentidad();
            this.closeDialog();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se Actualizo con exito',
                showConfirmButton: false,
                timer: 1500
            });
        })
    }

    limpiarCampos() {
        this.form.patchValue({ nombre: '' });
        this.form.patchValue({ abreviatura: '' });
        this.form.patchValue({ longitud: '' });
    }

    closeDialog() {
        this.agregarDoc = false;
    }

    openDialogEditar(row) {
        // console.log('row de identidad ', row)
        this.agregarDoc = true;
        this.update = true;
        // console.log(row)
        this.form.patchValue({ nombre: row.nombre });
        this.form.patchValue({ abreviatura: row.abreviatura });
        this.form.patchValue({ longitud: row.longitud });
        this.id = row.id
    }

    eliminar(row) {
        Swal.fire({
            title: '¿Seguro que desea eliminar este documento?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                this.docIdentidadService.deleteDocumentoIdentidadById(row.id).subscribe((res: any) => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se Elimino con exito',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.getDocumentosIdentidad();
                });
            } else if (result.isDenied) {
                Swal.fire('No se elimino el documento', '', 'info')
            }
        })
    }

    openDialogAgregarDoc() {
        this.update = false;
        this.agregarDoc = true;
        this.limpiarCampos();
    }

    cancelarDialogDoc() {

    }
}
