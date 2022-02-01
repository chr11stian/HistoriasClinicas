import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Router} from "@angular/router";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {CuposService} from "../../../core/services/cupos.service";
import {UpsService} from "../../../mantenimientos/services/ups/ups.service";
import {DocumentoIdentidadService} from "../../../mantenimientos/services/documento-identidad/documento-identidad.service";
import {PacienteService} from "../../../core/services/paciente/paciente.service";
import {RolGuardiaService} from "../../../core/services/rol-guardia/rol-guardia.service";
import {CitasService} from "../../../obstetricia-general/services/citas.service";
import Swal from "sweetalert2";
import {PacienteComponent} from "../../paciente/paciente.component";
import {ModalCuposComponent} from "./modal-cupos/modal-cupos.component";

@Component({
    selector: 'app-cupos',
    templateUrl: './cupos.component.html',
    styleUrls: ['./cupos.component.css'],
    providers: [DialogService, DynamicDialogConfig],

})
export class CuposComponent implements OnInit, OnDestroy {

    idIpressLapostaMedica = "616de45e0273042236434b51";
    iprees: string = "la posta medica";

    dataCupos_por_fechas_servicio: any;
    DataCupos: any;
    fecha: string;
    datafecha: Date = new Date();
    datePipe = new DatePipe('en-US');
    ups: [] = [];
    justifyOptions: any[];
    formCuposListar: FormGroup;
    ServicoSelect: string = "OBSTETRICIA";


    /*******detalle cupo para verificar si mandar a caja o triaje**************/
    detallePago: string = "PENDIENTE"
    ref: DynamicDialogRef;

    constructor(
        private router: Router,
        private primeNGConfig: PrimeNGConfig,
        private messageService: MessageService,
        private fb: FormBuilder,
        private dialog: DialogService,
        private cuposService: CuposService,
        private upsService: UpsService,
        private documentoIdentidadService: DocumentoIdentidadService,
        private pacienteService: PacienteService,
        private rolGuardiaService: RolGuardiaService,
    ) {
        this.justifyOptions = [
            {icon: "pi pi-align-left", justify: "Left"},
            {icon: "pi pi-align-right", justify: "Right"},
            {icon: "pi pi-align-center", justify: "Center"},
            {icon: "pi pi-align-justify", justify: "Justify"}
        ];


    }

    ngOnInit(): void {
        this.buildForm();
        this.formCuposListar.get('SelectUPS').setValue(this.ServicoSelect);
        this.formCuposListar.get('fechaBusqueda').setValue(this.datafecha);
        this.detallePago = "PENDIENTE";
        this.getListaUps();
        this.fecha = this.datePipe.transform(this.formCuposListar.value.fechaBusqueda, 'yyyy-MM-dd')

        this.getCuposXservicio();
        this.getListaCuposConfirmados();
        // this.ListarPacientesCitasObstetricas();

    }

    buildForm() {
        this.formCuposListar = this.fb.group({
            fechaBusqueda: new FormControl(''),
            tipoDoc: new FormControl(''),
            nroDoc: new FormControl(''),
            SelectUPS: new FormControl(''),
        })
    }

    /**Lista de Cupos y citas sin importar el estado reservados por servicio **/
    getCuposXservicio() {
        let data = {
            servicio: this.formCuposListar.value.SelectUPS,
            fecha: this.datePipe.transform(this.formCuposListar.value.fechaBusqueda, 'yyyy-MM-dd')
        }
        console.log('DATA ', data);

        this.cuposService.getCuposServicioFecha(this.idIpressLapostaMedica, data).subscribe((res: any) => {
            this.DataCupos = res.object;
            console.log('LISTA DE CUPOS POR SERVICIO ', this.DataCupos);
        })
    }

    // ListarPacientesCitasObstetricas() {
    //     const data = {
    //         fechaInicio: this.datePipe.transform(this.datafecha, 'yyyy-MM-dd'),
    //         fechaFin: this.datePipe.transform(this.formCuposListar.value.fechaBusqueda, 'yyyy-MM-dd')
    //     }
    //
    //     console.log("data fechas", data)
    //     this.citasService.getProximaCitasGestacion(data).subscribe((res: any) => {
    //         this.dataCitas = res.object;
    //         console.log('Lista de Citas: ', this.dataCitas);
    //     });
    // }

    /**lista los Servicios por IPRESS**/
    getListaUps() {
        this.rolGuardiaService.getServiciosPorIpress(this.idIpressLapostaMedica)
            .subscribe((resp) => {
                this.ups = resp["object"];
                // this.loading = false;
            });
    }


    /** Selecciona  un servicio y fecha y lista las cupos confirmados **/
    getListaCuposConfirmados() {
        let data = {
            servicio: this.formCuposListar.value.SelectUPS,
            fecha: this.datePipe.transform(this.formCuposListar.value.fechaBusqueda, 'yyyy-MM-dd')
        }
        console.log('DATA', data);
        this.cuposService.listaCuposConfirmados(this.idIpressLapostaMedica, data).subscribe((res: any) => {
            this.dataCupos_por_fechas_servicio = res.object;
            console.log('LISTA DE CITAS CONFIRMADOS POR SERVICIO ', this.dataCupos_por_fechas_servicio);
        })
        if (this.dataCupos_por_fechas_servicio != null) {
            this.dataCupos_por_fechas_servicio = null;
        }
        this.getCuposXservicio();
        // this.ListarPacientesCitasObstetricas();
    }

    /**abre el dialog para cupos**/
    openDialogCuposNuevo() {
        this.ref = this.dialog.open(ModalCuposComponent, {
            width: '1200px',
            modal: true,
            height: '750px',
            contentStyle: {"max-height": "500", "overflow": "auto"},
            baseZIndex: 10000
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

}
