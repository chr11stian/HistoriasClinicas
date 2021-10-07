import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RedServicioSalud } from 'src/app/core/models/mantenimiento.models';
import { Ubicacion } from 'src/app/core/models/ubicacion.models';
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
    ubicacion: Ubicacion = {};
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

    constructor(
        private fb: FormBuilder,
        private ubicacionService: UbicacionService,
        private redServiciosSaludService: RedServiciosSaludService,
    ) { }

    ngOnInit(): void {
        this.getRedServiciosSalud();
        console.log('lista red srevicios ', this.listaRedServiciosSalud)
        this.inicializarFormRedServicio();
        // this.getDepartamentos();
        this.getMicroRedServiciosSalud()
        // this.changedMicroRedSelected();
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
            console.log('data res ', this.listaRedServiciosSalud)
        })
    }

    getMicroRedServiciosSalud() {
        this.redServiciosSaludService.getEESS(385).subscribe((res: any) => {
            this.listaEESS = res.object;
            console.log('eess ', this.listaEESS)
        })
    }

    getDepartamentos() {
        this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
            this.dataDepartamentos = resp.object;
        });
    }

    openDialogAgregarRedServicios() {
        this.agregarRedServicio = true;
    }

    openDialogAgregarMicroRedServicios() {
        this.agregarMicroRedServicio = true;
    }

    openDialogAgregarEESS() {
        this.agregarEESS = true;
        this.getDepartamentos();
        console.log('select red es, ', this.selectedRedEESS)
        console.log('selected micro ', this.selectedMicroRed)
    }

    closeDialogRedServicio() {
        this.agregarRedServicio = false;
    }

    aceptarDialogRedServicio() {
        this.recuperarDatosRed();
        console.log('datos red ', this.dataRed)
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

    aceptarDialogMicroRed() {
        this.recuperarDatosMicroRed();
        console.log('data micro red', this.dataMicroRed, 'id red ', this.selectedRed.idRed)

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

    aceptarDialogEESS() {
        this.recuperaDatosEESS();
        this.redServiciosSaludService.postEESS(this.selectedMicroRed.idMicroRed, this.dataEESS).subscribe((res: any) => {
            console.log('res post eess ', res)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se actualizo Correctamente',
                showConfirmButton: false,
                timer: 1500
            });
        })
    }

    selectedDepartamento() {
        let aux: any = this.ubicacion.departamento
        let dpto = {
            iddd: aux.iddd
        }
        this.iddd = aux.iddd;
        this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
            this.dataProvincia = res.object;
            console.log('data pro', this.dataProvincia)
        });
    }

    selectedProvincia() {
        let aux: any = this.ubicacion.provincia;
        let provincia = {
            iddd: this.iddd,
            idpp: aux.idpp
        };
        console.log('ubicacion ', this.ubicacion);
        this.ubicacionService.getDistritos(provincia).subscribe((res: any) => {
            this.dataDistrito = res.object;
            console.log('distrito ', this.dataDistrito)
        })
    }

    recuperarDatosRed() {
        this.dataRed = {
            idRed: this.formRedServicio.value.idRed,
            nombreRed: this.formRedServicio.value.nombreRed,
            disa: this.formRedServicio.value.disa,
        }
    }

    recuperarDatosMicroRed() {
        this.dataMicroRed = {
            idMicroRed: this.formMicroRed.value.idMicroRed,
            nombreMicroRed: this.formMicroRed.value.nombreMicroRed
        }
    }

    recuperaDatosEESS() {
        let auxUbicacion: any = this.ubicacion;
        this.dataEESS = {
            idEESS: this.formEESS.value.idEESS,
            nombreEESS: this.formEESS.value.nombreEESS,
            categoria: this.formEESS.value.categoria,
            departamento: auxUbicacion.departamento.departamento,
            provincia: auxUbicacion.provincia.provincia,
            distrito: auxUbicacion.distrito.distrito
        }
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
            console.log('res change red ', this.listaGetMicroRed)
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
        console.log(index)
        if (index == 2 || index == 1) {
            this.listaGetMicroRed = [];
            this.listaEESS = [];
            this.selectedRed = '';
            this.selectedRedEESS = '';
        }
    }
}
