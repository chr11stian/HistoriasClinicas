import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ubicacion } from 'src/app/core/models/ubicacion.models';
import { RedServiciosSaludService } from '../../services/red-servicios-salud.service';
import { UbicacionService } from '../../services/ubicacion/ubicacion.service';

@Component({
    selector: 'app-red-servicios-salud',
    templateUrl: './red-servicios-salud.component.html',
    styleUrls: ['./red-servicios-salud.component.css']
})
export class RedServiciosSaludComponent implements OnInit {

    listarRedServiciosSalud: any;
    selectedRedServiciosSalud: any;
    agregarRedServicio: boolean;
    formRedServicio: FormGroup;
    formExtraRedServicio: FormGroup
    ubicacion: Ubicacion = {};
    departamento: any;
    dataDepartamentos: any;
    dataProvincia: any;
    dataDistrito: any;
    iddd: string;
    dataRedServicioSalud: any;

    constructor(
        private redServicioSaludService: RedServiciosSaludService,
        private fb: FormBuilder,
        private ubicacionService: UbicacionService
    ) { }

    ngOnInit(): void {
        this.getRedServiciosSalud();
        this.inicializarFormRedServicio();
        this.getDepartamentos();
    }

    inicializarFormRedServicio() {
        this.formRedServicio = this.fb.group({
            nombreRed: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
            disa: new FormControl('', { validators: [Validators.required] }),
            nombreEESS: new FormControl('', { validators: [Validators.required] }),
            categoria: new FormControl('', { validators: [Validators.required] }),
            ubigeo: new FormControl(''),
        })
    }

    getRedServiciosSalud() {
        this.redServicioSaludService.getRedServiciosSalud().subscribe((res: any) => {
            console.log('res ', res)
        })
    }
    getDepartamentos() {
        this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
            this.dataDepartamentos = resp.object;
            console.log('dep ', this.dataDepartamentos)
        });
    }

    openDialogAgregarRedServicios() {
        this.agregarRedServicio = true;
    }

    selectedDepartamento() {
        let aux: any = this.ubicacion.departamento
        let dpto = {
            iddd: aux.iddd
        }
        this.iddd = aux.iddd
        this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
            this.dataProvincia = res.object;
            console.log('data pro', this.dataProvincia)
        })
    }

    selectedProvincia() {
        let aux: any = this.ubicacion.provincia;
        let provincia = {
            iddd: this.iddd,
            idpp: aux.idpp
        };
        this.ubicacionService.getDistritos(provincia).subscribe((res: any) => {
            this.dataDistrito = res.object;
            console.log('distrito ', this.dataDistrito)
        })
    }

    recuperarDatos() {
        this.dataRedServicioSalud = {
            nombreRed: this.formRedServicio.value.nombreRed,
            disa: this.formRedServicio.value.disa,
            nombreEESS: this.formRedServicio.value.nombreEESS,
            categoria: this.formRedServicio.value.categoria,
            ubigeo: this.formRedServicio.value.ubigeo
        }
    }

    limpiarCampos() {
        this.formRedServicio.reset();
        this.formRedServicio.patchValue({ nombreRed: '' });
        this.formRedServicio.patchValue({ disa: '' });
        this.formRedServicio.patchValue({ nombreEESS: '' });
        this.formRedServicio.patchValue({ categoria: '' });
        this.formRedServicio.patchValue({ ubigeo: '' });
    }

    closeDialogRedServicio() {
        this.agregarRedServicio = false;
    }

    aceptarDialogRedServicio() {
        this.recuperarDatos();
        console.log('datos ', this.dataRedServicioSalud)
        this, this.limpiarCampos();
    }
}
