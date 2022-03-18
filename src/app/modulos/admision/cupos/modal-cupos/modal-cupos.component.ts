import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RolGuardiaService} from "../../../../core/services/rol-guardia/rol-guardia.service";
import {CuposService} from "../../../../core/services/cupos.service";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ModalCupos2Component} from "../modal-cupos2/modal-cupos2.component";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-modal-cupos',
    templateUrl: './modal-cupos.component.html',
    styleUrls: ['./modal-cupos.component.css'],
    providers: [DialogService, DynamicDialogConfig],

})
export class ModalCuposComponent implements OnInit {


    /**Datos de una iprres**/
    idIpressLapostaMedica = "616de45e0273042236434b51";
    iprees: string = "la posta medica";

    /**FECHAS**/
    datafecha: Date = new Date();
    datePipe = new DatePipe('en-US');

    /**Inicializar Formulario**/
    formCuposOferta: FormGroup;
    ups: [] = [];

    ServicoSelecionado: string = "OBSTETRICIA";
    dataOfertasCupos: any;

    personalSelected: string = '';
    dataSelectAmbiente: any;
    dataSelectHoras: any;
    selectedHorario: any;

    estadoHoras: string = "LIBRE";
    ref: DynamicDialogRef;

    selectedFecha: any;


    constructor(private fb: FormBuilder,
                private rolGuardiaService: RolGuardiaService,
                private messageService: MessageService,
                private dialog: DialogService,
                private cuposService: CuposService,
    ) {
    }


    ngOnInit(): void {
        this.buildForm();
        this.getListaUps();
        this.formCuposOferta.get('fechaOferta').setValue(this.datafecha);
        this.formCuposOferta.get('SelectUPSOferta').setValue(this.ServicoSelecionado);
        this.changeServicioSelected();


    }


    buildForm() {
        this.formCuposOferta = this.fb.group({
            fechaOferta: new FormControl(''),
            SelectUPSOferta: new FormControl(''),
        })
    }


    /**lista los Servicios por IPRESS**/
    getListaUps() {
        this.rolGuardiaService.getServiciosPorIpress(this.idIpressLapostaMedica)
            .subscribe((resp) => {
                this.ups = resp["object"];
                // this.loading = false;
            });
    }

    /** Selecciona  un servicio y fecha y lista las ofertas para reservar un cupo **/
    changeServicioSelected() {
        let data = {
            nombreIpress: this.iprees,
            servicio: this.formCuposOferta.value.SelectUPSOferta,
            fechaOferta: this.datePipe.transform(this.formCuposOferta.value.fechaOferta, 'yyyy-MM-dd')
        }
        this.dataSelectHoras = null;
        this.getOfertascuposListar(data);

        console.log("Datos del servico Selecionado", data)
    }

    /**Lista las ofertas **/
    getOfertascuposListar(data) {
        this.cuposService.getOfertasListar(data).subscribe((resp: any) => {
            this.dataOfertasCupos = resp.object;
            console.log("OFERTAS HORARIOS", this.dataOfertasCupos);
        });
    }

    /** Selecciona el personal de salud para recuperar datos de un event **/
    onRowSelect(event) {
        console.log('event',);
        this.cuposService.AmbienteSeleccionado = event.data.ambiente;
        this.cuposService.ServicioSeleccionado = event.data.ipress.servicio;
        this.cuposService.PersonalResponsableSeleccionado = event.data.personal.nombre;//Personal
        this.cuposService.HoraAtencionSeleccionado = event.data.horasCupo;
        this.cuposService.FechaAtencionSeleccionado = event.data.fechaOferta;
        this.cuposService.dataPersonalSelecionado = event.data;

        this.personalSelected = event.data.personal.nombre;//Personal
        this.dataSelectAmbiente = event.data.ambiente;
        this.dataSelectHoras = event.data.horasCupo;
    }


    /**Abre un modal si cumplen los parametros**/
    aceptarDialogCupos() {
        this.cuposService.HoraAtencionSeleccionado = this.selectedHorario
        let auxCupo: any = this.selectedHorario;

        if (auxCupo.length != 1) {
            this.messageService.add({
                key: "myKey1",
                severity: 'warn',
                summary: 'Alerta',
                detail: 'Solo debe seleccionar un horario'
            });
            return;
        }
        // this.selectedFecha = this.datafecha.getDate() + "-" + this.datafecha.getMonth() + 1 + "-" + this.datafecha.getFullYear();
        console.log('HORARIO SELECCIONADO', this.selectedHorario)
        console.log('FECHA SELECIONADO', this.selectedFecha)
        this.openDialogCuposNuevo2();

    }

    /**abre el dialog para cupos**/
    openDialogCuposNuevo2() {
        this.cuposService.modal2 = this.dialog.open(ModalCupos2Component, {
            width: '95%',
            modal: true,
            height: '100%',
            contentStyle: {"max-height": "500", "overflow": "p-fluid"},
            baseZIndex: 0
        })
        this.cuposService.modal1.close();

    }
}
