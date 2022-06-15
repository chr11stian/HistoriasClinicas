import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ServicesService } from "../services-lab/services.service";
import { number } from "echarts";
import { ConsultasService } from "../../../../services/consultas.service";
import { PrestacionService } from "../../../../../../../../mantenimientos/services/prestacion/prestacion.service";
import { CieService } from "../../../../../../../services/cie.service";
import { AddLaboratorio, Laboratorio, ExamenAuxiliar } from 'src/app/cred/citas/atencion-cred/consulta-principal/models/examenesAuxiliares';
import { ExamenesAuxiliaresService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/examenes-auxiliares.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-lab-solicitud',
    templateUrl: './lab-solicitud.component.html',
    styleUrls: ['./lab-solicitud.component.css']
})
export class LabSolicitudComponent implements OnInit {
    formSolicitudLab: FormGroup;
    listaSolicitud: any[] = [];
    listaSolicitud2: any[] = [];
    ListaLab: any;
    dataConsulta: any;
    idConsulta: string;
    prestacion2: any;


    PrestacionLaboratorio: any;
    procedimientos: any;

    Gestacion: any;
    nroAtencion: any;
    diagnosticosList: string;
    listaDeCIESIS: string;
    estadoEdicion: boolean;
    solicitudLaboratorio: Laboratorio

    subTipoLaboratorio: any;
    listaDeCIE: any;
    LugarExamen: any;
    examName: Laboratory[] = [];
    auxExamList: ExamenAuxiliar[] = [];
    listaHematologia: Laboratory[] = [{ subTipe: 'HEMATOLOGIA', examen: 'HEMOGLOBINA' }, { subTipe: 'HEMATOLOGIA', examen: 'HEMATOCRITO' }, { subTipe: 'HEMATOLOGIA', examen: 'HEMOGRAMA COMPLETO' }, { subTipe: 'HEMATOLOGIA', examen: 'TIEMPO DE COAGULACIÓN' }, { subTipe: 'HEMATOLOGIA', examen: 'TIEMPO DE SANGRIA' }, { subTipe: 'HEMATOLOGIA', examen: 'V.S.G.' }, { subTipe: 'HEMATOLOGIA', examen: 'RECUENTO DE PLAQUETAS' }, { subTipe: 'HEMATOLOGIA', examen: 'RECUENTO DE GLÓBULOS ROJOS' }, { subTipe: 'HEMATOLOGIA', examen: 'RECUENTO DE GLOB BLANCOS' }, { subTipe: 'HEMATOLOGIA', examen: 'CONSTANTES CORPUSCULARES' }, { subTipe: 'HEMATOLOGIA', examen: 'COMPATIBILIDAD SANGUINEA' }];
    listaInmunologia: Laboratory[] = [{ subTipe: 'INMUNOLOGIA', examen: 'GRUPO SANGUINEO Y FACTOR Rh' }, { subTipe: 'INMUNOLOGIA', examen: 'PROTEINA "C" REACTIVA' }, { subTipe: 'INMUNOLOGIA', examen: 'REACCIÓN DE WIDAL' }, { subTipe: 'INMUNOLOGIA', examen: 'FACTOR REUMATOIDEO' }, { subTipe: 'INMUNOLOGIA', examen: 'R.P.R. y/O Prueba Rápida de Sífilis' }, { subTipe: 'INMUNOLOGIA', examen: 'V.I.H. (Prueba Rápida)' }, { subTipe: 'INMUNOLOGIA', examen: 'ANTÍGENO DE SUPREFICIE HEPATITIS B' }, { subTipe: 'INMUNOLOGIA', examen: 'BHCG (TEST DE EMBARAZO)' }, { subTipe: 'INMUNOLOGIA', examen: 'ANTIESTREPTOLISINAS (ASO)' }, { subTipe: 'INMUNOLOGIA', examen: 'ANTÍGENO ' }];
    listaBioquimica: Laboratory[] = [{ subTipe: 'BIOQUÍMICA', examen: 'GLUCOSA' }, { subTipe: 'BIOQUÍMICA', examen: 'COLESTEROL TOTAL' }, { subTipe: 'BIOQUÍMICA', examen: 'TRIGLICERIDOS' }, { subTipe: 'BIOQUÍMICA', examen: 'UREA' }, { subTipe: 'BIOQUÍMICA', examen: 'CREATINA' }, { subTipe: 'BIOQUÍMICA', examen: 'T.G.O.' }, { subTipe: 'BIOQUÍMICA', examen: 'T.G.P.' }, { subTipe: 'BIOQUÍMICA', examen: 'BILIRRUBINAS TITAL Y FRACC' }, { subTipe: 'BIOQUÍMICA', examen: 'ALBÚMINA' }, { subTipe: 'BIOQUÍMICA', examen: 'FOSFATASA ALCALINA' }];
    listaUroanalisis: Laboratory[] = [{ subTipe: 'UROANALISIS', examen: 'EXÁMEN COMPLETO DE ORINA' }, { subTipe: 'UROANALISIS', examen: 'SEDIMENTO URINARIO' }, { subTipe: 'UROANALISIS', examen: 'PROTEINURA CUANTITATIVA/CUALITATIVA' }, { subTipe: 'UROANALISIS', examen: 'TEST DE ÁCIDO SULFOSALICÍLICO' }];
    listaMircobiologia: Laboratory[] = [{ subTipe: 'MICROBIOLOGÍA', examen: 'EXAMEN DIR. DE SECRETARIA VAG.' }, { subTipe: 'MICROBIOLOGÍA', examen: 'GRAM' }];
    listaParasitologia: Laboratory[] = [{ subTipe: 'PARASITOLOGIA', examen: 'EX. PARASITOLÓGICO DIRECTO EN HECES' }, { subTipe: 'PARASITOLOGIA', examen: 'EX. PARASITÓLOGICO SERIADO EN HECES' }, { subTipe: 'PARASITOLOGIA', examen: 'TEST DE GRAHAM' }, { subTipe: 'PARASITOLOGIA', examen: 'COPROFUNCIONAL' }, { subTipe: 'PARASITOLOGIA', examen: 'THEVENOM EN HECES' }, { subTipe: 'PARASITOLOGIA', examen: 'REACCIÓN INFLAMATORIA/MOCO FECAL' }];
    listaOtrosExamenes: Laboratory[] = [{ subTipe: 'OTROS EXAMENES', examen: 'BATERÍA DE LABORATORIO GESTANTE' }, { subTipe: 'OTROS EXAMENES', examen: 'TEST DE HELECHO' }];


    constructor(private ref: DynamicDialogRef,
        private DxService: ConsultasService,
        public config: DynamicDialogConfig,
        private servicesService: ServicesService,
        private prestacionService: PrestacionService,
        private CieService: CieService,
        private form: FormBuilder,
        private examenAuxiliarService: ExamenesAuxiliaresService) {

        /**Usando localStorage **/
        this.dataConsulta = JSON.parse(localStorage.getItem('datosConsultaActual'));
        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.estadoEdicion = JSON.parse(localStorage.getItem('consultaEditarEstado'));
        if (!this.estadoEdicion) {
            //guardar en el ls el nroAtencion
            let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaNueva'));
            this.nroAtencion = nroAtencion;
            console.log("entre a nueva consulta", this.nroAtencion)
        } else {
            let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaEditar'));
            this.nroAtencion = nroAtencion;
            console.log("entre a edicion consulta", this.nroAtencion)
        }

        this.idConsulta = this.dataConsulta.id;
        this.examenAuxiliarService.getExamListLaboratory().then(res => {
            console.log('lista de examenes ', res);
        })

    }

    ngOnInit(): void {
        this.buildForm();
        this.getPrestacion();
        this.recuperaDataPaciente();
        this.traerDiagnosticosDeConsulta();
        console.log("Gestacion", this.Gestacion)

    }

    getPrestacion() {
        this.prestacionService.getPrestacion().subscribe((resp) => {
            this.prestacion2 = resp['object']
            console.log("PRestacion", this.prestacion2[2].descripcion);
        })
    }

    filterCIE10(event) {
        this.CieService.getCIEByDescripcionTipo("EX", event.query).subscribe((res: any) => {
            this.listaDeCIE = res.object
        })
    }


    recuperaDataPaciente() {
        this.formSolicitudLab.get('edad').setValue(this.dataConsulta.anioEdad);
        this.formSolicitudLab.get('HCL').setValue(this.dataConsulta.nroHcl);
        this.formSolicitudLab.get('servicio').setValue(this.dataConsulta.servicio);
        this.formSolicitudLab.get('apellidosNombres').setValue(this.dataConsulta.datosPaciente.apePaterno + ' ' + this.dataConsulta.datosPaciente.apeMaterno + ' ' + this.dataConsulta.datosPaciente.primerNombre + ' ' + this.dataConsulta.datosPaciente.otrosNombres);
    }

    buildForm() {
        this.formSolicitudLab = this.form.group({
            lista: new FormControl(''),

            apellidosNombres: new FormControl(''),
            edad: new FormControl(''),
            HCL: new FormControl(''),
            servicio: new FormControl(''),
            camaNro: new FormControl(''),
            DxPresuntivo: new FormControl(''),
            observaciones: new FormControl(''),

            /**EXAMENES**/
            HEMATOLOGIA: new FormControl({ value: '', disabled: false }),
            INMUNOLOGIA: new FormControl({ value: '', disabled: false }),
            BIOQUIMICA: new FormControl({ value: '', disabled: false }),
            UROANALISIS: new FormControl({ value: '', disabled: false }),
            PARASITOLOGIA: new FormControl({ value: '', disabled: false }),
            MICRIBIOLOGIA: new FormControl({ value: '', disabled: false }),
            OTROSEXAMENES: new FormControl({ value: '', disabled: false }),

            examen: new FormControl({ value: '', disabled: false }),
            diagnostico: new FormControl({ value: '', disabled: false }),
            prestacion: new FormControl({ value: '', disabled: false }),
            codPrestacion: new FormControl({ value: '', disabled: true }),

            autocompleteSIS: new FormControl({ value: '', disabled: false }),
            SISCIE: new FormControl({ value: '', disabled: false }),
            diagnosticoSIS: new FormControl({ value: '', disabled: false }),
            subTipe: new FormControl({ value: '', disabled: false }),
            HISCIE: new FormControl({ value: '', disabled: false }),
            diagnosticoHIS: new FormControl({ value: '', disabled: false }),
            autocompleteHIS: new FormControl({ value: '', disabled: false }),

            // NOMBRES DE EXAMENES


        })
    }

    traerDiagnosticosDeConsulta() {
        this.DxService.listarDiagnosticosDeUnaConsulta(this.Gestacion.nroHcl, this.Gestacion.nroEmbarazo, this.nroAtencion).then((res: any) => {
            this.diagnosticosList = res.object;
            console.log("diagnosticos:", this.diagnosticosList);
        })
    }

    onChangeDiagnostico(event) {
        console.log("Evento", event.value)
        this.procedimientos = event.value.procedimientos;
        this.PrestacionLaboratorio = event.value;
        this.formSolicitudLab.get('codPrestacion').setValue(event.value.codigo);

        console.log("procedimiento", this.procedimientos)
    }

    selectedOptionNameCIE(event, cieType) {
        console.log('evento desde diagnos ', event);
        if (cieType == 0) {
            this.formSolicitudLab.patchValue({ diagnosticoSIS: event.value.procedimiento });
            this.formSolicitudLab.patchValue({ autocompleteSIS: "" });
            this.formSolicitudLab.patchValue({ SISCIE: event.value }, { emitEvent: false });
            console.log(event.value)
        }
        if (cieType == 1) {
            this.formSolicitudLab.patchValue({ diagnosticoHIS: event.descripcionItem });
            this.formSolicitudLab.patchValue({ autocompleteHIS: "" });
            this.formSolicitudLab.patchValue({ HISCIE: event }, { emitEvent: false });
        }
    }

    selectedOption(event, cieType) {
        if (cieType == 0) {
            this.formSolicitudLab.patchValue({ diagnosticoSIS: event.value.procedimiento });
        }
        if (cieType == 1) {
            this.formSolicitudLab.patchValue({ diagnosticoHIS: event.descripcionItem });
        }
    }

    recuperarLaboratorio(opcion) {
        console.log("opcion", opcion)
    }

    async add() {
        Swal.fire({
            title: '¿Esta seguro que desea guardar?',
            html: 'Se guardaran las solicitudes de laboratorio',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Guardar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title:'Exito',
                    showConfirmButton: false,
                    timer:1500
                })
                this.closeDialog();
            }
            else {
                Swal.fire({
                    title:'Cancelado.',
                    icon:'error',
                    showConfirmButton: false,
                    timer:1500
                })
            }
        })

        // for (let i = 0; i < this.examName.length; i++) {
        //     let auxExam: ExamenAuxiliar = {
        //         tipoLaboratorio: 'EXAMEN_LABORATORIO',
        //         subTipo: this.examName[i].subTipe,
        //         nombreExamen: this.examName[i].examen,
        //         codPrestacion: '',
        //         codigoSIS: '',
        //         codigoHIS: '',
        //         lugarExamen: 'LABORATORIO',
        //         labExterno: ''
        //     }
        //     this.auxExamList.push(auxExam);
        // }
        // this.solicitudLaboratorio = {
        //     servicio: '',
        //     nroCama: '',
        //     examenesAuxiliares: this.auxExamList
        // }
        // await this.examenAuxiliarService.postPromiseAddServiciosLaboratorio(this.dataConsulta.id, this.solicitudLaboratorio).then(res => {
        //     console.log('se guardo ', res);
        // });

    }

    labPeticiones() {
        let examNameLabel: string;
        this.examName.forEach(item => {
            examNameLabel = `${item.examen}`;
            return examNameLabel;
        })
    }
    closeDialog() {
        this.ref.close();
    }
}

interface Laboratory {
    subTipe: string,
    examen: string
}