import {Component, OnInit} from '@angular/core';
import {CitasService} from "../../obstetricia-general/services/citas.service";
import {ServicesService} from "../services/services.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";

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
}
