import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpsService } from '../../services/ups/ups.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TipoUpsService } from '../../services/tipo-ups.service';
import { NombreComercialUPSService } from '../../services/nombre-comercial-UPS/nombre-comercial-ups.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-ups',
    templateUrl: './ups.component.html',
    styleUrls: ['./ups.component.css'],
    animations: [
        trigger('rowExpansionTrigger', [
            state('void', style({
                transform: 'translateX(-10%)',
                opacity: 0
            })),
            state('active', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class UpsComponent implements OnInit {

    listaUPS: any;
    listaTipoUPS: any;
    listaNombreComercial: any;
    dialogUPS: boolean = false;
    dialogSubTitulos: boolean = false;
    formUPS: FormGroup;
    formSubTitulo: FormGroup;
    dataUPS: any;
    dataSubTitulo: any;
    selectedValue: string;
    selectedTipoUPS: any;
    stateOptions = [
        { label: 'Activo', value: true },
        { label: 'Inactivo', value: false }
    ];
    SISHISOption = [
        { label: 'HIS', value: 'his' },
        { label: 'SIS', value: 'sis' }
    ]
    subTitulosOptions = [
        { label: 'SI', value: true },
        { label: 'NO', value: false }
    ]
    update: boolean = false;
    updateSubTitulo: boolean = false;
    titulo: string;
    idUps: string;
    listaSubTitulos: any;
    nombreSubTitulo: string;

    constructor(
        private fb: FormBuilder,
        private upsService: UpsService,
        private tipoUpsService: TipoUpsService,
        private nombreComercialService: NombreComercialUPSService
    ) { }

    ngOnInit(): void {
        this.inicializarForm();
        this.cargarUPS();
        this.cargarTipoUPS();
    }

    inicializarForm() {
        this.formUPS = this.fb.group({
            codUPS: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
            nombreUPS: new FormControl('', { validators: [Validators.required] }),
            nombreComercial: new FormControl(''),
            dropTipoUPS: new FormControl('', { validators: [Validators.required] }),
            sishis: new FormControl('', { validators: [Validators.required] }),
            estado: new FormControl(''),
            tieneCupo: new FormControl('', { validators: [Validators.required] }),
        });

        this.formSubTitulo = this.fb.group({
            tieneCupo: new FormControl('', { validators: [Validators.required] }),
            nombreSubTitulo: new FormControl('', { validators: [Validators.required] }),
        });
    }

    cargarUPS() {
        this.upsService.getUPS().subscribe((res: any) => {
            this.listaUPS = res.object;
            console.log('res back ', this.listaUPS)
        });
    }

    cargarTipoUPS() {
        this.tipoUpsService.getTipoUPSs().subscribe((res: any) => {
            this.listaTipoUPS = res.object;
            // console.log('lista tipo UPS', this.listaTipoUPS)
        })
    }

    cargarNombreComercialUPS() {
        this.nombreComercialService.getNombreComercial_UPS().subscribe((res: any) => {
            this.listaNombreComercial = res.object;
            // console.log('comercial ', this.listaNombreComercial)
        })
    }

    recuperarDatos() {
        let his;
        let sis;
        console.log('sis de recuperar datos ', this.formUPS.value.sishis)
        if (this.formUPS.value.sishis == 'sis') {
            sis = true;
            his = false;
        } else {
            sis = false;
            his = true;
        }
        // console.log('nombre comercial ', this.formUPS.value.nombreComercial)
        let auxNombreComercial = this.formUPS.value.nombreComercial;
        if (auxNombreComercial == null) {
            auxNombreComercial = '';
        } else {
            auxNombreComercial = auxNombreComercial.id
        }

        this.dataUPS = {
            codUPS: this.formUPS.value.codUPS,
            nombreUPS: this.formUPS.value.nombreUPS,
            nombreComercial_id: auxNombreComercial,
            esHIS: his,
            esSIS: sis,
            estado: this.formUPS.value.estado,
            tipoUPS_id: this.formUPS.value.dropTipoUPS.id,
            subTituloUPS: [{
                tieneCupo: this.formUPS.value.tieneCupo,
                estado: this.formUPS.value.estado,
                nombreSubTipo: this.formUPS.value.nombreUPS,
            }]
        }
    }

    guardarUPS() {
        this.recuperarDatos();
        // console.log('datoa de ups ', this.dataUPS)
        // if (!this.formUPS.valid) {
        //     console.log('datos imcompletos')
        //     return
        // }
        this.upsService.postUPS(this.dataUPS).subscribe((res: any) => {
            this.cargarUPS();
            this.cancelDialogUPS();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.mensaje,
                showConfirmButton: false,
                timer: 1500
            });
        });
    }

    limpiarDatos() {
        this.formUPS.reset();
    }

    openDialogUPS() {
        this.titulo = 'Crear UPS';
        this.update = false;
        this.dialogUPS = true;
        this.cargarNombreComercialUPS();
        this.limpiarDatos();
    }

    cancelDialogUPS() {
        this.dialogUPS = false;
    }

    openDialogEditUPS(row) {
        // console.log('row a editar ', row)
        this.titulo = 'Editar UPS';
        this.update = true;
        let auxSisHis;

        if (row.esHIS == true) {
            auxSisHis = 'his'
        } else {
            auxSisHis = 'sis'
        }
        let auxTipoUPS = this.listaTipoUPS.filter(item => item.nombre == row.tiposUPS);
        auxTipoUPS = auxTipoUPS[0];
        this.idUps = row.id;

        this.update = true;
        this.dialogUPS = true;
        this.formUPS.patchValue({ codUPS: row.codUPS });
        this.formUPS.patchValue({ nombreUPS: row.nombreUPS });
        this.formUPS.patchValue({ sishis: auxSisHis })
        this.formUPS.patchValue({ nombreComercial: row.nombreComercial });
        this.formUPS.patchValue({ estado: row.estado });
        this.formUPS.patchValue({ dropTipoUPS: auxTipoUPS });
    }

    editarUPS() {
        this.recuperarDatos();
        // console.log('datos editar ', this.dataUPS, 'id ups ', this.idUps)
        this.upsService.putUPS(this.idUps, this.dataUPS).subscribe((res: any) => {
            // console.log('res edit ', res);
            this.cargarUPS();
            this.cancelDialogUPS();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.mensaje,
                showConfirmButton: false,
                timer: 1500
            });
        })
    }

    eliminarUPS(row) {
        let id = row.id;
        Swal.fire({
            title: '¿Desea eliminar este registro?',
            showDenyButton: true,
            icon: 'warning',
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                this.upsService.deleteUPS(id).subscribe((res: any) => {
                    this.cargarUPS();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: res.mensaje,
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
            } else if (result.isDenied) {
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'No se Elimino',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

    openDialogSubTitulos(row) {
        this.listaSubTitulos = row.subTituloUPS;
        this.idUps = row.id;
        // console.log('row de subt ', this.listaSubTitulos);
        this.dialogSubTitulos = true;
    }

    recuperarDatosSubTitulos() {
        this.dataSubTitulo = {
            nombreSubTipo: this.formSubTitulo.value.nombreSubTitulo,
            tieneCupo: this.formSubTitulo.value.tieneCupo,
            estado: String(this.formSubTitulo.value.tieneCupo),
        }
    }

    aceptarSubTitulo() {
        this.recuperarDatosSubTitulos();
        this.upsService.postAddSubTitulo(this.idUps, this.dataSubTitulo).subscribe((res: any) => {
            this.listaSubTitulos = res.object.subTituloUPS;
            this.formSubTitulo.reset();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.mensaje,
                showConfirmButton: false,
                timer: 1500
            });
        })
    }

    closeSubTitulo() {
        this.dialogUPS = false;
    }

    editSubTitulo(row) {
        this.updateSubTitulo = true;
        this.nombreSubTitulo = row.nombreSubTipo;
        // console.log('row edita ', row)
        this.formSubTitulo.patchValue({ nombreSubTitulo: row.nombreSubTipo });
        this.formSubTitulo.patchValue({ tieneCupo: row.tieneCupo });
    }

    aceptarEditarSubTitulo() {
        let dataSubTitulo = {
            tieneCupo: this.formSubTitulo.value.tieneCupo,
            nombreSubTipo: this.formSubTitulo.value.nombreSubTitulo,
            old_name: this.nombreSubTitulo,
            estado: this.formSubTitulo.value.tieneCupo
        }

        if (dataSubTitulo.tieneCupo == '' || dataSubTitulo.nombreSubTipo == '' || dataSubTitulo.old_name == '') {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Ingrese todos los datos ',
                showConfirmButton: false,
                timer: 1500
            });

            return
        }
        // console.log('sub titulo ', dataSubTitulo, 'id ups ', this.idUps)
        this.upsService.updateSubtitulosUPS(this.idUps, dataSubTitulo).subscribe((res: any) => {
            this.formSubTitulo.reset();
            this.listaSubTitulos = res.object.subTituloUPS;
            this.updateSubTitulo = false;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.mensaje,
                showConfirmButton: false,
                timer: 1500
            });
        })
    }

    eliminarSubTitulo(row) {
        let deleteSubTitulo = {
            nombreSubTipo: row.nombreSubTipo
        }

        Swal.fire({
            title: '¿Desea eliminar este registro?',
            showDenyButton: true,
            icon: 'warning',
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                this.upsService.deleteSubTituloUPS(this.idUps, deleteSubTitulo).subscribe((res: any) => {
                    this.listaSubTitulos = res.object.subTituloUPS;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: res.mensaje,
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
            } else if (result.isDenied) {
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'No se Elimino',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }
}
