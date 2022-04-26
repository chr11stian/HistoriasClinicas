import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../services/services.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import Swal from "sweetalert2";
import { TarifarioService } from 'src/app/core/services/tarifario/tarifario.service';

@Component({
    selector: 'app-pagos',
    templateUrl: './pagos.component.html',
    styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

    DataPendientesPago: any;
    idIpress = "";
    ipressNombre = "";
    ipressRenaes = "";
    ipressDireccion = "";
    ipressRUC = "";
    formCaja: FormGroup;
    datePipe = new DatePipe('en-US');
    datafecha: Date = new Date();
    Dialogpagos: boolean;
    idPagoCaja: any;

    tarifas: any[];

    nroCaja: String = "";
    tipoDocReceptor: "";
    nroDocReceptor: "";
    constructor(
        private servicesService: ServicesService,
        private tarifarioService: TarifarioService,
        private fb: FormBuilder,
    ) {
        this.nroCaja = JSON.parse(localStorage.getItem('cajaActual'));
        this.tipoDocReceptor = JSON.parse(localStorage.getItem('usuario')).tipoDocumento;
        this.nroDocReceptor = JSON.parse(localStorage.getItem('usuario')).nroDocumento;

        this.idIpress= JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
        this.ipressNombre = JSON.parse(localStorage.getItem('usuario')).ipress.nombreEESS;
        this.ipressRenaes = JSON.parse(localStorage.getItem('usuario')).ipress.renipress;
        this.ipressDireccion = JSON.parse(localStorage.getItem('usuario')).ipress.ubicacion.direccion;
        this.ipressRUC = JSON.parse(localStorage.getItem('usuario')).ipress.ruc;
    }

    ngOnInit(): void {
        this.buildForm();
        this.formCaja.get('fechaBusqueda').setValue(this.datafecha);
        this.getListaCuposConfirmados();
    }

    buildForm() {
        this.formCaja = this.fb.group({
            fechaBusqueda: new FormControl(''),
            nroCaja: new FormControl(''),
            nroBoleta: new FormControl(''),
            nroDoc: new FormControl(''),
            apePaterno: new FormControl(''),
            nombres: new FormControl(''),
            direccion: new FormControl(''),
            estado: new FormControl(''),
            servicio: new FormControl(''),
            nroCupo: new FormControl(''),
            fechaRecibo: new FormControl(''),
            fechaAtencion: new FormControl(''),
            horaAtencion: new FormControl(''),
            precioServicio: new FormControl(''),
            tipoSeguro: new FormControl(''),
            edad: new FormControl(''),
            descripcionPago: new FormControl(''),
            tipoPago: new FormControl(''),
            codigoPago: new FormControl(''),
        })
    }

    getTarifaUps() {
        let data = {
            idIpress: this.idIpress,
            ups: this.formCaja.value.servicio,
            tipo: "CONSULTA"
        }
        this.tarifarioService.filtrarTarifasXServicioTipo(data).subscribe((res: any) => {
            this.tarifas = res.object;
            console.log('LISTA DE TARIFAS', this.tarifas);
        })
    }
    onChangeTarifa() {
        this.formCaja.get('codigoPago').setValue(this.formCaja.value.descripcionPago.codigo);
        this.formCaja.get('tipoPago').setValue(this.formCaja.value.descripcionPago.tipo);
        this.formCaja.get('precioServicio').setValue(this.formCaja.value.descripcionPago.costo);
    }
    /** Selecciona  un servicio y fecha y lista las ofertas para reservar un cupo **/
    getListaCuposConfirmados() {
        let data = {
            fechaAtencion: this.datePipe.transform(this.formCaja.value.fechaBusqueda, 'yyyy-MM-dd')
            // fechaAtencion: "2022-01-20",
        }
        console.log('DATA', data);
        this.servicesService.getListaPendientesDePago(this.idIpress, data).subscribe((res: any) => {
            this.DataPendientesPago = res.object;
            console.log('LISTA DE CUPOS PENDIENTES', this.DataPendientesPago);
        })
    }

    ponerEdadEnLetras(anios, meses, dias) {
        let cadena = ""
        if (anios > 1) {
            cadena += anios + " años,";
        }
        else {
            if (anios != 0)
                cadena += anios + " año,"
        }
        if (meses > 1) {
            cadena += meses + " meses, ";
        }
        else {
            cadena += meses + " mes, "
        }
        if (dias > 1) {
            cadena += dias + " dias";
        }
        else {
            cadena += dias + " dia"
        }
        return cadena;
    }
    pagar() {
        let pago1 = {
            tipo: "R",
            tipoDocReceptor: this.tipoDocReceptor,
            nroDocReceptor: this.nroDocReceptor,
            apellidos: this.formCaja.value.apePaterno,
            nombres: this.formCaja.value.nombres,
            detalle: [
                {
                    ups: this.formCaja.value.servicio,
                    codigo: this.formCaja.value.codigoPago,
                    descripcion: this.formCaja.value.descripcionPago.descripcion,
                    tipo: this.formCaja.value.tipoPago,
                    idCupo: this.idPagoCaja,
                    cantidad: 1,
                    precioUnitario: this.formCaja.value.precioServicio,
                    importe: this.formCaja.value.precioServicio,
                }
            ],
            importeTotal: this.formCaja.value.precioServicio,
        }


        this.servicesService.pagarRecibo(this.idIpress, this.nroCaja, pago1).subscribe((res: any) => {
            this.servicesService.UpdateCupoCAja(this.idPagoCaja).subscribe((res: any) => {
            });
            Swal.fire({
                icon: 'success',
                title: 'Registro',
                text: "exitosa",
                showConfirmButton: false,
                timer: 1500,
            })
            this.close();
        });
    }

    openModal(event) {
        this.Dialogpagos = true;
        this.idPagoCaja = event.id;
        console.log("ID PAGO", this.idPagoCaja);

        this.formCaja.get('nroDoc').setValue(event.paciente.nroDoc);
        this.formCaja.get('apePaterno').setValue(event.paciente.apellidos);
        this.formCaja.get('nombres').setValue(event.paciente.nombre);
        this.formCaja.get('edad').setValue(this.ponerEdadEnLetras(event.paciente.edadAnio, event.paciente.edadMes, event.paciente.edadDia));
        this.formCaja.get('estado').setValue(event.detallePago);
        this.formCaja.get('servicio').setValue(event.ipress.servicio);
        this.formCaja.get('nroCaja').setValue(this.nroCaja);
        this.formCaja.get('fechaRecibo').setValue(new Date().toLocaleString());

        this.formCaja.get('fechaAtencion').setValue(event.fechaAtencion);
        this.formCaja.get('horaAtencion').setValue(event.horaAtencion + "-" + event.horaAtencionFin);

        this.getTarifaUps();
        this.servicesService.obtenerNumeracionCaja(this.idIpress, this.nroCaja).subscribe((res: any) => {
            this.formCaja.get('nroBoleta').setValue(res.object.contadorRecibos + 1);
        })
    }

    close() {
        this.Dialogpagos = false;
        this.getListaCuposConfirmados();
        this.formCaja.get('codigoPago').setValue("");
        this.formCaja.get('tipoPago').setValue("");
        this.formCaja.get('precioServicio').setValue(0);
        this.tarifas = [];
    }
}
