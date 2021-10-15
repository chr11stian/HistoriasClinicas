import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RedServicioSalud } from 'src/app/core/models/mantenimiento.models';
import { Ubicacion, Departamentos, Provincias, Distrito } from 'src/app/core/models/ubicacion.models';
import { RedServiciosSaludService } from '../../services/red-servicios-salud/red-servicios-salud.service';
import { UbicacionService } from '../../services/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-red-servicios-salud',
    templateUrl: './red-servicios-salud.component.html',
    styleUrls: ['./red-servicios-salud.component.css']
})
export class RedServiciosSaludComponent implements OnInit {

    listarRedServiciosSalud: any;
    selectedRedServiciosSalud: any;
    agregarRedServicio: boolean;
    agregarMicroRedServicio: boolean;
    agregarEESS: boolean;
    formRedServicio: FormGroup;
    formExtraRedServicio: FormGroup;
    formMicroRed: FormGroup;
    formEESS: FormGroup;
    ubicacion: Ubicacion;
    departamento: any;
    dataDepartamentos: any;
    dataProvincia: any;
    dataDistrito: any;
    iddd: string;
    dataRed: RedServicioSalud;
    dataMicroRed: RedServicioSalud;
    dataEESS: RedServicioSalud
    listaRedServiciosSalud: RedServicioSalud[] = [];
    listaMicroRedServicioSalud: RedServicioSalud[] = [];
    listaGetMicroRed: RedServicioSalud[] = [];
    listaEESS: RedServicioSalud[] = [];
    selectedRed: any = {
        nombreRed: '',
        idRed: ''
    };
    selectedRedEESS: any;
    selectedMicroRed: any;
    update: boolean = false;
    dpto: Departamentos;
    prov: Provincias;
    dist: Distrito;

    constructor(
        private fb: FormBuilder,
        private ubicacionService: UbicacionService,
        private redServiciosSaludService: RedServiciosSaludService,
    ) { }

    ngOnInit(): void {
        this.getRedServiciosSalud();
        this.inicializarFormRedServicio();
    }

    inicializarFormRedServicio() {
        this.formRedServicio = this.fb.group({
            idRed: new FormControl('', { validators: [Validators.required] }),
            nombreRed: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
            disa: new FormControl('', { validators: [Validators.required] })
        });

        this.formMicroRed = this.fb.group({
            nombreMicroRed: new FormControl('', { validators: [Validators.required] }),
            idMicroRed: new FormControl('', { validators: [Validators.required] })
        });

        this.formEESS = this.fb.group({
            idEESS: new FormControl(''),
            nombreEESS: new FormControl(''),
            categoria: new FormControl(''),
            ubigeo: new FormControl('')
        })
    }

    getRedServiciosSalud() {
        this.redServiciosSaludService.getRedServiciosSalud().subscribe((res: any) => {
            this.listaRedServiciosSalud = res.object;
        })
    }

    getDepartamentos() {
        this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
            this.dataDepartamentos = resp.object;
        });
    }

    openDialogAgregarRedServicios() {
        this.update = false;
        this.limpiarCampos();
        this.agregarRedServicio = true;
    }

    openDialogAgregarMicroRedServicios() {
        this.update = false;
        if (this.selectedRed == '') {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Seleccione una red',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        this.agregarMicroRedServicio = true;
    }

    openDialogAgregarEESS() {
        if (this.selectedRedEESS == '') {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Seleccione una red',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        if (this.selectedMicroRed == '') {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Seleccione una Micro Red',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        this.agregarEESS = true;
        this.getDepartamentos();
        this.dpto = {};
        this.prov = {};
        this.dist = {};
    }

    closeDialogRedServicio() {
        this.agregarRedServicio = false;
    }

    recuperarDatosRed() {
        this.dataRed = {
            idRed: this.formRedServicio.value.idRed,
            nombreRed: this.formRedServicio.value.nombreRed,
            disa: this.formRedServicio.value.disa,
        }
    }

    aceptarDialogRedServicio() {
        this.recuperarDatosRed();
        this.redServiciosSaludService.postRedServiciosSalud(this.dataRed).subscribe((res: any) => {
            this.limpiarCampos();
            this.closeDialogRedServicio();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se Registro Correctamente',
                showConfirmButton: false,
                timer: 1500
            });
        });
    }

    closeDialogMicroRed() {
        this.agregarMicroRedServicio = false;
    }

    recuperarDatosMicroRed() {
        this.dataMicroRed = {
            idMicroRed: this.formMicroRed.value.idMicroRed,
            nombreMicroRed: this.formMicroRed.value.nombreMicroRed
        }
    }

    aceptarDialogMicroRed() {
        this.recuperarDatosMicroRed();

        this.redServiciosSaludService.postMicroRedServiciosSalud(this.selectedRed.idRed, this.dataMicroRed).subscribe((res: any) => {
            // console.log('event ', event.codRed)
            this.limpiarCampos();
            this.closeDialogMicroRed();
            // this.changeRedSelected(event);
            this.redServiciosSaludService.getMicroRedServiciosSalud(this.selectedRed.idRed).subscribe((res: any) => {
                this.listaGetMicroRed = res.object;
            });
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se Registro Correctamente',
                showConfirmButton: false,
                timer: 1500
            });
        });
    }

    closeDialogEESS() {
        this.agregarEESS = false;
    }

    recuperaDatosEESS() {
        let auxUbigeo: any = this.dpto.iddd + this.prov.idpp + this.dist.iddis
        this.dataEESS = {
            idEESS: this.formEESS.value.idEESS,
            nombreEESS: this.formEESS.value.nombreEESS,
            categoria: this.formEESS.value.categoria,
            departamento: this.dpto.departamento,
            provincia: this.prov.provincia,
            distrito: this.dist.distrito,
            ubigeo: auxUbigeo
        }
    }

    aceptarDialogEESS() {
        this.recuperaDatosEESS();
        this.redServiciosSaludService.postEESS(this.selectedMicroRed.idMicroRed, this.dataEESS).subscribe((res: any) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se Registro Correctamente ',
                showConfirmButton: false,
                timer: 1500
            });
            this.redServiciosSaludService.getEESS(this.selectedMicroRed.idMicroRed).subscribe((res: any) => {
                this.listaEESS = res.object;
            })
            this.closeDialogEESS();
            this.limpiarCampos();
            this.ubicacion = {};
        })
    }

    selectedDepartamento() {
        let dpto = {
            iddd: this.dpto.iddd
        }
        this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
            this.dataProvincia = res.object;
        });
    }

    selectedProvincia() {
        let provincia = {
            iddd: this.dpto.iddd,
            idpp: this.prov.idpp
        };
        this.ubicacionService.getDistritos(provincia).subscribe((res: any) => {
            this.dataDistrito = res.object;
        })
    }

    limpiarCampos() {
        this.formRedServicio.reset();
        this.formMicroRed.reset();
        this.formEESS.reset();
        this.formRedServicio.patchValue({ idRed: '' })
        this.formRedServicio.patchValue({ nombreRed: '' });
        this.formRedServicio.patchValue({ disa: '' });
        this.formMicroRed.patchValue({ idMicroRed: '' });
        this.formMicroRed.patchValue({ nombreMicroRed: '' });
        this.formEESS.patchValue({ idEESS: '' });
        this.formEESS.patchValue({ nombreEESS: '' });
        this.formEESS.patchValue({ categoria: '' });
        this.formEESS.patchValue({ ubigeo: '' });
    }

    changeRedSelected(event) {
        this.redServiciosSaludService.getMicroRedServiciosSalud(event.idRed).subscribe((res: any) => {
            this.listaGetMicroRed = res.object;
            if (this.listaGetMicroRed[0].idMicroRed == null) {
                this.listaGetMicroRed = [];
            }
        })
    }

    changedMicroRedSelected(event) {
        this.redServiciosSaludService.getEESS(event.idMicroRed).subscribe((res: any) => {
            this.listaEESS = res.object;
            if (this.listaEESS[0].idEESS == null) {
                this.listaEESS = [];
            }
        })
    }

    handleChange(e) {
        var index = e.index;
        if (index == 2 || index == 1) {
            this.listaGetMicroRed = [];
            this.listaEESS = [];
            this.selectedRed = '';
            this.selectedRedEESS = '';
            this.selectedMicroRed = '';
        }
    }

    openEditarRed(row) {
        this.update = true;
        this.formRedServicio.patchValue({ idRed: row.idRed });
        this.formRedServicio.patchValue({ disa: row.disa });
        this.formRedServicio.patchValue({ nombreRed: row.nombreRed });
        this.agregarRedServicio = true;
    }

    editarRed() {
        this.recuperarDatosRed();
        this.redServiciosSaludService.putRed(this.dataRed).subscribe((res: any) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se actualizo correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            this.agregarRedServicio = false;
        })
    }

    eliminarRed(row) {

    }

    openEditarMicroRed(row) {
        this.update = true;
        this.formMicroRed.patchValue({ idMicroRed: row.idMicroRed });
        this.formMicroRed.patchValue({ nombreMicroRed: row.nombreMicroRed });
        this.agregarMicroRedServicio = true;
    }

    editarMicroRed() {
        this.recuperarDatosMicroRed();
        this.redServiciosSaludService.putMicroRed(this.dataMicroRed).subscribe((res: any) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se actualizo correctamente',
                showConfirmButton: false,
                timer: 1500
            });
        });
        this.agregarMicroRedServicio = false;
    }

    eliminarMicroRed(row) {

    }

    openEditarEESS(row) {
        this.dpto = {};
        this.prov = {};
        this.dist = {};
        this.getDepartamentos();
        this.formEESS.patchValue({ idEESS: row.idEESS });
        this.formEESS.patchValue({ nombreEESS: row.nombreEESS });
        this.formEESS.patchValue({ categoria: row.categoria });
        let auxDep = row.ubigeo.slice(0, 2);
        let auxProv = row.ubigeo.slice(2, 4);
        let auxDist = row.ubigeo.slice(4, 6);
        let dep = {
            departamento: row.departamento,
            iddd: auxDep
        }
        this.dpto = dep;
        this.ubicacionService.getProvincias(dep).subscribe((res: any) => {
            this.dataProvincia = res.object;
        })

        this.prov = {
            idpp: auxProv,
            provincia: row.provincia
        }

        let provAux = {
            iddd: auxDep,
            idpp: auxProv
        }
        this.ubicacionService.getDistritos(provAux).subscribe((res: any) => {
            this.dataDistrito = res.object;
        });

        this.dist = {
            iddis: auxDist,
            distrito: row.distrito
        }

        this.agregarEESS = true;
    }

    editarEESS() {
        // this.redServiciosSaludService.get
        console.log('este es el editar para estableciemiento de salud ')

    }

    eliminarEESS(row) {

    }
}
