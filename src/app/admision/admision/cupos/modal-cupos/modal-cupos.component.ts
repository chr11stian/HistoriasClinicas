import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RolGuardiaService} from "../../../../core/services/rol-guardia/rol-guardia.service";
import {CuposService} from "../../../../core/services/cupos.service";

@Component({
    selector: 'app-modal-cupos',
    templateUrl: './modal-cupos.component.html',
    styleUrls: ['./modal-cupos.component.css']
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
    personalSelected2: any;

    dataSelectAmbiente: any;
    dataSelectHoras: any;
    dataSelectServicio: any;
    selectedHorario: any;

    estadoHoras: string = "LIBRE";
    estadoCupo: string = "active";


    constructor(private fb: FormBuilder,
                private rolGuardiaService: RolGuardiaService,
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
        // this.personalSelected = '';
        let data = {
            nombreIpress: this.iprees,
            servicio: this.formCuposOferta.value.SelectUPSOferta,
            fechaOferta: this.datePipe.transform(this.formCuposOferta.value.fechaOferta, 'yyyy-MM-dd')
        }
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
        this.dataSelectAmbiente = event.data.ambiente;
        this.dataSelectServicio = event.data.ipress.servicio;
        this.personalSelected = event.data.personal.nombre;//Personal
        this.dataSelectHoras = event.data.horasCupo;
        console.log('HORAS....', this.dataSelectHoras);
        /** personalSelected2 almacena todo los datos del event al seleccionar un personal**/
        this.personalSelected2 = event.data;
        console.log('select personal....', this.personalSelected2);
    }

}
