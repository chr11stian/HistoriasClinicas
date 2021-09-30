import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {FiltroService} from "../../../services/filtro/filtro.service";
import {Filtro} from "../../../../core/models/ubicacion.models";

@Component({
    selector: 'app-filtro',
    templateUrl: './filtro.component.html',
    styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

    form: FormGroup;
    @Output() eventFiltros = new EventEmitter<any>();


    // Arrays para los combo box (p-dropdown)
    departamentos: any[];
    provincias: any[];
    distritos: any[];
    // comunidades: any[];
    sectores: any[];

    constructor(
        private formBuilder: FormBuilder,
        private filtroService: FiltroService,
    ) {
        this.buildForm();
    }

    ngOnInit(): void {
        // Here we give the information from the bd
        this.getDepartamentos();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            departamento: ['0'],
            provincia: ['0'],
            distrito: ['0'],
            // comunidad: [0],
            sector: ['0'],
        });
    }

    getDepartamentos() {
        this.filtroService.getDepartments()
            .subscribe(result => {
                this.departamentos = result['docs'];
                console.log(result);
            })
    }

    selectdepartamento(event) {
        this.form.get('provincia').setValue('0');
        this.form.get('distrito').setValue('0');
        // this.form.get('comunidad').setValue('0');
        this.form.get('ccpp').setValue('0');
        if (event.value) {
            this.filtroService.getProvinces(this.form.get('departamento').value)
                .subscribe(result => {
                    this.provincias = result['docs'];
                    console.log(result);
                })
        } else {
            this.form.get('departamento').setValue('0');
            this.provincias = [];
            this.distritos = [];
            // this.comunidades = [];
            this.sectores = [];
        }
    }

    selectprovincia(event) {
        this.form.get('distrito').setValue('0');
        // this.form.get('comunidad').setValue('0');
        this.form.get('ccpp').setValue('0');
        if (event.value) {
            this.filtroService.getDistritos(this.form.get('provincia').value)
                .subscribe(result => {
                    this.distritos = result['docs'];
                })
        } else {
            this.form.get('provincia').setValue('0');
            this.distritos = [];
            // this.comunidades = [];
            this.sectores = [];
        }
    }

    selectdistrito(event) {
        // this.form.get('comunidad').setValue('0');
        this.form.get('ccpp').setValue('0');
        if (event.value) {
            this.filtroService.getCentrosPoblados(this.form.get('distrito').value)
                .subscribe(result => {
                    this.sectores = result['docs'];
                })
        } else {
            this.form.get('distrito').setValue('0');
            // this.comunidades = [];
            this.sectores = [];
        }
    }

    // selectcomunidad(event) {
    //   this.form.get('ccpp').setValue('0');
    //   if(event.value) {
    //     this.sectores = this.sectorAll
    //     .filter(p => p.idComunidad === this.form.get('comunidad').value);
    //   } else {
    //     this.form.get('comunidad').setValue('0');
    //     this.sectores = [];
    //   }
    // }

    selectsector(event) {
        if (!event.value) {
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
}
