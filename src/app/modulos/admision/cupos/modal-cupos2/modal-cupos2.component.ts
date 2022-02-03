import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DocumentoIdentidadService} from "../../../../mantenimientos/services/documento-identidad/documento-identidad.service";
import Swal from "sweetalert2";
import {PacienteService} from "../../../../core/services/paciente/paciente.service";
import {CuposService} from "../../../../core/services/cupos.service";
import {UbicacionService} from "../../../../mantenimientos/services/ubicacion/ubicacion.service";
import {Distrito, Provincias} from "../../../../core/models/ubicacion.models";
import {DatePipe} from "@angular/common";
import {MessageService} from "primeng/api";
import {PacienteComponent} from "../../../paciente/paciente.component";
import {DialogService, DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
    selector: 'app-modal-cupos2',
    templateUrl: './modal-cupos2.component.html',
    styleUrls: ['./modal-cupos2.component.css'],
    providers: [DialogService, DynamicDialogConfig],

})
export class ModalCupos2Component implements OnInit {
    idIpressLapostaMedica = "616de45e0273042236434b51";
    formPacientesCupo: FormGroup;
    listaDocumentosIdentidad: any;
    dataPacientes: any;
    detallePago: string = "PENDIENTE";
    TipoDoc: string = "DNI";
    dataSelectServicio = "";
    dataSelectAmbiente: '';
    personalSelected: '';
    selectedFecha: '';
    selectedHorario: any;
    dataPersonalSelecionado: any;

    dataDepartamentos: any;
    dataProvincia: any;
    dataDistrito: any;
    dataCentroPoblado: any;
    prov: Provincias;
    dist: Distrito;
    ccpp: any;

    datafecha: Date = new Date();
    datePipe = new DatePipe('en-US');

    /**Edad nacimiento**/
    edad: any;
    meses: any;
    dias: any;

    estadoHoras: string = "LIBRE";
    DataCupos: any;


    /**ID de los datos seleccionados**/
    DepartamentoIDSelct: any;
    ProvinciaIDSelct: any;
    DistritoIDSelct: any;

    public pacienteComponent: PacienteComponent;


    constructor(private fb: FormBuilder,
                private documentoIdentidadService: DocumentoIdentidadService,
                private messageService: MessageService,
                // public pacienteComponent: PacienteComponent,
                private pacienteService: PacienteService,
                private ubicacionService: UbicacionService,
                private dialog: DialogService,
                private cuposService: CuposService,) {
        this.dataSelectServicio = cuposService.ServicioSeleccionado;
        this.dataSelectAmbiente = cuposService.AmbienteSeleccionado;
        this.personalSelected = cuposService.PersonalResponsableSeleccionado;
        this.selectedFecha = cuposService.FechaAtencionSeleccionado;
        this.selectedHorario = cuposService.HoraAtencionSeleccionado;
        this.dataPersonalSelecionado = cuposService.dataPersonalSelecionado;
        this.getDepartamentos();
    }

    ngOnInit(): void {
        this.buildForm();
        this.formPacientesCupo.get('tipoDoc').setValue(this.TipoDoc);
        this.getDocumentosIdentidad();
        // this.calcularEdad("2022-01-31");
        console.log("DATA", this.dataPersonalSelecionado);
        // this.saveForm();
    }

    /**Recupera las provincias  de un determinado departamento cuando buscas un paciente por su dni**/
    listarUbicacionPacienteProvincias() {
        let departamento = this.dataPacientes.domicilio.departamento;
        this.dataDepartamentos.forEach(object => {
            if (object.departamento === departamento) {
                console.log("Departamento:", object);
                this.DepartamentoIDSelct = object.iddd
            }
        });
        let dpto = {
            iddd: this.DepartamentoIDSelct
        }
        this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
            this.dataProvincia = res.object;
            console.log("PROVINCIA:", this.dataProvincia);
            this.listarUbicacionPacientedistritos();
        });

    }

    /**Recupera los Distritos de un determinado provincia cuando buscas un paciente por su dni**/
    listarUbicacionPacientedistritos() {
        let provincia = this.dataPacientes.domicilio.provincia;
        this.dataProvincia.forEach(object => {
            if (object.provincia === provincia) {
                console.log("Provincia:", object);
                this.ProvinciaIDSelct = object.idpp
            }
        });
        let provincia1 = {
            iddd: this.DepartamentoIDSelct,
            idpp: this.ProvinciaIDSelct,
        };
        this.ubicacionService.getDistritos(provincia1).subscribe((res: any) => {
            this.dataDistrito = res.object;
            this.listarUbicacionPacienteCCPP();
        });

    }

    /**Recupera los Centros poblados de un determinado Distrito cuando buscas un paciente por su dni**/
    listarUbicacionPacienteCCPP() {
        let distrito = this.dataPacientes.domicilio.distrito;
        this.dataDistrito.forEach(object => {
            if (object.distrito === distrito) {
                console.log("Distrito:", object);
                this.DistritoIDSelct = object.iddis
            }
        });
        let distrito1 = {
            iddd: this.DepartamentoIDSelct,
            idpp: this.ProvinciaIDSelct,
            iddis: this.DistritoIDSelct,
        }
        this.ubicacionService.getCentroPoblado(distrito1).subscribe((res: any) => {
            this.dataCentroPoblado = res.object;
        });
    }

    /**Lista todos los departamento **/
    getDepartamentos() {
        this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
            this.dataDepartamentos = resp.object;
            console.log("Departamento", this.dataDepartamentos);
        });
    }

    /**Selecciona un departamento y lista las provincias**/
    selectedDepartamento() {
        let depa = this.formPacientesCupo.value.dpto;
        this.dataDepartamentos.forEach(object => {
            if (object.departamento === depa) {
                console.log("Departamento:", object);
                this.DepartamentoIDSelct = object.iddd
            }
        });

        let dpto = {
            iddd: this.DepartamentoIDSelct
        }
        this.dataDistrito = '';
        this.dataCentroPoblado = '';
        this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
            this.dataProvincia = res.object;
        });
        this.formPacientesCupo.get('ccpp').setValue('');
    }

    /**Selecciona un Provincia y lista los Distritos**/
    selectedProvincia() {
        // DistritoIDSelct
        let provinciaX = this.formPacientesCupo.value.prov;
        this.dataProvincia.forEach(object => {
            if (object.provincia === provinciaX) {
                console.log("Provincia:", object);
                this.ProvinciaIDSelct = object.idpp
            }
        });

        let provincia = {
            iddd: this.DepartamentoIDSelct,
            idpp: this.ProvinciaIDSelct,
        };
        this.dataCentroPoblado = '';
        this.ubicacionService.getDistritos(provincia).subscribe((res: any) => {
            this.dataDistrito = res.object;
        });
        this.formPacientesCupo.get('ccpp').setValue('');

    }

    /**Selecciona un Distrito y lista los Centros Poblados**/
    selectedDistrito() {
        let distritoX = this.formPacientesCupo.value.dist;
        this.dataDistrito.forEach(object => {
            if (object.distrito === distritoX) {
                console.log("Distrito:", object);
                this.DistritoIDSelct = object.iddis
            }
        });

        let distrito = {
            iddd: this.DepartamentoIDSelct,
            idpp: this.ProvinciaIDSelct,
            iddis: this.DistritoIDSelct,
        }
        this.ubicacionService.getCentroPoblado(distrito).subscribe((res: any) => {
            this.dataCentroPoblado = res.object;
        });
    }


    buildForm() {
        this.formPacientesCupo = this.fb.group({
            primerNombre: new FormControl(''),
            otrosNombres: new FormControl(''),
            apePaterno: new FormControl(''),
            apeMaterno: new FormControl(''),
            sexo: new FormControl(''),
            fechaNacimiento: new FormControl(''),
            estadoCivil: new FormControl(''),
            celular: new FormControl(''),

            nacionalidad: new FormControl(''),
            departamento: new FormControl(''),
            provincia: new FormControl(''),
            distrito: new FormControl(''),
            centroPoblado: new FormControl(''),
            direccion: new FormControl(''),
            procedencia: new FormControl(''),
            LugarNacimiento: new FormControl(''),
            GradoInstrucion: new FormControl(''),

            tipoDoc: new FormControl(''),
            nroDoc: new FormControl(''),

            tipoSeguro: new FormControl(''),
            transeunte: new FormControl(''),

            edadAnio: new FormControl(''),
            edadMes: new FormControl(''),
            edadDia: new FormControl(''),


            dpto: new FormControl(''),
            prov: new FormControl(''),
            dist: new FormControl(''),
            ccpp: new FormControl(''),
        })
    }

    /**Lista los tipos de documentos de Identidad de un paciente**/
    getDocumentosIdentidad() {
        this.documentoIdentidadService.getDocumentosIdentidad().subscribe((res: any) => {
            this.listaDocumentosIdentidad = res.object;
            console.log('docs ', this.listaDocumentosIdentidad);
        })
    }

    obtenerFecha(fecha: Date): string {
        let arr = fecha.toString().split('-');
        const Year: string = arr[0];
        const Months: string = arr[1];
        const Day: string = arr[1];
        console.log(Year + '-' + Months + '-' + Day);
        return Year + '-' + Months + '-' + Day;
    }


    /**Busca un paciente por su numero de documento y los recupera en el formPacientesCupo**/
    pacienteByNroDoc() {
        let auxNroDoc = {
            tipoDoc: this.formPacientesCupo.value.tipoDoc,
            nroDoc: this.formPacientesCupo.value.nroDoc,
        }
        this.pacienteService.getPacienteByNroDoc(auxNroDoc).subscribe((res: any) => {
            if (res.object != null || res.object != undefined) {
                this.dataPacientes = res.object
                console.log('paciente por doc ', this.dataPacientes)
                this.listarUbicacionPacienteProvincias();
                if (this.dataSelectServicio == "OBSTETRICIA") {
                    if ((this.dataPacientes.sexo == "Femenino") || (this.dataPacientes.sexo == "FEMENINO")) {
                        this.formPacientesCupo.get('apePaterno').setValue(this.dataPacientes.apePaterno);
                        this.formPacientesCupo.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
                        this.formPacientesCupo.get('primerNombre').setValue(this.dataPacientes.primerNombre);
                        this.formPacientesCupo.get('otrosNombres').setValue(this.dataPacientes.otrosNombres);
                        this.formPacientesCupo.get('sexo').setValue(this.dataPacientes.sexo);
                        this.formPacientesCupo.get('fechaNacimiento').setValue(this.obtenerFecha(this.dataPacientes.nacimiento.fechaNacimiento));
                        this.formPacientesCupo.get('estadoCivil').setValue(this.dataPacientes.estadoCivil);
                        this.formPacientesCupo.get('celular').setValue(this.dataPacientes.celular);
                        this.formPacientesCupo.get('nacionalidad').setValue(this.dataPacientes.nacionalidad);
                        this.formPacientesCupo.get('tipoSeguro').setValue(this.dataPacientes.tipoSeguro);
                        this.formPacientesCupo.get('dpto').setValue(this.dataPacientes.domicilio.departamento);
                        this.formPacientesCupo.get('prov').setValue(this.dataPacientes.domicilio.provincia);
                        this.formPacientesCupo.get('dist').setValue(this.dataPacientes.domicilio.distrito);
                        this.formPacientesCupo.get('ccpp').setValue(this.dataPacientes.domicilio.ccpp);
                        this.formPacientesCupo.get('direccion').setValue(this.dataPacientes.domicilio.direccion);
                        this.formPacientesCupo.get('tipoSeguro').setValue(this.dataPacientes.tipoSeguro);
                        this.formPacientesCupo.get('GradoInstrucion').setValue(this.dataPacientes.gradoInstruccion);

                        this.calcularEdad(this.obtenerFecha(this.dataPacientes.nacimiento.fechaNacimiento));
                        this.formPacientesCupo.get('edadAnio').setValue(this.edad);
                        this.formPacientesCupo.get('edadMes').setValue(this.meses);
                        this.formPacientesCupo.get('edadDia').setValue(this.dias);


                        this.formPacientesCupo.get('GradoInstrucion').setValue(this.dataPacientes.gradoInstruccion);
                        this.formPacientesCupo.get('LugarNacimiento').setValue(this.dataPacientes.nacimiento.departamento + ' ' + this.dataPacientes.nacimiento.provincia + ' ' + this.dataPacientes.nacimiento.distrito);
                        if (this.dataPacientes.tipoSeguro == "SIS") {
                            this.detallePago = "GRATUITO"
                        }
                    } else {
                        this.messageService.add({
                            key: 'tc',
                            severity: 'info',
                            summary: this.dataPacientes.apePaterno + " " + this.dataPacientes.apeMaterno + " " + this.dataPacientes.primerNombre,
                            detail: 'El servicio no esta disponible'
                        });
                    }
                } else {
                    this.formPacientesCupo.get('apePaterno').setValue(this.dataPacientes.apePaterno);
                    this.formPacientesCupo.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
                    this.formPacientesCupo.get('primerNombre').setValue(this.dataPacientes.primerNombre);
                    this.formPacientesCupo.get('otrosNombres').setValue(this.dataPacientes.otrosNombres);
                    this.formPacientesCupo.get('sexo').setValue(this.dataPacientes.sexo);
                    this.formPacientesCupo.get('fechaNacimiento').setValue(this.obtenerFecha(this.dataPacientes.nacimiento.fechaNacimiento));
                    this.formPacientesCupo.get('estadoCivil').setValue(this.dataPacientes.estadoCivil);
                    this.formPacientesCupo.get('celular').setValue(this.dataPacientes.celular);
                    this.formPacientesCupo.get('nacionalidad').setValue(this.dataPacientes.nacionalidad);
                    this.formPacientesCupo.get('tipoSeguro').setValue(this.dataPacientes.tipoSeguro);
                    this.formPacientesCupo.get('dpto').setValue(this.dataPacientes.domicilio.departamento);
                    this.formPacientesCupo.get('prov').setValue(this.dataPacientes.domicilio.provincia);
                    this.formPacientesCupo.get('dist').setValue(this.dataPacientes.domicilio.distrito);
                    this.formPacientesCupo.get('ccpp').setValue(this.dataPacientes.domicilio.ccpp);
                    this.formPacientesCupo.get('direccion').setValue(this.dataPacientes.domicilio.direccion);
                    this.formPacientesCupo.get('tipoSeguro').setValue(this.dataPacientes.tipoSeguro);
                    this.formPacientesCupo.get('GradoInstrucion').setValue(this.dataPacientes.gradoInstruccion);

                    this.calcularEdad(this.obtenerFecha(this.dataPacientes.nacimiento.fechaNacimiento));
                    this.formPacientesCupo.get('edadAnio').setValue(this.edad);
                    this.formPacientesCupo.get('edadMes').setValue(this.meses);
                    this.formPacientesCupo.get('edadDia').setValue(this.dias);


                    this.formPacientesCupo.get('GradoInstrucion').setValue(this.dataPacientes.gradoInstruccion);
                    this.formPacientesCupo.get('LugarNacimiento').setValue(this.dataPacientes.nacimiento.departamento + ' ' + this.dataPacientes.nacimiento.provincia + ' ' + this.dataPacientes.nacimiento.distrito);
                    if (this.dataPacientes.tipoSeguro == "SIS") {
                        this.detallePago = "GRATUITO"
                    }
                }

            } else {
                this.messageService.add({
                    key: "paciente",
                    severity: 'info',
                    summary: 'Paciente',
                    detail: 'No existe en la Base de Datos'
                });
                this.buscarNuevoPaciente();
            }
        });
    }

    buscarNuevoPaciente() {
        this.cuposService.modalPacientes = this.dialog.open(PacienteComponent, {
            header: "NUEVO PACIENTE",
            style: {
                width: "60%"
            },
            contentStyle: {
                overflow: "auto",

            },
        })
        this.pacienteComponent.dialogPaciente = true;
    }

    cargarDatosReniec() {
        let nroDoc = this.formPacientesCupo.value.nroDoc;
        console.log(nroDoc);
        this.pacienteService.getDataReniecPaciente(nroDoc).subscribe((res: any) => {
            console.log(res.resultado);
            console.log(res);
            this.formPacientesCupo.get("primerNombre").setValue(res.nombres);
            this.formPacientesCupo.get("apePaterno").setValue(res.apePaterno);
            this.formPacientesCupo.get("apeMaterno").setValue(res.apeMaterno);
            // if(res.genero="0"){ this.formPaciente.get("sexo").setValue("FEMENINO");}else{"MASCULINO"}
            this.formPacientesCupo.get("restriccion").setValue(res.restriccion);
            this.formPacientesCupo.get("estadoCivil").setValue(res.estadoCivil);
            this.formPacientesCupo.get("direccion").setValue(res.direccion);
            if (res.tipoSeguro == "01") {
                this.formPacientesCupo.get("tipoSeguro").setValue("SIS");
            }
            this.formPacientesCupo.get("fechaInscripcion").setValue(res.fecAfiliacion);

            // console.log('lista ipress ', this.listaIpress)
        });
    }


    /**Registra un nuevo cupo para un determinado paciente**/
    saveForm() {
        const req = {
            fechaAtencion: this.selectedFecha,
            nroCupo: '',
            oferta_id: this.dataPersonalSelecionado.id,
            descripcion: "asdfgh",
            horaAtencion: this.selectedHorario[0].horaInicio,
            horaAtencionFin: this.selectedHorario[0].horaFin,
            ambiente: this.dataPersonalSelecionado.ambiente,

            paciente: {
                nombre: this.formPacientesCupo.value.primerNombre + ", " + this.formPacientesCupo.value.otrosNombres,
                apellidos: this.formPacientesCupo.value.apePaterno + ", " + this.formPacientesCupo.value.apeMaterno,
                tipoDoc: this.formPacientesCupo.value.tipoDoc,
                nroDoc: this.formPacientesCupo.value.nroDoc,
                edadAnio: this.formPacientesCupo.value.edadAnio,
                edadMes: this.formPacientesCupo.value.edadMes,
                edadDia: this.formPacientesCupo.value.edadDia,
            },

            transeunte: false,
            detallePago: this.detallePago,

            ipress: {
                ipress_id: this.dataPersonalSelecionado.ipress.idIpress,
                nombre: this.dataPersonalSelecionado.ipress.nombre,
                servicio: this.dataPersonalSelecionado.ipress.servicio
            },
        };
        console.log("guardar", req);

        this.cuposService.saveCupos(req).subscribe(
            (result: any) => {
                console.log(result.object);
                if (result.object !== null || result.object !== undefined) {
                    this.cuposService.modal2.close();
                    this.getCuposXservicio();
                    Swal.fire({
                        icon: 'success',
                        title: 'Cupo',
                        text: result.mensaje,
                        showConfirmButton: false,
                        timer: 2000,
                    })
                    this.actualizarOfertaEstado();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Cupo',
                        text: result.mensaje,
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            }
        );
        this.formPacientesCupo.reset();
    }


    /**Actualiza el estdo de una oferta que pertenece al Personal**/
    /****/
    actualizarOfertaEstado() {
        let data = {
            idOferta: this.dataPersonalSelecionado.id,
            horaInicio: this.selectedHorario[0].horaInicio,
            horaFin: this.selectedHorario[0].horaFin,
            estado: "OCUPADO"
        }

        console.log("DATA ACTUALIZAR OFERTA", data);

        this.cuposService.updateEstadoOferta(data).subscribe(resp => {
            this.messageService.add({
                severity: 'success',
                summary: 'Oferta',
                detail: 'Actualizo con exito'
            });
        })
    }

    esNumero(strNumber) {
        if (strNumber == null) return false;
        if (strNumber == undefined) return false;
        if (typeof strNumber === "number" && !isNaN(strNumber)) return true;
        if (strNumber == "") return false;
        if (strNumber === "") return false;
        let psInt, psFloat;
        psInt = parseInt(strNumber);
        psFloat = parseFloat(strNumber);
        return !isNaN(strNumber) && !isNaN(psFloat);
    }


    /**Calcula la edad del paciente**/
    calcularEdad(fecha) {
        /** Si la fecha es correcta, calculamos la edad*/
        if (typeof fecha != "string" && fecha && this.esNumero(fecha.getTime())) {
            fecha = fecha.formatDate(fecha, "yyyy-MM-dd");
        }
        let values = fecha.split("-");
        let dia = values[2];
        let mes = values[1];
        let ano = values[0];

        // cogemos los valores actuales
        let fecha_hoy = new Date();
        let ahora_ano = fecha_hoy.getFullYear();
        let ahora_mes = fecha_hoy.getMonth() + 1;
        let ahora_dia = fecha_hoy.getDate();

        // realizamos el calculo
        this.edad = (ahora_ano + 0) - ano;
        if (ahora_mes < mes) {
            this.edad--;
        }
        if ((mes == ahora_mes) && (ahora_dia < dia)) {
            this.edad--;
        }
        if (this.edad > 0) {
            this.edad -= 0;
        }

        // calculamos los meses
        this.meses = 0;

        if (ahora_mes > mes && dia > ahora_dia)
            this.meses = ahora_mes - mes - 1;
        else if (ahora_mes > mes)
            this.meses = ahora_mes - mes
        if (ahora_mes < mes && dia < ahora_dia)
            this.meses = 12 - (mes - ahora_mes);
        else if (ahora_mes < mes)
            this.meses = 12 - (mes - ahora_mes + 1);
        if (ahora_mes == mes && dia > ahora_dia)
            this.meses = 11;

        // calculamos los dias
        this.dias = 0;
        if (ahora_dia > dia)
            this.dias = ahora_dia - dia;
        if (ahora_dia < dia) {
            let ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
            this.dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }
        return this.edad + " años, " + this.meses + "meses y " + this.dias + " días";
    }

    /**Lista de Cupos y citas sin importar el estado reservados por servicio **/
    getCuposXservicio() {
        let data = {
            servicio: this.dataPersonalSelecionado.ipress.servicio,
            fecha: this.dataPersonalSelecionado.fechaOferta,
        }
        console.log('DATA ', data);
        this.cuposService.getCuposServicioFecha(this.idIpressLapostaMedica, data).subscribe((res: any) => {
            this.DataCupos = res.object;
            this.cuposService.dataCupos = res.object;
        })
    }

    cerrar(){
        this.formPacientesCupo.reset();
        this.cuposService.modal2.close();
    }
}
