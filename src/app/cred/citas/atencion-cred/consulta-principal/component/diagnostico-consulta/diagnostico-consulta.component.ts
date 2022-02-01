import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {CieService} from "../../../../../../obstetricia-general/services/cie.service";
import {DiagnosticoConsultaService} from "../../services/diagnostico-consulta.service";

@Component({
    selector: 'app-diagnostico-consulta',
    templateUrl: './diagnostico-consulta.component.html',
    styleUrls: ['./diagnostico-consulta.component.css'],
    providers: [DialogService]
})

export class DiagnosticoConsultaComponent implements OnInit {
    customers: string[] = [];
    selectedValue: string;
    val1: boolean = false;
    tratamientosComunes: any[] = [];
    ref: DynamicDialogRef;

    form: FormGroup
    diagnosticoDialog: boolean;
    opcionBusqueda: string;
    formDiag: FormGroup;
    data: any[] = [];
    diagnosticoNosologico: diagnosticoNosologicoInterface[] = [];
    Cie10: any;
    hayError: boolean = false;
    isUpdate: boolean = false;

    attributeLocalS = 'idConsulta'
    id: string = "";

    diagnostico: diagnosticoInterface
    formG: FormGroup;

    factorDialog: boolean;
    formFactor: FormGroup;
    hayError2: boolean = false;
    isUpdate2: boolean = false;
    data2: any[] = [];
    factoresCondicionales: any[] = [];

    observacion: string = "";
    bool: boolean = false;
    index: number
    condicionDesarrolloPsicomotor: condicionDesarrolloPsicomotorInterface[] = []

    constructor(private DiagnosticoService: DiagnosticoConsultaService,
                private cieService: CieService,
                private formBuilder: FormBuilder) {
        this.buildForm();
    }

    ngOnInit(): void {
        this.recuperarDiagnostico()
    }

    buildForm() {
        this.id = localStorage.getItem(this.attributeLocalS);
        this.form = this.formBuilder.group({
            diagnostico: ['', [Validators.required]],
        });

        this.formG = this.formBuilder.group({
            crecimiento: new FormControl(''),
            observacion: new FormControl(''),
            ganancia: new FormControl(''),
            desnutricion: new FormControl(''),
            sobrepeso: new FormControl(''),
            Obesidad: new FormControl(''),
            Otros: new FormControl(''),
            Otros2: new FormControl(''),
            condicionNormal: new FormControl(''),
            condicionDeficit: new FormControl(''),
            condicionTranstorno: new FormControl(''),
            condicionRiesgo: new FormControl(''),
        });

        this.formFactor = this.formBuilder.group({
            factorTexto: new FormControl("", []),
        });

    }

    /* funciones tabla diagnostico */
    openDiagnostico() {
        this.isUpdate = false;
        this.form.reset();
        this.form.get('diagnostico').setValue("");
        this.diagnosticoDialog = true;
    }

    filterDiagnostico(event) {
        console.log('event ', event.query);
        this.cieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
            this.Cie10 = res.object;
        })
    }

    eliminarDiagnostico(index) {
        this.diagnosticoNosologico.splice(index, 1)
    }

    saveDiagnostico(form: any) {
        this.isUpdate = false;
        this.data.push(form.value);
        console.log(this.data);
        this.diagnosticoNosologico.push({
            descripcionItem: this.data[this.data.length - 1]['diagnostico']['descripcionItem'],
            codigoItem: this.data[this.data.length - 1]['diagnostico']['codigoItem']
        });

        Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
        })
        this.diagnosticoDialog = false;
    }

    titulo() {
        if (this.isUpdate) return "EDITE DIAGNOSTICO";
        else return "INGRESAR UN DIAGNOSTICO";
    }

    cancelDiagnostico() {
        this.diagnosticoDialog = false;
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })

    }

    /* funciones tabla factor */
    openFactor() {
        this.isUpdate2 = false;
        this.formFactor.reset();
        this.formFactor.get('factorTexto').setValue("");
        this.factorDialog = true;
    }
    cancelFactor(){
        this.factorDialog = false;
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
    }
    saveFactor() {
        let aux = true
        if (this.bool === false) {
            aux = false
            this.isUpdate2 = false;
            this.factoresCondicionales.push(this.formFactor.value.factorTexto);
        } else {
            this.factoresCondicionales[this.index] = this.formFactor.value.factorTexto
            this.bool = false;
        }

        Swal.fire({
            icon: 'success',
            title: aux !== true ? 'Agregado correctamente' : 'Actualizado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
        })
        this.factorDialog = false;
    }

    eliminarFactor(index) {
        this.factoresCondicionales.splice(index, 1)
    }

    editarFactor(row, index) {
        this.isUpdate2 = false;
        this.bool = true;
        this.index = index
        this.formFactor.reset();
        this.formFactor.get('factorTexto').setValue(row);
        this.factorDialog = true;
    }

    /*  objeto diagnostico */
    recuperarDiagnostico() {
        this.DiagnosticoService.getDiagnostico(this.id).subscribe((r: any) => {
            //-- recupera informacion de diagnostico
            this.diagnostico = r.object;
            console.log('diagnostico', this.diagnostico)
            this.diagnosticoNosologico = this.diagnostico.diagnosticoNosologico
            this.factoresCondicionales = this.diagnostico.factoresCondicionales
            this.formG.get('observacion').setValue(this.diagnostico.observacion)
            this.diagnostico.crecimientoestadoNutricional.condicionCrecimiento === true ? this.formG.get('crecimiento').setValue('val1') : this.formG.get('crecimiento').setValue('val2')
            this.recuperarcondicionDesarrolloPsicomotor();
        })
    }

    save() {
        this.guardarcondicionDesarrolloPsicomotor()
        let riesgoNutricional = {
            p_e: this.formG.value.ganancia.value === 'val1' ? 'Ganancia' : 'Desnutricion',
            t_e: this.formG.value.ganancia.value === 'val2' ? 'Ganancia' : 'Desnutricion',
            p_t: this.formG.value.ganancia.value === 'val3' ? 'Ganancia' : 'Desnutricion',
        }
        let crecimientoestadoNutricional = {
            condicionCrecimiento: this.formG.value.crecimiento === 'val1',
            riesgoNutricional: riesgoNutricional
        }
        const req = {
            diagnosticoNosologico: this.diagnosticoNosologico,
            factoresCondicionales: this.factoresCondicionales,
            observacion: this.formG.value.observacion,
            crecimientoestadoNutricional: crecimientoestadoNutricional,
            condicionDesarrolloPsicomotor: this.condicionDesarrolloPsicomotor
        }
        console.log('req', req)
        if (this.diagnosticoNosologico) {
            this.DiagnosticoService.updateDiagnostico(this.id, req).subscribe(
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

    recuperarcondicionDesarrolloPsicomotor() {
        for (let i = 0; i < this.diagnostico.condicionDesarrolloPsicomotor.length; i++) {
            if (this.diagnostico.condicionDesarrolloPsicomotor[i].descripcionCondicion === 'normal')
                this.formG.get('condicionNormal').setValue(['val1'])
            if (this.diagnostico.condicionDesarrolloPsicomotor[i].descripcionCondicion === 'riesgo')
                this.formG.get('condicionRiesgo').setValue(['val1'])
            if (this.diagnostico.condicionDesarrolloPsicomotor[i].descripcionCondicion === 'deficit')
                this.formG.get('condicionDeficit').setValue(['val1'])
            if (this.diagnostico.condicionDesarrolloPsicomotor[i].descripcionCondicion === 'transtorno')
                this.formG.get('condicionTranstorno').setValue(['val1'])
        }
    }

    guardarcondicionDesarrolloPsicomotor() {
        this.condicionDesarrolloPsicomotor = []
        console.log("con", this.formG.value.condicionNormal[0] !== '')
        if (this.formG.value.condicionNormal[0] === 'val1') {
            let aux = {
                tipoCondicion: "1",
                descripcionCondicion: "normal"
            }
            this.condicionDesarrolloPsicomotor.push(aux)
        }
        if (this.formG.value.condicionRiesgo[0] === 'val1') {
            let aux = {
                tipoCondicion: "1",
                descripcionCondicion: "riesgo"
            }
            this.condicionDesarrolloPsicomotor.push(aux)
        }
        if (this.formG.value.condicionDeficit[0] === 'val1') {
            let aux = {
                tipoCondicion: "1",
                descripcionCondicion: "deficit"
            }
            this.condicionDesarrolloPsicomotor.push(aux)
        }
        if (this.formG.value.condicionTranstorno[0] === 'val1') {
            let aux = {
                tipoCondicion: "1",
                descripcionCondicion: "transtorno"
            }
            this.condicionDesarrolloPsicomotor.push(aux)
        }
    }


}

interface diagnosticoInterface {
    diagnosticoNosologico: diagnosticoNosologicoInterface[],
    condicionDesarrolloPsicomotor: condicionDesarrolloPsicomotorInterface[],
    crecimientoestadoNutricional: crecimientoestadoNutricionalInteface,
    factoresCondicionales: string[],
    observacion: string,

}

interface crecimientoestadoNutricionalInteface {
    condicionCrecimiento: boolean
    riesgoNutricional: {
        p_e: string,
        t_e: string,
        p_t: string
    }
}

interface condicionDesarrolloPsicomotorInterface {
    tipoCondicion: string,
    descripcionCondicion: string
}

interface diagnosticoNosologicoInterface {
    codigoItem: string,
    descripcionItem: string
}
