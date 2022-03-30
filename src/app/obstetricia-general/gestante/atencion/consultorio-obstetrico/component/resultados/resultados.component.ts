import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ResultadosService } from "../../services/resultados/resultados.service";
import { MessageService } from "primeng/api";
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";
import { ConsultasService } from '../../services/consultas.service';
import { ModalInterconsultaComponent } from "./modal-interconsulta/modal-interconsulta.component";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from "sweetalert2";
import { DatePipe } from '@angular/common';
import { CronogramaComponent } from './cronograma/cronograma.component';
interface Employee {
    name: string;
    department: string;
    salary: number;
}

@Component({
    selector: 'app-resultados',
    templateUrl: './resultados.component.html',
    styleUrls: ['./resultados.component.css'],
    providers: [DialogService]
})
export class ResultadosComponent implements OnInit {
    ref: DynamicDialogRef;
    ABO = [
        { name: 'A', code: 'A' },
        { name: 'B', code: 'B' },
        { name: 'AB', code: 'AB' },
        { name: 'O', code: 'O' }
    ];
    PN = [
        { name: '+', code: '+' },
        { name: '-', code: '-' }
    ]
    normalAnormal = [
        { name: 'normal', code: 'normal' },
        { name: 'anormal', code: 'anormal' },
        { name: 'no se hizo', code: 'no se hizo' },
        { name: 'no aplica', code: 'no aplica' },
    ]
    positivoNegativo = [
        { name: 'positivo', code: 'positivo' },
        { name: 'negativo', code: 'negativo' },
        { name: 'no se hizo', code: 'no se hizo' },
        { name: 'no aplica', code: 'no aplica' },
    ]
    reactivoNoReactivo = [
        { name: 'reactivo', code: 'reactivo' },
        { name: 'no reactivo', code: 'no reactivo' },
        { name: 'no se hizo', code: 'no se hizo' },
        { name: 'no aplica', code: 'no aplica' },
    ]

    /*CAMPOS PARA RECUPERAR LA DATA PRINCIPAL*/
    dataConsulta: any;
    idConsultoriObstetrico: string;
    examenes = [
        { display: "Grupo Sanguineo", name: 'grupoSanguineo', code: 1, tipoInput: 1, codeDrop: this.ABO },
        { display: "Factor RH", name: 'factorRH', code: 2, tipoInput: 1, codeDrop: this.PN },
        { display: "Hemograma", name: 'hemograma', code: 3, tipoInput: 3 },
        { display: "Hemoglobina", name: 'hemoglobina', code: 4, tipoInput: 2 },
        { display: "Factor de Correccion", name: 'factorCorreccion', code: 5, tipoInput: 2 },
        { display: "HTO", name: 'hto', code: 6, tipoInput: 3 },
        { display: "Glucosa", name: 'glucosa', code: 7, tipoInput: 2 },
        { display: "Tolerancia Glucosa", name: 'toleranciaGlucosa', code: 8, tipoInput: 1, codeDrop: this.normalAnormal },
        { display: "Examen de Orina", name: 'exaOrina', code: 9, tipoInput: 1, codeDrop: this.positivoNegativo },
        { display: "RPR", name: 'rpr', code: 10, tipoInput: 1, codeDrop: this.reactivoNoReactivo },
        { display: "RPR Reactivo", name: 'rprReactivo', code: 11, tipoInput: 1, codeDrop: this.reactivoNoReactivo },
        { display: "Examen Sec V", name: 'exSecV', code: 12, tipoInput: 1, codeDrop: this.normalAnormal },
        { display: "Protenuaria Cuantitativa", name: 'proteinuriaCuantitativa', code: 13, tipoInput: 1, codeDrop: this.normalAnormal },
        { display: "Protenuaria Cualitativa", name: 'proteinuriaCualitativa', code: 14, tipoInput: 1, codeDrop: this.normalAnormal },
        { display: "Prueva VIH", name: 'pruebaVIH', code: 15, tipoInput: 1, codeDrop: this.reactivoNoReactivo },
        { display: "Prueba Hepatitis", name: 'prHepatitis', code: 16, tipoInput: 1, codeDrop: this.reactivoNoReactivo },
        { display: "Elisa", name: 'elisa', code: 17, tipoInput: 1, codeDrop: this.reactivoNoReactivo },
        { display: "Glicemia", name: 'glicemia', code: 18, tipoInput: 1, codeDrop: this.normalAnormal },
        { display: "Bacteriuria", name: 'bacteriuria', code: 19, tipoInput: 1, codeDrop: this.positivoNegativo },
        { display: "Nitritos", name: 'nitritos', code: 20, tipoInput: 1, codeDrop: this.positivoNegativo },
        { display: "Urocultivo", name: 'urocultivo', code: 21, tipoInput: 1, codeDrop: this.positivoNegativo },
        { display: "BK Esputo", name: 'bkEsputo', code: 22, tipoInput: 1, codeDrop: this.positivoNegativo },
        { display: "WS Term Blotkfi", name: 'wsternBlotlfi', code: 23, tipoInput: 1, codeDrop: this.positivoNegativo },
        { display: "TH lv1", name: 'thlv1', code: 24, tipoInput: 1, codeDrop: this.positivoNegativo },
        { display: "Toch", name: 'torch', code: 25, tipoInput: 1, codeDrop: this.positivoNegativo },
        { display: "Gota Gruesa", name: 'gotaGruesa', code: 26, tipoInput: 3 },
        { display: "PAP", name: 'pap', code: 27, tipoInput: 1, codeDrop: this.normalAnormal },
        { display: "IVAA", name: 'ivaa', code: 28, tipoInput: 1, codeDrop: this.normalAnormal }
    ]
    displaySeleccionado = 'otros';
    pruebaSeleccionada = ''
    opcionesInput = []
    tipoInput1 = 0;
    visible = false;
    seleccionar(itemSelected) {
        this.tipoInput1 = 0;
        this.examenFG.setValue({ resultado: '', fechaExamen: '' });
        console.log(this.examenFG.value)
        this.tipoInput1 = itemSelected.value.tipoInput;
        this.pruebaSeleccionada = itemSelected.value.name
        this.displaySeleccionado = itemSelected.value.display;
        console.log(this.displaySeleccionado, this.pruebaSeleccionada)
        if (this.tipoInput1 == 1) {
            this.opcionesInput = itemSelected.value.codeDrop;
        }
    }
    resultadoEcografiaFG: FormGroup;
    examenFG: FormGroup;
    form: FormGroup;
    isUpdate: boolean = false;
    index = 0;

    datePipe = new DatePipe('en-US');
    /*INTERCONSULTAS*/
    interconsultas: any[] = [];

    cronogramaDialog: any;
    cronograma: any;

    private nroFetos: number = 0;
    idConsulta: string;
    tipoDocRecuperado: string;
    nroDocRecuperado: string;
    nroEmbarazo: string;
    nroHcl: string;

    Gestacion: any;
    dataPaciente2: any;
    estadoEdicion: Boolean;

    nroAtencion: any;

    nombreResponsable: any;
    nroDocResponsable: any;

    constructor(private resultadosService: ResultadosService,
        private consultaService: ConsultasService,
        private messageService: MessageService,
        private consultasService: ConsultasService,
        private dialog: DialogService) {
        this.buildForm();

        this.nombreResponsable= JSON.parse(localStorage.getItem('usuario')).nombres.split("-")[0]+"-"+JSON.parse(localStorage.getItem('usuario')).apellidos;
        this.nroDocResponsable= JSON.parse(localStorage.getItem('usuario')).nroDocumento;

        /*********RECUPERAR DATOS*********/
        /*usando local storage*/
        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.dataPaciente2 = JSON.parse(localStorage.getItem('dataPaciente'));

        //estado para saber que estado usar en consultas
        this.estadoEdicion = JSON.parse(localStorage.getItem('consultaEditarEstado'));

        console.log("DATA PACIENTE 2 desde datos generales", this.dataPaciente2);
        console.log("gestacion desde datos generales", this.Gestacion);

        if (this.Gestacion == null) {
            this.tipoDocRecuperado = this.dataPaciente2.tipoDoc;
            this.nroDocRecuperado = this.dataPaciente2.nroDoc;
            this.idConsulta = JSON.parse(localStorage.getItem('idGestacionRegistro'));
            this.nroEmbarazo = this.dataPaciente2.nroEmbarazo;
            this.nroHcl = this.dataPaciente2.nroHcl;

        } else {
            this.tipoDocRecuperado = this.Gestacion.tipoDoc;
            this.nroDocRecuperado = this.Gestacion.nroDoc;
            this.idConsulta = this.Gestacion.id;
            this.nroEmbarazo = this.Gestacion.nroEmbarazo;
            this.nroHcl = this.Gestacion.nroHcl;
        }
        if (!this.estadoEdicion) {
            //guardar en el ls el nroAtencion
            let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaNueva'));
            this.nroAtencion = nroAtencion;
            console.log("entre a nueva consulta", this.nroAtencion)
        }
        else {
            let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaEditar'));
            this.nroAtencion = nroAtencion;
            console.log("entre a edicion consulta", this.nroAtencion)
        }
        this.recuperarCronograma()
    }

    buildForm() {
        this.form = new FormGroup({
            proxCita: new FormControl('', [Validators.required]),
            nombreResponsable: new FormControl('', [Validators.required]),
            docResponsable: new FormControl('', [Validators.required])
        })
    }
    ngOnInit(): void {
        this.recuperarDatos();
        this.form.get("nombreResponsable").setValue(this.nombreResponsable);
        this.form.get("docResponsable").setValue(this.nroDocResponsable);
        this.agenda();
    }

    openDialogInterconsultas() {
        this.ref = this.dialog.open(ModalInterconsultaComponent, {
            header: "INTERCONSULTA",
            contentStyle: {
                heigth: "400px",
                width: "680px",
                overflow: "auto",
            },
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log("data de modal interconsultas", data)
            if (data !== undefined)
                this.interconsultas.push(data);
        })
    }
    openDialogEditarinterconsultas(row, index) {
        let aux = {
            index: index,
            row: row
        }
        this.ref = this.dialog.open(ModalInterconsultaComponent, {
            header: "INTERCONSULTA",
            contentStyle: {
                heigth: "400px",
                width: "680px",
                overflow: "auto",
            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de modal interconsulta ', data)
            if (data !== undefined) {
                this.interconsultas.splice(data.index, 1, data.row);
            };
        })
    }
    
    guardarTodosDatos() {
        const req = {
            id: this.idConsulta,
            nroHcl: this.nroHcl,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: this.nroAtencion,
            tipoDoc: this.tipoDocRecuperado,
            nroDoc: this.nroDocRecuperado,
            interconsultas: this.interconsultas,
            proxCita:
            {
            fecha: this.datePipe.transform(this.form.value.proxCita, 'yyyy-MM-dd'),
            motivo: "PRÓXIMA CITA",
            servicio: "OBSTETRICIA",
            estado: "TENTATIVO",
            nivelUrgencia: "NORMAL"
            },
            
        }
        this.consultaService.updateConsultas(this.nroFetos, req).subscribe(
            (resp) => {
                console.log(resp);
                console.log(req);
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
    recuperarNroFetos() {
        let idData = {
            id: this.idConsulta
        }
        this.consultaService.getUltimaConsultaById(idData).subscribe((res: any) => {
            this.nroFetos = res.object.nroFetos;
        })
    }
    recuperarDatos() {
        this.recuperarNroFetos();
        let aux = {
            id: this.idConsulta,
            nroHcl: this.nroHcl,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: this.nroAtencion
        }
        this.consultaService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
            this.dataConsulta = res.object;
            console.log("data consulta:" + this.dataConsulta);

            if (res['cod'] = '2401') {
                if (this.dataConsulta != null) {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Recuperado',
                        detail: 'Registro recuperado satisfactoriamente'
                    });
                    if (this.dataConsulta.proxCita != null) {
                        this.form.patchValue({ 'proxCita': this.dataConsulta.proxCita.fecha });
                    }
                    /* recuperar interconsultas*/

                    if (this.dataConsulta.interconsultas != null) {
                        let y: number = 0;
                        while (y < this.dataConsulta.interconsultas.length) {
                            this.interconsultas.push(this.dataConsulta.interconsultas[y]);
                            y++;
                        }
                    }
                } else { this.messageService.add({ severity: 'success', summary: 'Registros', detail: 'No hay datos ingresados todavía' }); }
            }
        });
    }
    eliminarInterconsulta(index) {
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.interconsultas.splice(index, 1)
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })

    }

    mostrarCronograma() {
        this.cronogramaDialog = true;
    }
    salirCronograma() {
        this.cronogramaDialog = false;
    }
    recuperarCronograma() {
        this.consultasService.getCronogramaGestante(this.nroHcl).subscribe((res: any) => {
            this.cronograma = res.object;
            console.log("cronograma:", this.cronograma)
        })
    }
    funcionAuxiliar(fecha) {
        return new Date(fecha).getTime();
    }

    agenda() {
        this.consultaService.getCronogramaGestante(this.nroHcl).subscribe((r: any) => {
            let aux = r.object
            console.log(aux)
            aux.map((r_: any) => {
                this.consultaService.list.push({
                    title: r_.descripcion+" - "+r_.tipo,
                    start: r_.fecha+ " "+this.datePipe.transform(0, 'HH:mm:ss')
                })
            })
            
        })
    }

    openCalendar() {
        this.ref = this.dialog.open(CronogramaComponent, {
            header: "CALENDARIO DE ACTIIVIDADES",
            height: '100%',
            width: '90%',
            style: {
                position: 'absolute',
                top: '17px',
            },
        })
    }

}
