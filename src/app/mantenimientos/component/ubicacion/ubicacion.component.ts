import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {UbicacionService} from "../../services/ubicacion/ubicacion.service";
import {Departamentos, Distrito, Provincias, Ubicacion} from "../../../core/models/ubicacion.models";
import Swal from "sweetalert2";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-ubicacion',
    templateUrl: './ubicacion.component.html',
    styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
    dataUbicacion: any;
    isUpdate: boolean = false;
    idUpdate: string = "";
    form: FormGroup;

    ubicacionDialog: boolean;
    ubicacionEditarDialog: boolean;

    dataDepartamntos: any;
    dataProvincia: any;
    dataDistrito: any;
    dataCCPP: any;

    submitted: boolean;


    iddd: string;


    constructor(private ubicacionService: UbicacionService,
                private formBuilder: FormBuilder,
    ) {
        this.buildForm();
        this.getUbicacion();
        this.getDepartamentos();
    }

    ngOnInit(): void {

    }


    getUbicacion() {
        this.ubicacionService.getUbicacion().subscribe((resp: any) => {
            this.dataUbicacion = resp.object;
            console.log('ubi ', this.dataUbicacion)
        });
    }


    getDepartamentos() {
        this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
            this.dataDepartamntos = resp.object;
            console.log('dep ', this.dataDepartamntos)
        });
    }

    buildForm() {
        this.form = this.formBuilder.group({
            ubigeo: ['', [Validators.required]],
            iddd: ['', [Validators.required]],
            departamento: ['', [Validators.required]],
            idpp: ['', [Validators.required]],
            provincia: ['', [Validators.required]],
            iddis: ['', [Validators.required]],
            distrito: ['', [Validators.required]],
            idccpp: ['', [Validators.required]],
            ccpp: ['', [Validators.required]],
            latitude: ['', [Validators.required]],
            longitude: ['', [Validators.required]],
            poblacion: ['', [Validators.required]],
            altura: ['', [Validators.required]],
            es_Capital: ['', [Validators.required]],
        })
    }

    edit(rowData) {
        this.isUpdate = true;
        this.form.get('ubigeo').setValue(rowData.ubigeo);
        this.form.get('iddd').setValue(rowData.iddd);
        this.form.get('departamento').setValue(rowData.departamento);
        this.form.get('idpp').setValue(rowData.idpp);
        this.form.get('provincia').setValue(rowData.provincia);
        this.form.get('iddis').setValue(rowData.iddis);
        this.form.get('distrito').setValue(rowData.distrito);
        this.form.get('idccpp').setValue(rowData.idccpp);
        this.form.get('ccpp').setValue(rowData.ccpp);
        this.form.get('latitude').setValue(rowData.latitude);
        this.form.get('longitude').setValue(rowData.longitude);
        this.form.get('poblacion').setValue(rowData.poblacion);
        this.form.get('altura').setValue(rowData.altura);
        this.form.get('es_Capital').setValue(rowData.es_Capital);
        this.idUpdate = rowData.id;
        this.ubicacionEditarDialog = true;

        // let aux = {
        //     iddd: rowData.iddd,
        //     idpp: rowData.idpp,
        //     iddis: rowData.iddis
        // }
        // this.ubicacionService.getCentroPoblado(aux).subscribe((res: any) => {
        //     this.dataCCPP = res.object;
        //     console.log('Centro Poblado ', res)
        // })
    }

    openNew() {
        this.isUpdate = false;
        this.form.reset();
        this.form.get('departamento').setValue("");
        this.form.get('provincia').setValue("");
        this.form.get('distrito').setValue("");
        this.form.get('ccpp').setValue("");
        this.form.get('latitude').setValue("");
        this.form.get('longitude').setValue("");
        this.form.get('poblacion').setValue("");
        this.form.get('altura').setValue("");
        this.form.get('es_Capital').setValue("");
        this.ubicacionDialog = true;
    }

    saveForm() {
        this.isUpdate = false;
        const req = {
            iddd: this.form.value.iddd,
            idpp: this.form.value.idpp,
            iddis: this.form.value.iddis,
            idccpp: this.form.value.idccpp,
            ccpp: this.form.value.ccpp,
            latitude: this.form.value.latitude,
            longitude: this.form.value.longitude,
            poblacion: this.form.value.poblacion,
            altura: this.form.value.altura,
            es_Capital: this.form.value.es_Capital,
        }

        if (req.ccpp.trim() !== "") {
            this.ubicacionService.saveCCPP(req).subscribe(
                result => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Agregado correctamente',
                        text: 'CCPP',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    this.getUbicacion();
                    this.ubicacionDialog = false;
                }
            )
        }

        console.log(req)
    }

    editarDatos() {
        const req = {
            id: this.idUpdate,
            ubigeo: this.form.value.ubigeo,
            iddd: this.form.value.iddd,
            idpp: this.form.value.idpp,
            iddis: this.form.value.iddis,
            idccpp: this.form.value.idccpp,
            ccpp: this.form.value.ccpp,
            latitude: this.form.value.latitude,
            longitude: this.form.value.longitude,
            poblacion: this.form.value.poblacion,
            altura: this.form.value.altura,
            es_Capital: this.form.value.es_Capital,
        }
        let id = req.id;
        this.ubicacionService.editarCCPP(id, req).subscribe(
            result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Agregado correctamente',
                    text: 'Ubicacion',
                    showConfirmButton: false,
                    timer: 1500,
                })
                this.getUbicacion();
                this.ubicacionEditarDialog = false;
            }
        )
        console.log(req);

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
        this.ubicacionEditarDialog = false;
        this.submitted = false;
    }

    selectedDepartamento() {
        const dpto = {
            id: this.idUpdate,
            departamento: this.form.value.departamento,
            iddd: this.form.value.iddd,
        }
        let rowData = dpto.departamento.iddd;
        console.log(rowData)
        // this.ubicacionService.getProvincias(rowData).subscribe((res: any) => {
        //     this.dataProvincia = res.object;
        //     console.log('data pro', res)
        // })
    }


    selectedProvincia() {
        const rowData = {
            departamento: this.form.value.departamento,
            provincia: this.form.value.provincia,
        };

        let d = rowData.departamento.iddd;
        let p = rowData.provincia.idpp;

        let aux = {
            iddd: d,
            idpp: p
        }
        this.ubicacionService.getDistritos(aux).subscribe((res: any) => {
            this.dataDistrito = res.object;

            console.log('distrito ', res)
        })
    }

    selectDistrito() {
        const rowData = {
            departamento: this.form.value.departamento,
            provincia: this.form.value.provincia,
            distrito: this.form.value.distrito,
        };

        let d = rowData.departamento.iddd;
        let p = rowData.provincia.idpp;
        let dt = rowData.distrito.iddis;

        let aux = {
            iddd: d,
            idpp: p,
            iddis: dt
        }
        this.ubicacionService.getCentroPoblado(aux).subscribe((res: any) => {
            this.dataCCPP = res.object;
            console.log('Centro Poblado ', res)
        })

    }

    titulo() {
        if (this.isUpdate) return "ACTUALIZAR CENTRO POBLADO";
        else return "INGRESE UN NUEVO CENTRO POBLADO";
    }
}
