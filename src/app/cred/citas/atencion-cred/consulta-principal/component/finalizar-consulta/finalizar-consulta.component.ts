import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {CieService} from "../../../../../../obstetricia-general/services/cie.service";
import {FinalizarConsultaService} from "../../services/finalizar-consulta.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalReferenciaComponent} from "./modal-referencia/modal-referencia.component";
import {DatePipe} from "@angular/common";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CalendarComponent} from "./calendar/calendar.component";
import {dato} from "../../../../models/data";

@Component({
    selector: 'app-finalizar-consulta',
    templateUrl: './finalizar-consulta.component.html',
    styleUrls: ['./finalizar-consulta.component.css'],
    providers: [DialogService]
})
export class FinalizarConsultaComponent implements OnInit {
    attributeLocalS = 'documento'
    data: dato
    acuerdosFG: FormGroup
    finalizar: finalizarAtencionInterface;
    acuerdosComprimisos: acuerdosComprimisosInterface[] = [];
    examenesAux: examenesAuxInteface[] = [];
    referencia: referenciaInterface[] = [];

    id: string;
    formExamen: FormGroup;
    formAcuerdos: FormGroup;
    formReferencia: FormGroup;
    form: FormGroup

    dialogAcuerdos: boolean;
    dialogExamenes: boolean;
    dialogReferencia: boolean;

    isUpdate3: boolean = false;
    bool3: boolean = false;
    index3: number

    isUpdate4: boolean = false;
    bool4: boolean = false;
    index4: number
    nombreEspecialidad: any[]
    examen: any[]

    isUpdate5: boolean = false;
    bool5: boolean = false;
    index5: number

    tipoDoc: string = ''
    nroDoc: string = ''

    datePipe = new DatePipe('en-US');
    ref: DynamicDialogRef;

    constructor(private finalizarService: FinalizarConsultaService,
                private cieService: CieService,
                private formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private dialog: DialogService) {
        this.buildFG();

        this.nombreEspecialidad =
            [
                {label: 'ENDOVENOSA', value: 'ENDOVENOSA'},
                {label: 'INHALADORA', value: 'INHALADORA'},
                {label: 'INTRADERMICO', value: 'INTRADERMICO'},
                {label: 'INTRAMUSCULAR', value: 'INTRAMUSCULAR'},
                {label: 'NASAL', value: 'NASAL'},
                {label: 'OFTALMICO', value: 'OFTALMICO'},
                {label: 'ORAL', value: 'ORAL'},
                {label: 'OPTICO', value: 'OPTICO'},
                {label: 'RECTAL', value: 'RECTAL'},
                {label: 'SUBCUTANEO', value: 'SUBCUTANEO'},
                {label: 'SUBLINGUAL', value: 'SUBLINGUAL'},
                {label: 'TOPICO', value: 'TOPICO'},
                {label: 'VAGINAL', value: 'VAGINAL'},
            ];
        this.examen =
            [
                {label: 'ENDOVENOSA', value: 'ENDOVENOSA'},
                {label: 'INHALADORA', value: 'INHALADORA'},
                {label: 'INTRADERMICO', value: 'INTRADERMICO'},
                {label: 'INTRAMUSCULAR', value: 'INTRAMUSCULAR'},
                {label: 'NASAL', value: 'NASAL'},
                {label: 'OFTALMICO', value: 'OFTALMICO'},
                {label: 'ORAL', value: 'ORAL'},
                {label: 'OPTICO', value: 'OPTICO'},
                {label: 'RECTAL', value: 'RECTAL'},
                {label: 'SUBCUTANEO', value: 'SUBCUTANEO'},
                {label: 'SUBLINGUAL', value: 'SUBLINGUAL'},
                {label: 'TOPICO', value: 'TOPICO'},
                {label: 'VAGINAL', value: 'VAGINAL'},
            ];
    }


    buildFG(): void {
        this.id = localStorage.getItem(this.attributeLocalS);
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
            fecha: new FormControl("", []),
        });

        this.formReferencia = this.formBuilder.group({
            consultorio: new FormControl("", []),
            motivo: new FormControl("", []),
            codRENAES: new FormControl("", []),
        });
    }

    ngOnInit(): void {
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.agenda()
        /*this.route.queryParams
            .subscribe(params => {
                console.log('params', params)
                if (params['nroDoc']) {
                    this.tipoDoc = params['tipoDoc']
                    this.nroDoc = params['nroDoc']
                }
            })
        this.recuperarFinalizar()*/
    }

    /* funciones tabla acuerdo*/
    agenda() {
        this.finalizarService.listPlan(this.data.nroDocumento).subscribe((r: any) => {
            let aux = r.object.planAtencion
            aux.controlCrecimientoDesa.map((r_: any) => {
                this.finalizarService.list.push({
                    title: r_.nroControl + '° control de crecimiento de ' + this.descripcion(r_.descripcionEdad),
                    start: r_.fechaTentativa
                })
            })
            aux.suplementacionSFMicronutrientes.map((r_: any) => {
                this.finalizarService.list.push({
                    title: r_.dosis + '° dosis de ' + r_.descripcion.toLowerCase() + ' de ' + this.descripcion(r_.descripcionEdad),
                    start: r_.fechaTentativa
                })
            })
            aux.suplementacionVitaminaA.map((r_: any) => {
                this.finalizarService.list.push({
                    title: r_.dosis + '° dosis de ' + r_.descripcion.toLowerCase() + ' de ' + this.descripcion(r_.descripcionEdad),
                    start: r_.fechaTentativa
                })
            })
            aux.tratamientoDosajeHemoglobina.map((r_: any) => {
                this.finalizarService.list.push({
                    title: r_.nroControl + '° control de ' + (r_.nombre === 'Dosaje_Hb' ? 'dosaje de hemoglobina' : '') + ' de ' + this.descripcion(r_.descripcionEdad),
                    start: r_.fechaTentativa
                })
            })
            aux.inmunizacionesCred.map((r_: any) => {
                this.finalizarService.list.push({
                    title: r_.dosis + '° dosis de ' + r_.descripcion.toLowerCase() + ' de ' + this.descripcion(r_.descripcionEdad),
                    start: r_.fechaTentativa
                })
            })
        })
    }

    descripcion(s: string) {
        return s == 'RN' ? 'recien nacido' : (s == 'Menor_1A' ? 'menor de un año' : (s == '1A' ? 'un año' : (s == '2A' ? 'dos años' : (s == '3A' ? 'tres años' : (s == '4A' ? 'cuatro años' : (s == '5A' ? 'cinco años' : (s == '6A' ? 'seis años' : (s == '7A' ? 'siete años' : (s == '8A' ? 'ocho años' : 'nueve años')))))))))
    }

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
            this.acuerdosComprimisos.push(a);
        } else {
            this.acuerdosComprimisos[this.index3].descripcionAcuerdo = this.formAcuerdos.value.descripcionAcuerdo
            this.bool3 = false;
        }
        console.log("acuerdos", this.acuerdosComprimisos)
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
        this.acuerdosComprimisos.splice(index, 1)
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
        console.log('entro')
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
            }//fecha: this.formExamen.value.fecha,
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

    /* funciones tabla referencia */
    openReferencia() {
        this.isUpdate5 = false;
        this.formReferencia.reset();
        this.formReferencia.get('consultorio').setValue("");
        this.formReferencia.get('motivo').setValue("");
        this.formReferencia.get('codRENAES').setValue("");
        this.dialogReferencia = true;
    }

    cancelReferencia() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.dialogReferencia = false;
    }

    saveReferencia() {
        let aux = true
        if (this.bool5 === false) {
            aux = false;
            this.isUpdate5 = false;
            let a: referenciaInterface = {
                consultorio: this.formReferencia.value.consultorio,
                motivo: this.formReferencia.value.motivo,
                codRENAES: this.formReferencia.value.codRENAES,
            }
            this.referencia.push(a);
        } else {
            this.referencia[this.index5].consultorio = this.formReferencia.value.consultorio
            this.referencia[this.index5].motivo = this.formReferencia.value.motivo
            this.referencia[this.index5].codRENAES = this.formReferencia.value.codRENAES
            this.bool5 = false;
        }
        console.log("referencia", this.referencia)
        Swal.fire({
            icon: 'success',
            title: aux !== true ? 'Agregado correctamente' : 'Actualizado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
        })
        this.dialogReferencia = false;
    }

    editarReferencia(row, index) {
        this.isUpdate5 = false;
        this.bool5 = true;
        this.index5 = index
        this.formReferencia.reset();
        this.formReferencia.get('consultorio').setValue(row.consultorio);
        this.formReferencia.get('motivo').setValue(row.motivo);
        this.formReferencia.get('codRENAES').setValue(row.codRENAES);
        this.dialogReferencia = true;
    }

    eliminarReferencia(index) {
        this.referencia.splice(index, 1)
    }

    /*  objeto finalizar */
    recuperarFinalizar() {
        this.finalizarService.getFinalizar(this.id).subscribe((r: any) => {
            //-- recupera informacion de finalizar
            if (r.object) {
                this.finalizar = r.object;
                console.log('finalizar', r)
                this.acuerdosComprimisos = (this.finalizar.acuerdosComprimisos === null) ? [] : this.finalizar.acuerdosComprimisos
                this.examenesAux = (this.finalizar.examenesAux === null) ? [] : this.finalizar.examenesAux
                let re: referenciaInterface = {
                    consultorio: this.finalizar.referencia.consultorio === null ? '' : this.finalizar.referencia.consultorio,
                    motivo: this.finalizar.referencia.motivo === null ? '' : this.finalizar.referencia.motivo,
                    codRENAES: this.finalizar.referencia.codRENAES === null ? '' : this.finalizar.referencia.codRENAES
                }
                this.referencia.push(re);
                const date = new Date(this.finalizar.proximaCita);
                console.log('date', date, ' fe', this.finalizar.proximaCita)
                this.acuerdosFG.get('proximaCitaFC').setValue(date);
                this.acuerdosFG.get('atendidoFC').setValue(this.finalizar.atendidoPor);
                this.acuerdosFG.get('dniFC').setValue(this.finalizar.dniPersonal);
                this.acuerdosFG.get('observacionFC').setValue(this.finalizar.observacion);
            }
        })
    }

    save() {
        /*let r: referenciaInterface = {
            consultorio: this.referencia[0].consultorio === null ? 'consultorio' : this.referencia[0].consultorio,
            motivo: this.referencia[0].motivo === null ? 'motivo' : this.referencia[0].motivo,
            codRENAES: this.referencia[0].codRENAES === null ? 'codRENAES' : this.referencia[0].codRENAES
        }
        const req = {
            acuerdosComprimisos: this.acuerdosComprimisos,
            examenesAux: this.examenesAux,
            referencia: r,
            proximaCita: this.acuerdosFG.value.proximaCitaFC,
            atendidoPor: this.acuerdosFG.value.atendidoFC,
            dniPersonal: this.acuerdosFG.value.dniFC,
            observacion: this.acuerdosFG.value.observacionFC,
        }
        console.log('req', req)
        if (this.finalizar) {
            this.finalizarService.updateFinalizar(this.id, req).subscribe(
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
        }*/
    }

    irEvaluaciones() {
        /** redirigir a atencion de usuario */
        this.router.navigate(['/dashboard/cred/citas/atencion/evaluaciones-consulta'], {
            queryParams: {
                'tipoDoc': this.tipoDoc,
                'nroDoc': this.nroDoc,
            }
        })
    }

    irInterconsulta() {
        this.router.navigate(['/dashboard/cred/citas/atencion/examenes'],
            {
                queryParams: {
                    'tipoDoc': this.tipoDoc,
                    'nroDoc': this.nroDoc,
                }
            })
    }

    openCalendar() {
        this.ref = this.dialog.open(CalendarComponent, {
            header: "CALENDARIO DE ACTIIVIDADES",
            height: '100%',
            width: '90%',
            style: {
                position: 'absolute',
                top: '17px',
            },
        })
    }

    openRefe() {
        this.ref = this.dialog.open(ModalReferenciaComponent, {
            header: "HOJA DE REFERENCIA",
            height: '100%',
            width: '90%',
            style: {
                position: 'absolute',
                top: '17px',
            },
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log("data de modal antecedentes", data)
            if (data !== undefined) {
                console.log(data);
                let cadena = {
                    nombre: data.row.nombre,
                    fechaDiagnosticado: this.datePipe.transform(data.row.fechaDiagnosticado, 'yyyy-MM-dd'),
                    edadAnio: data.row.edadAnio,
                    edadMes: data.row.edadMes,
                    edadDia: data.row.edadDia,
                }
            }
        })
    }
}

interface finalizarAtencionInterface {
    acuerdosComprimisos: acuerdosComprimisosInterface[],
    examenesAux: examenesAuxInteface[],
    referencia: referenciaInterface,
    proximaCita: string,
    atendidoPor: string,
    dniPersonal: string,
    observacion: string
}

interface examenesAuxInteface {
    idSIS: string,
    nombreEspecialidad: string,
    examen: string,
    resultado: string,
    //fecha: string
}

interface acuerdosComprimisosInterface {
    codigoAcuerdo: string,
    descripcionAcuerdo: string
}

interface referenciaInterface {
    consultorio: string,
    motivo: string,
    codRENAES: string
}
