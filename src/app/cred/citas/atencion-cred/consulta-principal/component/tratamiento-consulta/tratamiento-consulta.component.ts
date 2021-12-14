import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DiagnosticoConsultaService} from "../../services/diagnostico-consulta.service";
import {CieService} from "../../../../../../obstetricia-general/services/cie.service";
import {TratamientoConsultaService} from "../../services/tratamiento-consulta.service";

@Component({
    selector: 'app-tratamiento-consulta',
    templateUrl: './tratamiento-consulta.component.html',
    styleUrls: ['./tratamiento-consulta.component.css']
})
export class TratamientoConsultaComponent implements OnInit {
    data: any[] = [];
    tratamientos: any[] = [];
    acuerdos: any[] = [];

    id: string;
    attributeLocalS = 'idConsulta'
    formTratamiento: FormGroup;
    formAcuerdos: FormGroup
    dialogTratamiento: boolean;
    dialogAcuerdos: boolean;

    isUpdate2: boolean = false;
    bool: boolean = false;
    index: number

    isUpdate3: boolean = false;
    bool3: boolean = false;
    index3: number

    tratamiento: tratamientoIntervencionesInterface

    constructor(private tratamientoService: TratamientoConsultaService,
                private cieService: CieService,
                private formBuilder: FormBuilder) {
        this.buildForm();
    }

    ngOnInit(): void {
    }

    buildForm() {
        this.id = localStorage.getItem(this.attributeLocalS);
        this.formTratamiento = this.formBuilder.group({
            textoTratamiento: new FormControl("", []),
        });
        this.formAcuerdos = this.formBuilder.group({
            textoAcuerdo: new FormControl("", []),
        });
        this.recuperarTratamiento()
    }

    /*  objeto diagnostico */
    recuperarTratamiento() {
        this.tratamientoService.getTratamiento(this.id).subscribe((r: any) => {
            //-- recupera informacion de diagnostico
            this.tratamiento = r.object;
            console.log('tratamiento', this.tratamiento)
            this.tratamientos = this.tratamiento.tratamientos
            this.acuerdos = (this.tratamiento.acuerdos === null) ? [] : this.tratamiento.acuerdos
            console.log("tratamientos", this.tratamientos)
        })

    }

    guardarTratamientos(): void {
        for (let i = 0; i < this.tratamientos.length; i++) {
            let aux = {
                codigoItem: "string",
                descripcion: this.tratamientos[i],
                nroDosis: 1,
                viaAdministracion: "string",
                frecuencia: "string",
                Lote: "string",
                fechaVencimiento: "string"
            }
            this.tratamientos.push(aux);
        }
    }

    guardar() {
        //this.guardarTratamientos()
        const req = {
            tratamientos: this.tratamientos,
            acuerdos: this.acuerdos
        }
        console.log('req', req)
        if (this.tratamientos) {
            this.tratamientoService.updateTratamiento(this.id, req).subscribe(
                (resp) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizado correctamente',
                        text: '',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            )
        }
    }

    /* funciones tabla tratamiento */
    openTratamiento() {
        this.isUpdate2 = false;
        this.formTratamiento.reset();
        this.formTratamiento.get('textoTratamiento').setValue("");
        this.dialogTratamiento = true;
    }

    cancelTratamiento() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.dialogAcuerdos = false;
    }

    saveTratamiento() {
        let aux = true
        if (this.bool3 === false) {
            aux = false
            this.isUpdate3 = false;
            let a = {
                codigoItem: "string",
                descripcion: this.formTratamiento.value.textoTratamiento,
                nroDosis: 1,
                viaAdministracion: "string",
                frecuencia: "string",
                Lote: "string",
                fechaVencimiento: "string"
            }
            this.acuerdos.push(a);
        } else {
            this.tratamientos[this.index].descripcion = this.formTratamiento.value.textoTratamiento
            this.bool = false;
        }
        console.log("tratamientos", this.tratamientos)
        Swal.fire({
            icon: 'success',
            title: aux !== true ? 'Agregado correctamente' : 'Actualizado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
        })
        this.dialogTratamiento = false;
    }

    eliminarTratamiento(index) {
        this.tratamientos.splice(index, 1)
    }

    editarTratamiento(row, index) {
        this.isUpdate2 = false;
        this.bool = true;
        this.index = index
        this.formTratamiento.reset();
        this.formTratamiento.get('textoTratamiento').setValue(row.descripcion);
        this.dialogTratamiento = true;
    }

    /* funciones tabla acuerdo*/
    openAcuerdo() {
        this.isUpdate3 = false;
        this.formAcuerdos.reset();
        this.formAcuerdos.get('textoAcuerdo').setValue("");
        this.dialogAcuerdos = true;
    }

    cancelAcuerdo() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.dialogAcuerdos = false;
    }

    saveAcuerdo() {
        let aux = true
        if (this.bool3 === false) {
            aux = false
            this.isUpdate3 = false;
            let a = {
                codigo: "string",
                descripcion: this.formAcuerdos.value.textoAcuerdo
            }
            this.acuerdos.push(a);
        } else {
            this.acuerdos[this.index3].descripcion = this.formAcuerdos.value.textoAcuerdo
            this.bool3 = false;
        }
        console.log("acuerdos", this.acuerdos)
        Swal.fire({
            icon: 'success',
            title: aux !== true ? 'Agregado correctamente' : 'Actualizado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
        })
        this.dialogAcuerdos = false;
    }

    eliminarAcuerdo(index) {
        this.acuerdos.splice(index, 1)
    }

    editarAcuerdo(row, index) {
        this.isUpdate3 = false;
        this.bool3 = true;
        this.index3 = index
        this.formAcuerdos.reset();
        this.formAcuerdos.get('textoAcuerdo').setValue(row.descripcion);
        this.dialogAcuerdos = true;
    }
}

interface tratamientoIntervencionesInterface {
    tratamientos: tratamientoInterface[]
    acuerdos: acuerdosInterface[]
    evalOjosVision: {
        ojoDerecho: number,
        ojoIzquierdo: number
    }
    tamizajeSaludMental: string
}

interface tratamientoInterface {
    codigoItem: string,
    descripcion: string,
    nroDosis: number,
    viaAdministracion: string,
    frecuencia: string,
    Lote: string,
    fechaVencimiento: string
}

interface acuerdosInterface {
    codigo: string,
    descripcion: string
}
