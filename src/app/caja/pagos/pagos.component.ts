import {Component, OnInit} from '@angular/core';
import {ServicesService} from "../services/services.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import Swal from "sweetalert2";

@Component({
    selector: 'app-pagos',
    templateUrl: './pagos.component.html',
    styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

    DataPendientesPago: any;
    idIpressLapostaMedica = "616de45e0273042236434b51";
    formCaja: FormGroup;
    datePipe = new DatePipe('en-US');
    datafecha: Date = new Date();
    Dialogpagos: boolean;
    idPagoCaja: any;

    constructor(private servicesService: ServicesService,
                private fb: FormBuilder,) {
    }

    ngOnInit(): void {
        this.buildForm();
        this.formCaja.get('fechaBusqueda').setValue(this.datafecha);
        this.getListaCuposConfirmados();
    }

    buildForm() {
        this.formCaja = this.fb.group({
            fechaBusqueda: new FormControl(''),
            nroDoc: new FormControl(''),
            apePaterno: new FormControl(''),
            nombres: new FormControl(''),
            estado: new FormControl(''),
            servico: new FormControl(''),
            nroCupo: new FormControl(''),
        })
    }

    /** Selecciona  un servicio y fecha y lista las ofertas para reservar un cupo **/
    getListaCuposConfirmados() {
        let data = {
            fechaAtencion: this.datePipe.transform(this.formCaja.value.fechaBusqueda, 'yyyy-MM-dd')
            // fechaAtencion: "2022-01-20",
        }
        console.log('DATA', data);
        this.servicesService.getListaPendientesDePago(this.idIpressLapostaMedica, data).subscribe((res: any) => {
            this.DataPendientesPago = res.object;
            console.log('LISTA DE CUPOS PENDIENTES', this.DataPendientesPago);
        })
    }

    pagar() {
        this.servicesService.UpdateCupoCAja(this.idPagoCaja).subscribe((res: any) => {
        });
        Swal.fire({
            icon: 'success',
            title: 'Registro',
            text: "exitosa",
            showConfirmButton: false,
            timer: 1500,
        })
        this.Dialogpagos = false;
        this.getListaCuposConfirmados();
    }

    openModal(event) {
        this.Dialogpagos = true;
        this.idPagoCaja = event.id;
        console.log("ID PAGO", this.idPagoCaja);

        this.formCaja.get('nroDoc').setValue(event.paciente.nroDoc);
        this.formCaja.get('apePaterno').setValue(event.paciente.apellidos);
        this.formCaja.get('nombres').setValue(event.paciente.nombre);
        this.formCaja.get('estado').setValue(event.detallePago);
        this.formCaja.get('servico').setValue(event.ipress.servicio);
        this.formCaja.get('nroCupo').setValue(event.nroCupo);
    }

    close(){
        this.Dialogpagos = false;
        this.getListaCuposConfirmados();
    }
}
