import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {TratamientoConsultaService} from "../../services/tratamiento-consulta.service";
import {CieService} from "../../../../../../obstetricia-general/services/cie.service";

@Component({
    selector: 'app-finalizar-consulta',
    templateUrl: './finalizar-consulta.component.html',
    styleUrls: ['./finalizar-consulta.component.css']
})
export class FinalizarConsultaComponent implements OnInit {
    acuerdosFG: FormGroup

    acuerdosCompromisos: acuerdosComprimisosInterface[] = [];
    examenesAux: examenesAuxInteface[] = [];

    id: string;
    attributeLocalS = 'idConsulta'
    formExamen: FormGroup;
    formAcuerdos: FormGroup
    form: FormGroup
    dialogTratamiento: boolean;
    dialogAcuerdos: boolean;
    dialogExamenes: boolean;

    isUpdate3: boolean = false;
    bool3: boolean = false;
    index3: number

    isUpdate4: boolean = false;
    bool4: boolean = false;
    index4: number

    constructor(private tratamientoService: TratamientoConsultaService,
                private cieService: CieService,
                private formBuilder: FormBuilder) {
        this.buildFG();
    }

    buildFG(): void {
        this.acuerdosFG = new FormGroup({
            detailAcuerdoFC: new FormControl({value: '', disabled: false}, []),
            proximaCitaFC: new FormControl({value: null, disabled: false}, []),
            atendidoFC: new FormControl({value: '', disabled: false}, []),
            dniFC: new FormControl({value: '', disabled: false}, []),
            observacionFC: new FormControl({value: '', disabled: false}, []),
        })
        this.formAcuerdos = this.formBuilder.group({
            descripcionAcuerdo: new FormControl("", []),
        });

        this.formExamen = this.formBuilder.group({
            nombreEspecialidad: new FormControl("", []),
            examen: new FormControl("", []),
        });
    }

    ngOnInit(): void {
    }

    /* funciones tabla acuerdo*/
    openAcuerdo() {
        this.isUpdate3 = false;
        this.formAcuerdos.reset();
        this.formAcuerdos.get('descripcionAcuerdo').setValue("");
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
            let a: acuerdosComprimisosInterface = {
                codigoAcuerdo: "string",
                descripcionAcuerdo: this.formAcuerdos.value.descripcionAcuerdo
            }
            this.acuerdosCompromisos.push(a);
        } else {
            this.acuerdosCompromisos[this.index3].descripcionAcuerdo = this.formAcuerdos.value.descripcionAcuerdo
            this.bool3 = false;
        }
        console.log("acuerdos", this.acuerdosCompromisos)
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
        this.acuerdosCompromisos.splice(index, 1)
    }

    editarAcuerdo(row, index) {
        this.isUpdate3 = false;
        this.bool3 = true;
        this.index3 = index
        this.formAcuerdos.reset();
        this.formAcuerdos.get('descripcionAcuerdo').setValue(row.descripcionAcuerdo);
        this.dialogAcuerdos = true;
    }

    /* funciones tabla examen */
    openExamen() {
        this.isUpdate4 = false;
        this.formExamen.reset();
        this.formExamen.get('nombreEspecialidad').setValue("");
        this.formExamen.get('examen').setValue("");
        this.dialogExamenes = true;
    }

    cancelExamen() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.dialogExamenes = false;
    }

    saveExamen() {
        let aux = true
        if (this.bool4 === false) {
            aux = false
            this.isUpdate4 = false;
            let a: examenesAuxInteface = {
                idSIS: 'string',
                nombreEspecialidad: this.formExamen.value.nombreEspecialidad,
                examen: this.formExamen.value.examen,
                resultado: 'string'
            }
            this.examenesAux.push(a);
        } else {
            this.examenesAux[this.index4].nombreEspecialidad = this.formExamen.value.nombreEspecialidad
            this.examenesAux[this.index4].examen = this.formExamen.value.examen
            this.bool4 = false;
        }
        console.log("acuerdos", this.examenesAux)
        Swal.fire({
            icon: 'success',
            title: aux !== true ? 'Agregado correctamente' : 'Actualizado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
        })
        this.dialogExamenes = false;
    }

    eliminarExamen(index) {
        this.examenesAux.splice(index, 1)
    }

    editarExamen(row, index) {
        this.isUpdate4 = false;
        this.bool4 = true;
        this.index4 = index
        this.formExamen.reset();
        this.formExamen.get('nombreEspecialidad').setValue(row.nombreEspecialidad);
        this.formExamen.get('examen').setValue(row.examen);
        this.dialogExamenes = true;
    }
}

interface finalizarInterface {
    acuerdosComprimisos: acuerdosComprimisosInterface[],
    examenesAux: examenesAuxInteface[]
}

interface examenesAuxInteface {
    idSIS: string,
    nombreEspecialidad: string,
    examen: string,
    resultado: string
}

interface acuerdosComprimisosInterface {
    codigoAcuerdo: string,
    descripcionAcuerdo: string
}
