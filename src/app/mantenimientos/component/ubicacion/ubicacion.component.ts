import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {UbicacionService} from "../../services/ubicacion/ubicacion.service";
import {Departamentos, Provincias, Ubicacion} from "../../../core/models/ubicacion.models";
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

    departamentos: any[];
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
            ccpp : ['0'],
        });
    }

    getUbicacion() {
        this.ubicacionService.getUbicacion().subscribe((resp: any) => {
            this.data = resp.object;
        });
    }


    // getDepartamentos2() {
    //     this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
    //         this.dataDepartamntos = resp.object;
    //         // console.log(resp)
    //     });
    //
    // }

    getDepartamentos() {
        this.ubicacionService.getDepartamentos()
            .subscribe(result => {
                this.departamentos = result['docs'];
            })
    }

    selectdepartamento(event) {
        this.form.get('provincia').setValue('0');
        this.form.get('distrito').setValue('0');
        // this.form.get('comunidad').setValue('0');
        this.form.get('ccpp').setValue('0');
        if (event.value) {
            this.ubicacionService.getProvinces(this.form.get('departamento').value)
                .subscribe(result => {
                    this.provincias = result['docs'];
                })
        } else {
            this.form.get('departamento').setValue('0');
            this.provincias = [];
            this.distritos = [];
            // this.comunidades = [];
            this.centroPoblado = [];
        }
    }

    selectprovincia(event) {
        this.form.get('distrito').setValue('0');
        // this.form.get('comunidad').setValue('0');
        this.form.get('ccpp').setValue('0');
        if (event.value) {
            this.ubicacionService.getDistritos(this.form.get('provincia').value)
                .subscribe(result => {
                    this.distritos = result['docs'];
                })
        } else {
            this.form.get('provincia').setValue('0');
            this.distritos = [];
            // this.comunidades = [];
            this.centroPoblado = [];
        }
    }


    selectdistrito(event) {
        // this.form.get('comunidad').setValue('0');
        this.form.get('ccpp').setValue('0');
        if (event.value) {
            this.ubicacionService.getCentrosPoblados(this.form.get('distrito').value)
                .subscribe(result => {
                    this.centroPoblado = result['docs'];
                })
        } else {
            this.form.get('distrito').setValue('0');
            // this.comunidades = [];
            this.centroPoblado = [];
        }
    }



    selectsector(event) {
        if(!event.value) {
            this.form.get('ccpp').setValue('0');
        }
    }

    enviarFiltros(event: Event) {
        this.eventFiltros.emit({
            iddd: this.form.get('departamento').value,
            idpp: this.form.get('provincia').value,
            iddis: this.form.get('distrito').value,
            idccpp: this.form.get('ccpp').value,
        });
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
