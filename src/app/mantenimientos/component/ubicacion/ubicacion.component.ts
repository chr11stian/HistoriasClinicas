import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {UbicacionService} from "../../services/ubicacion/ubicacion.service";
import {Departamentos, Filtro, Provincias, Ubicacion} from "../../../core/models/ubicacion.models";
import {PrimeNGConfig} from "primeng/api";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-ubicacion',
    templateUrl: './ubicacion.component.html',
    styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
    form: FormGroup;
    @Output() eventFiltros = new EventEmitter<any>();
    datosTabla = [];
    tablaBD = [];


    dataDepartamntos: any[];
    provincias: any[];
    distritos: any[];
    centroPoblado: any[];

    data: any;
    ubicacion: Ubicacion;
    ubicacions: Ubicacion[];

    ubicacionDialog: boolean;


    submitted: boolean;
    loading = true;

    constructor(private ubicacionService: UbicacionService,
                private formBuilder: FormBuilder,
    ) {
        this.getUbicacion();
    }

    ngOnInit(): void {
        // this.getDepartamentos();
        this.getDepartamentos();

    }


    buildForm() {
        this.form = this.formBuilder.group({
            departamento: ['0'],
            provincia: ['0'],
            distrito: ['0'],
            // comunidad: [0],
            ccpp: ['0'],
        });
    }

    getUbicacion() {
        this.ubicacionService.getUbicacion().subscribe((resp: any) => {
            this.data = resp.object;
        });
    }


    getDepartamentos() {
        this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
            this.dataDepartamntos = resp.object;
            // console.log(resp)
        });

    }


    getDatosSistema() {
        this.ubigeoService.getDatosSistema().subscribe(
            result => {
                this.sacarUbigeo(result['docs'])
                this.tablaBD = result['docs']
                this.datosTabla = this.tablaBD
                this.loading = false
            })
    }


    // Filtramos con los datos que nos da el componente child(filtro)
    filtrar(data: Filtro) {
        // Sacamos los ids del departamento, provincia, distrito, comunidad, sector
        const {iddd, idpp, iddis, idccpp} = data;
        this.datosTabla = this.tablaBD.filter(d => {
            return (
                d.iddd == (iddd !== '0' ? iddd : d.iddd)
                &&
                d.idpp == (idpp !== '0' ? idpp : d.idpp)
                &&
                d.iddis == (iddis !== '0' ? iddis : d.iddis)
                &&
                d.idccpp == (idccpp !== '0' ? idccpp : d.idccpp)
            );
        });
    }


    selectsector(event) {
        if (!event.value) {
            this.form.get('ccpp').setValue('0');
        }
    }


    editUbicacion(ubicacion: Ubicacion) {
        this.ubicacion = {...ubicacion};
        this.ubicacionDialog = true;
    }


    openNew() {
        this.ubicacion = {};
        this.submitted = false;
        this.ubicacionDialog = true;
    }

    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.ubicacionDialog = false;
        this.submitted = false;
    }

}
