import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ObstetriciaGeneralService} from "../../../../../../obstetricia-general/services/obstetricia-general.service";
import {ModalNosologicoComponent} from './modal-nosologico/modal-nosologico.component';
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

    constructor(private DiagnosticoService: DiagnosticoConsultaService,
                private cieService: CieService,
                private formBuilder: FormBuilder,
                private obstetriciaServie: ObstetriciaGeneralService,
                private dialog: DialogService) {
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

    openDiagnostico() {
        this.isUpdate = false;
        this.form.reset();
        this.form.get('diagnostico').setValue("");
        this.diagnosticoDialog = true;
    }

    openDialogDiagnostico() {
        this.ref = this.dialog.open(ModalNosologicoComponent, {
            header: "TRATAMIENTOS",
            contentStyle: {
                overflow: "auto",
            },
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log("data de modal tratamiento", data)
            if (data !== undefined)
                this.tratamientosComunes.push(data);
        })
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
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.diagnosticoDialog = false;
    }

    recuperarDiagnostico() {
        this.DiagnosticoService.getDiagnostico(this.id).subscribe((r: any) => {
            //-- recupera informacion de diagnostico
            this.diagnostico = r.object;
            console.log('diagnostico',this.diagnostico)
            this.diagnosticoNosologico = this.diagnostico.diagnosticoNosologico
            this.factoresCondicionales = this.diagnostico.factoresCondicionales
            this.observacion = this.diagnostico.observacion
        })
    }

    guardarDiagnostico() {
        //this.observacion = this.formG.value.observacion
        console.log("form",this.formG.value.observacion)
        const req = {
            diagnosticoNosologico: this.diagnosticoNosologico,
            factoresCondicionales: this.factoresCondicionales,
            observacion: this.observacion
        }
        console.log('req',req)
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

    eliminarFactor(index) {
        this.factoresCondicionales.splice(index, 1)
    }

    openFactor() {
        this.isUpdate2 = false;
        this.formFactor.reset();
        this.formFactor.get('factorTexto').setValue("");
        this.factorDialog = true;
    }

    saveFactor() {
        var factores = {
            factores: this.formFactor.value.observaciones
        }
        this.isUpdate2 = false;
        this.factoresCondicionales.push(this.formFactor.value.factorTexto);
        console.log('fc',this.factoresCondicionales)

        Swal.fire({
                icon: 'success',
                title: 'Agregado correctamente',
                text: '',
                showConfirmButton: false,
                timer: 1500,
            })

        this.factorDialog = false;
    }

    editarFactor(row,index){

    }
}

interface diagnosticoInterface {
    diagnosticoNosologico: diagnosticoNosologicoInterface[],
    condicionDesarrolloPsicomotor: string,
    crecimientoestadoNutricional: string,
    factoresCondicionales: string[],
    observacion: string,
}

interface diagnosticoNosologicoInterface {
    codigoItem: string,
    descripcionItem: string
}
