import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {OfertasService} from 'src/app/core/services/ofertas/ofertas.service';
import {IpressService} from 'src/app/core/services/ipress/ipress.service'
import {RolGuardiaService} from 'src/app/core/services/rol-guardia/rol-guardia.service';
import {CuposService} from "../../../core/services/cupos.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-ofertas',
    templateUrl: './ofertas.component.html',
    styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

    form: FormGroup;
    formOfertas: FormGroup;
    formTransferirCupos: FormGroup;
    formTransferirCupos2: FormGroup;
    ofertasDialog: boolean = false;
    DialogTransferir = false;
    data: any[];
    fecha: Date = new Date();
    datePipe = new DatePipe("en-US");
    idIpress: String = "";
    nombreIpress: String = "";
    servicios: any[];
    ofertaSeleccionada: any;
    horas: any;
    buscoPorDoc: boolean = false;

    IdOfertaParaCambiar: string;
    SelectServicio = "MEDICINA GENERAL";
    DataPersonalBusqueda: any;
    TurnosPersonal: any;
    selectedHorario: any[];
    activarBoton: string = null;
    activarInput: string = 'Transferir todo';
    loading: boolean;

    constructor(
        private ofertasService: OfertasService,
        private rolGuardiaService: RolGuardiaService,
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private cuposService: CuposService
    ) {
        this.buildForm();
        this.idIpress = "616de45e0273042236434b51";
        this.nombreIpress = "la posta medica";
        this.data = [];
        this.servicios = [];
        this.horas = [];
        this.form.get('fechaFiltro').setValue(this.fecha);
        this.form.get('servicio').setValue(this.SelectServicio);
        this.getListaServiciosXIpress();
        this.getListaOfertasXServicio();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            fechaFiltro: [new Date()],
            servicio: [""],
            nroDoc: [""],
        });

        this.formOfertas = this.formBuilder.group({
            nroDoc: [""],
            nombre: [""],
            servicio: [""],
            fecha: [""],
            ambiente: [''],
            nroOfertasActuales: [''],
            nroOfertasAgregar: ['', [Validators.required]]
        });

        this.formTransferirCupos = this.formBuilder.group({
            nroDoc: new FormControl(''),
            nombre: new FormControl(''),
            servicio: new FormControl(''),
            fecha: new FormControl(''),
            ambiente: new FormControl(''),
            nroOfertasActuales2: new FormControl(''),
            horaInicio: new FormControl(''),
            horaFin: new FormControl(''),
        });

        this.formTransferirCupos2 = new FormGroup({
            apellidos2: new FormControl('', Validators.required),
            servicio2: new FormControl('', Validators.required),
            nroDoc2: new FormControl('', ),
            dia: new FormControl(''),
            turnos: new FormControl(''),
            transferir: new FormControl(),
        });
    }

    /**lista los Servicios por IPRESS**/
    getListaServiciosXIpress() {
        this.rolGuardiaService.getServiciosPorIpress(this.idIpress).subscribe((res: any) => {
            this.servicios = res.object;
            console.log('LISTA DE SERVICIOS DE  IPRESS', this.servicios);
        })
    }

    getListaOfertasXServicio() {
        this.buscoPorDoc = false;
        let data = {
            fechaOferta: this.form.value.fechaFiltro,
            nombreIpress: this.nombreIpress,
            servicio: this.form.value.servicio
        }
        console.log('DATA ', data);

        this.ofertasService.listarOfertasXservicio(data).subscribe((res: any) => {
            this.data = res.object;
            console.log('LISTA OFERTAS X SERVICIO', this.data);
        })
    }

    getListaOfertaXDocumento() {
        this.buscoPorDoc = true;
        let data = {
            tipoDoc: "DNI",
            nroDoc: this.form.value.nroDoc,
            nombreIpress: this.nombreIpress,
        }
        console.log('DATA ', data);

        this.ofertasService.buscarOfertaXPersonal(data).subscribe((res: any) => {
            this.data = res.object;
            console.log('LISTA OFERTAS X DNI', this.data);
        })
    }

    cancelar() {
        this.ofertasDialog = false;
        this.ofertaSeleccionada = {};
        this.showError();
    }

    showSuccess() {
        this.messageService.add({severity: 'success', summary: 'Generado', detail: 'Oferta generada correctamente'});
    }

    showError() {
        this.messageService.add({severity: 'error', summary: 'Cancelado', detail: 'Acción cancelada'});
    }

    openNewOfertaAgregar(data) {
        this.ofertasDialog = true;
        this.ofertaSeleccionada = data;
        this.horas = this.ofertaSeleccionada.horasCupo;
        this.formOfertas.reset();
        this.formOfertas.get('nroDoc').setValue(data.personal.nroDoc);
        this.formOfertas.get('nombre').setValue(data.personal.nombre);
        this.formOfertas.get('servicio').setValue(data.ipress.servicio);
        this.formOfertas.get('fecha').setValue(data.fechaOferta);
        this.formOfertas.get('ambiente').setValue(data.ambiente);
        this.formOfertas.get('nroOfertasActuales').setValue(data.totalOfertas);
        this.formOfertas.get('nroOfertasAgregar').setValue("");
    }

    guardarOfertasExtra() {
        let data = {
            idOferta: this.ofertaSeleccionada.id,
            nroCupos: this.formOfertas.value.nroOfertasAgregar
        }
        this.ofertasService.agregarOfertasAunaLista(data).subscribe((res: any) => {
            this.showSuccess();
            this.ofertasDialog = false;
            this.ofertaSeleccionada = {};
            console.log('rpta', res.object);
            if (this.buscoPorDoc) this.getListaOfertaXDocumento();
            else this.getListaOfertasXServicio();
        })
    }

    ngOnInit(): void {

    }

    /**hace un evento, al selecionar recupera la data de la oferta de un solo personal**/
    eventTransferirCupo(event) {
        this.DialogTransferir = true;
        this.IdOfertaParaCambiar = event.id;
        this.ofertaSeleccionada = event;
        this.horas = this.ofertaSeleccionada.horasCupo;
        this.formTransferirCupos.reset();
        this.formTransferirCupos.get('nroDoc').setValue(event.personal.nroDoc);
        this.formTransferirCupos.get('nombre').setValue(event.personal.nombre);
        this.formTransferirCupos.get('servicio').setValue(event.ipress.servicio);
        this.formTransferirCupos.get('fecha').setValue(event.fechaOferta);
        this.formTransferirCupos.get('ambiente').setValue(event.ambiente);
        this.formTransferirCupos.get('nroOfertasActuales2').setValue(event.totalOfertas);
        console.log("DATA PARA TRANSFERIR", this.IdOfertaParaCambiar)
    }


    /**Busca un personal de su rol de guardia**/
    async listarPersonalRolGuardia() {
        this.loading = true;
        let tipoDoc = "DNI";
        let nroDoc = this.formTransferirCupos2.value.nroDoc2;
        await this.cuposService.buscarPersonalRolGuardia(tipoDoc, nroDoc).then((res: any) => {
            this.loading = false;
            if (res.object !== null) {
                this.DataPersonalBusqueda = res.object[0];
                this.TurnosPersonal = this.DataPersonalBusqueda.turnos;
                this.messageService.add({
                    key: 'myKey1',
                    severity: 'success',
                    summary: 'Personal',
                    detail: 'Consulta exitosa'
                });
            } else {
                this.messageService.add({
                    key: 'myKey1',
                    severity: 'info',
                    summary: 'Personal',
                    detail: 'No se encontro en la base de datos'
                });
            }
            console.log("DataPersonal", res);

            this.formTransferirCupos2.reset();
            this.formTransferirCupos2.get('nroDoc2').setValue(this.DataPersonalBusqueda.personal.nroDoc);
            this.formTransferirCupos2.get('apellidos2').setValue(this.DataPersonalBusqueda.personal.nombre);
            this.formTransferirCupos2.get('servicio2').setValue(this.DataPersonalBusqueda.ipress.servicio);
            // this.formTransferirCupos2.get('ambiente').setValue(this.DataPersonalBusqueda.ambiente);
        });
    }

    /**Seleccionas un turno y recupera en dia de ese turno**/
    VerDiasDelTurno(event) {
        console.log("Trunos select", event);
        this.formTransferirCupos2.get('dia').setValue(event.value);
    }


    /**Selecciona radioButton y asigna el valorpara activar el boton y el input **/
    SelectHorarios() {
        this.activarBoton = this.formTransferirCupos2.value.transferir;
        this.activarInput = this.formTransferirCupos2.value.transferir;
        console.log("Activar", this.activarBoton);
    }


    /**Usa las funciones de cambioTotasDeCupos y tranferenciaParcialDeCupos y hace una
     * validacion para activar los botones**/
    cambiodeCupos() {
        if (this.activarBoton == 'Transferencia Total') {
            this.cambioTotasDeCupos();
        } else {
            this.tranferenciaParcialDeCupos();
        }
    }

    /**Transfiere los cupos en su totalidad**/
    async cambioTotasDeCupos() {
        let data = {
            tipoDoc: "DNI",
            nroDoc: this.formTransferirCupos2.value.nroDoc2,
            nombre: this.DataPersonalBusqueda.personal.nombre,
            tipoPersonal: this.DataPersonalBusqueda.personal.tipoPersonal,
            tipoContrato: this.DataPersonalBusqueda.personal.tipoContrato,
            sexo: this.DataPersonalBusqueda.personal.sexo,
        }
        console.log("DAAAAA", data);

        await this.cuposService.cambioOfertasElTotal(this.IdOfertaParaCambiar, data).then((res: any) => {
            console.log("sasas", res);
            if (res.object !== null) {
                Swal.fire({
                    icon: 'success',
                    title: 'Transferencia',
                    text: 'Exitosa',
                    showConfirmButton: false,
                    timer: 3000,
                })
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Transferencia',
                    text: 'No fue creada, El Personal no tiene el mismo Servicio',
                    showConfirmButton: false,
                    timer: 3000,
                })
            }
        });
        this.formTransferirCupos2.reset();
        this.DialogTransferir = false;

    }

    /**Transfiere los cupos en forma parcial**/
    async tranferenciaParcialDeCupos() {
        let data = {
            idOferta: this.IdOfertaParaCambiar,
            personal: {
                tipoDoc: "DNI",
                nroDoc: this.formTransferirCupos2.value.nroDoc2,
                nombre: this.DataPersonalBusqueda.personal.nombre,
                // nombre: this.formTransferirCupos2.value.apellidos2,
                tipoPersonal: this.DataPersonalBusqueda.personal.tipoPersonal,
                tipoContrato: this.DataPersonalBusqueda.personal.tipoContrato,
                sexo: this.DataPersonalBusqueda.personal.sexo,
            },
            horario: {
                horaInicio: this.datePipe.transform(this.formTransferirCupos.value.horaInicio, 'HH:mm'),
                horaFin: this.datePipe.transform(this.formTransferirCupos.value.horaFin, 'HH:mm'),
            }

        }

        console.log("dataaaa", data)
        await this.cuposService.TranferenciaParcialCupos(data)
            .then((result: any) => {
                console.log("sasas", result);
                if (result.object !== null) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Transferencia',
                        text: 'Exitosa',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Transferencia',
                        text: 'No fue creada, El Personal no tiene el mismo Servicio',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                }

            });
        this.formTransferirCupos2.reset();
        this.DialogTransferir = false;
    }


    cancelarTransferencia() {
        this.formTransferirCupos2.reset();
        this.DialogTransferir = false;
    }

    nuevoTransferencia() {
        this.activarBoton = null;
        this.DataPersonalBusqueda = null;
        this.formTransferirCupos2.reset();
    }
}
