import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {CieService} from "../../../../../services/cie.service";
import {ConsultasService} from "../../services/consultas.service";
import {DatePipe} from "@angular/common";
import {MessageService} from "primeng/api";
@Component({
    selector: 'app-giagnosticos',
    templateUrl: './giagnosticos.component.html',
    styleUrls: ['./giagnosticos.component.css']
})
export class GiagnosticosComponent implements OnInit {
     selectedDiagnostico: any;
    opcionBusqueda: string;
    /**Recupera el Id del Consultorio Obstetrico**/
    idConsultoriObstetrico: string;
    form: FormGroup
    /*****PROPIEDADES del diagnositico**********/
    diagnosticoDialog: boolean;
    diagnosticos: any[]=[];
    /******** PROPIEDADES de orientaciones******/
    data2: any[] = []; // data orientaciones
    isUpdate: boolean = false;
    // orientacionesDialog: boolean;
    /****LISTA CIE 10*****/
    Cie10: any;
    displayModal: boolean;
    /******PROPIEDADES DE DATOS ADICIONALES**********/
    form2: FormGroup; /*FORM DE ORIENTACIONES*/
    planPartoList: any[];
    visitaDomiciliariaList:any[];
    formOtrosDatos: FormGroup;
    referencia: any;
    proxCita: any;
    orientaciones: any[]=[];
    /*******DATA AUX PARA RECUPERAR DE LA BD*******/
    dataAux: any;
    datePipe = new DatePipe('en-US');
    visitaDomiciliaria: any;
    /****** Data recuperada********/
    private planPartoReenfocada: any;
    private tipoDocRecuperado: any;
    private nroDocRecuperado: any;
    private nroEmbarazo:any;
    private nroHclRecuperado:any;
    /********Lista tipo Dx*****/
    tipoList:any[]= [];
    eleccion: any;
    private nroFetos = 0;
    private idConsulta:any;

    constructor(private formBuilder: FormBuilder,
                private obstetriciaService: ObstetriciaGeneralService,
                private cieService: CieService,
                private messageService: MessageService,
                private DxService: ConsultasService) {
        this.buildForm();
        /*********RECUPERAR DATOS*********/
        this.tipoDocRecuperado = this.obstetriciaService.tipoDoc;
        this.nroDocRecuperado = this.obstetriciaService.nroDoc;
        this.nroEmbarazo = this.obstetriciaService.nroEmbarazo;
        this.idConsultoriObstetrico = this.obstetriciaService.idConsultoriObstetrico;
        this.idConsulta = this.obstetriciaService.idGestacion;
        this.nroHclRecuperado = this.obstetriciaService.nroHcl;
        /***************DATOS DE LOS DROPDOWNS*******************/
        /*LLENADO DE LISTAS - VALORES QUE PUEDEN TOMAR TIPO DX*/
        this.tipoList = [{label: 'DEFINITIVO', value: 'D'},
            {label: 'PRESUNTIVO', value: 'P'},
            {label: 'REPETITIVO', value: 'R'},

        ];
        this.planPartoList = [{label: 'CONTROL', value: 'CONTROL'},
            {label: 'VISITA', value: 'VISITA'},
            {label: 'NO SE HIZO', value: 'NO SE HIZO'},
            {label: 'NO APLICA', value: 'NO APLICA'}
        ];
        this.visitaDomiciliariaList = [
            {label: 'SI', value: 'SI'},
            {label: 'NO', value: 'NO'},
            {label: 'NO APLICA', value: 'NO APLICA'}
        ];
    }
    ngOnInit() {
        console.log("TipoDocRecuperado", this.tipoDocRecuperado);
        console.log("NroDocRecuparado", this.nroDocRecuperado);
        console.log("Nro de embarazo", this.nroEmbarazo);
        console.log("Id Consultorio Obstetrico", this.idConsultoriObstetrico);
        this.recuperarNroFetos();
        this.recuperarDatosGuardados();

    }
    recuperarNroFetos(){
        let idData = {
            id: this.idConsulta
        }
        this.DxService.getUltimaConsultaById(idData).subscribe((res: any) => {
            this.nroFetos = res.object.nroFetos;
            console.log("nroFetos:",this.nroFetos)
        })
    }
    showModalDialog() {
        this.displayModal = true;
    }
    buildForm() {
        this.form = this.formBuilder.group({
            diagnostico: ['', [Validators.required]],
            tipo:['', [Validators.required]],
        }),
            this.form2 = this.formBuilder.group({
                orientaciones: ['', [Validators.required]],
            }),
            this.formOtrosDatos = this.formBuilder.group({
                consultorio: ['', [Validators.required]],
                motivo: ['', [Validators.required]],
                codRENAES: ['', [Validators.required]],
                proxCita: ['', [Validators.required]],
                planPartoReenfocada: ['', [Validators.required]],
                visita: ['', [Validators.required]],
                fechaVisita: ['', [Validators.required]]
            })
    }
    /*guardar datos de diagnosticos*/
    save1(form: any) {
        this.isUpdate = false;
        let bandera:boolean = false;
        let dx = this.form.value.diagnostico.descripcionItem;
        let cie = this.form.value.diagnostico.codigoItem;
        if (dx==" " || dx==null || dx==undefined)
        {
            this.messageService.add({severity:'info', summary:'Recuperado', detail:'Diagnostico no válido vuelva a ingresar.'});
        }else{
        /***verificar si ya ingreso este dx************/
        for(let i=0;i<this.diagnosticos.length;i++)
        {
            if (this.diagnosticos[i].cie10===cie){bandera = true;
            console.log(bandera)}
        }
        /***si el dx es repetido -> mensaje si no ingresar al sistema***/
        if(bandera===true){
            this.messageService.add({severity:'info', summary:'Recuperado', detail:'Diagnostico ya ingresado, ingrese otro porfavor.'});
        }
       else{
           this.diagnosticos.push({
               diagnostico: dx,
               cie10: cie,
               tipo: this.form.value.tipo
           }
           )}}
        this.diagnosticoDialog = false;
    }
    /******ABRIR DIALOGS DX****/
    openDiagnostico() {
        this.isUpdate = false;
        this.form.reset();
        this.form.get('diagnostico').setValue("");
        this.diagnosticoDialog = true;
    }
    canceled1() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.diagnosticoDialog = false;
    }
    /******EVENTO PARA BUSQUEDA SEGUN FILTRO*****/
    filterDiagnostico(event) {

        console.log('event ', event.query);
        this.cieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
            this.Cie10 = res.object;
            // console.log('seleccion de autocomplete ', this.Cie10)

        })
    }
    selectedOption(event) {
        console.log('seleccion de autocomplete ', this.Cie10)
    }
    /*FIN PARA BUSQUEDA SEGUN FILTRO*/
    titulo() {
        if (this.isUpdate) return "EDITE DIAGNOSTICO";
        else return "INGRESAR UN DIAGNOSTICO";
    }
    editar(rowData: any) {
        console.log("modificando" + rowData)
    }
    /*ELIMINAR DATOS DE LAS TABLAS*/

    eliminarDx(index) {
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.diagnosticos.splice(index, 1)
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
    enviarDatosRefProxCita() {
        this.referencia = {
            consultorio: this.formOtrosDatos.value.consultorio,
            motivo: this.formOtrosDatos.value.motivo,
            codRENAES: this.formOtrosDatos.value.codRENAES
        },
        this.proxCita = {fecha:this.datePipe.transform(this.formOtrosDatos.value.proxCita, 'yyyy-MM-dd'),estado:"PENDIENTE"}
        this.visitaDomiciliaria = {
            estado: this.formOtrosDatos.value.visita,
            fecha:  this.datePipe.transform(this.formOtrosDatos.value.fechaVisita, 'yyyy-MM-dd HH:mm:ss')
        }
        this.planPartoReenfocada = this.formOtrosDatos.value.planPartoReenfocada
    }
    guardarTodosDatos() {
        this.enviarDatosRefProxCita();
        const req = {
            id:this.idConsultoriObstetrico,
            nroHcl:this.nroHclRecuperado,
            nroEmbarazo:this.nroEmbarazo,
            nroAtencion:1,
            // nroControlSis: 1,
            tipoDoc: this.tipoDocRecuperado,
            nroDoc: this.nroDocRecuperado,
            referencia: this.referencia,
            proxCita: this.proxCita,
            visitaDomiciliaria:this.visitaDomiciliaria,
            planPartoReenfocada:this.planPartoReenfocada,
            diagnosticos:this.diagnosticos

        }

        this.DxService.updateConsultas(this.nroFetos,req).subscribe(
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
    recuperarDatosGuardados(){
        let aux ={
            "id" : this.idConsultoriObstetrico,
            "nroHcl":this.nroHclRecuperado,
            "nroEmbarazo":this.nroEmbarazo,
            "nroAtencion":1
        }
        this.DxService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
            this.dataAux = res.object;
            console.log("data consulta:" +this.dataAux);

            if(res['cod']='2401') {
                if(this.dataAux!=null){
                    console.log(this.dataAux);
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Recuperado',
                            detail: 'Registro recuperado satisfactoriamente'
                        });

                    /**********************RECUPERAR DATOS DE ORIENTACIONES********/
                    if(this.dataAux.orientaciones!=null) {
                        let y: number = 0;
                        console.log(this.dataAux.orientaciones);
                        // this.messageService.add({severity:'info', summary:'Recuperado', detail:'registro de orientaciones recuperado satisfactoriamente'});
                        while (y < this.dataAux.orientaciones.length) {
                            console.log("orientaciones consta de: ", this.dataAux.orientaciones[y]);
                            if (this.dataAux.orientaciones[y].valor === true) {
                                this.orientaciones.push(this.dataAux.orientaciones[y]);
                            }
                            y++;
                        }
                    }
                    /************************RECUPERAR DATOS DE DIAGNOSTICOS***************/
                    if(this.dataAux.diagnosticos!=null) {
                        let x: number = 0;
                        while (x < this.dataAux.diagnosticos.length) {

                            console.log("diagnosticos consta de: ", this.dataAux.diagnosticos[x]);
                            this.diagnosticos.push(this.dataAux.diagnosticos[x]);
                            x++;
                        }
                    }
                    if(this.dataAux.referencia != null){
                            this.formOtrosDatos.patchValue({'consultorio': this.dataAux.referencia.consultorio});
                            this.formOtrosDatos.patchValue({'motivo': this.dataAux.referencia.motivo});
                            this.formOtrosDatos.patchValue({'codRENAES': this.dataAux.referencia.codRENAES});
                        }
                        /************************RECUPERAR DATOS EXTRA**************************/
                    if (this.dataAux.proxCita!=null){
                        this.formOtrosDatos.patchValue({'proxCita': this.dataAux.proxCita.fecha});
                    }
                    if(this.dataAux.visitaDomiciliaria!=null){
                        this.formOtrosDatos.patchValue({'visita': this.dataAux.visitaDomiciliaria.estado});
                        this.formOtrosDatos.patchValue({'fechaVisita': this.dataAux.visitaDomiciliaria.fecha});
                    }
                    if(this.dataAux.planPartoReenfocada){
                        this.formOtrosDatos.patchValue({'planPartoReenfocada': this.dataAux.planPartoReenfocada});

                    }

            } else{this.messageService.add({severity: 'success', summary: 'Registros', detail: 'No hay datos ingresados todavía'});}

            }
        });
    }
}