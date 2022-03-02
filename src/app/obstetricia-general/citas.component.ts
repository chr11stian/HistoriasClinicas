import {Component, OnInit} from '@angular/core';
import {ObstetriciaGeneralService} from './services/obstetricia-general.service';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CitasService} from "./services/citas.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {PacienteService} from "../core/services/paciente/paciente.service";
import {MessageService} from "primeng/api";
import {CuposService} from "../core/services/cupos.service";
import {DocumentoIdentidadService} from "../mantenimientos/services/documento-identidad/documento-identidad.service";
import Swal from "sweetalert2";
import {RegistrarTriajeComponent} from "../modulos/triaje/registrar-triaje/registrar-triaje.component";
import {CuposTriajeService} from "../modulos/triaje/services/cupos-triaje/cupos-triaje.service";
import {Router} from '@angular/router';


@Component({
    selector: 'app-citas',
    templateUrl: './citas.component.html',
    styleUrls: ['./citas.component.css'],
    providers: [DialogService],
})
export class CitasComponent implements OnInit {
    idIpressLapostaMedica = "616de45e0273042236434b51";
    iprees: string = "la posta medica";
    options: data[]
    selectedOption: data
    citas: any[]
    loading: boolean = true;
    ref: DynamicDialogRef


    dataCitas: any;
    formCitas: FormGroup;
    datePipe = new DatePipe('en-US');
    fechaActual = new Date();


    dataPaciente: any[];

    DataCupos: any[];
    listaDocumentosIdentidad: any;
    TipoDoc: string = "DNI";
    DataCuposPaciente: any;
    dataCuposTriados: any;
    dialogTriaje: boolean = false;


    constructor(private obstetriciaGeneralService: ObstetriciaGeneralService,
                private obstetriciaService: ObstetriciaGeneralService,
                private citasService: CitasService,
                private fb: FormBuilder,
                private dialog: DialogService,
                private pacienteService: PacienteService,
                private messageService: MessageService,
                private cuposService: CuposService,
                private documentoIdentidadService: DocumentoIdentidadService,
                private cuposTriajeService: CuposTriajeService,
                private router: Router,
    ) {
        this.options = [
            {name: "DNI", code: 1},
            {name: "CARNET RN", code: 2},
            {name: "C EXTRANJERIA", code: 3},
            {name: "OTROS", code: 4},
        ]
        this.citas = [
            {
                dni: "10101013",
                apellidos: "ABARCA MELGAREJO",
                nombres: "KATHERIN",
                consultorio: "OBS01",
                horario: "8:00AM",
                fecha: "20/11/2021"
            },
        ]

    }


    ngOnInit(): void {
        this.buildForm();
        this.formCitas.get('tipoDoc').setValue(this.TipoDoc);
        this.formCitas.get('fechaBusqueda').setValue(this.fechaActual);
        this.getDocumentosIdentidad();
        this.buscarCuposPorPersonal();
        // this.getCuposXservicio();
    }

    buildForm() {
        this.formCitas = this.fb.group({
            fechaInicio: new FormControl(''),
            fechaBusqueda: new FormControl(''),
            tipoDoc: new FormControl(''),
            nroDoc: new FormControl(''),
        })
    }

    /**Lista de Cupos y citas sin importar el estado reservados por servicio **/
    getCuposXservicio() {
        let data = {
            servicio: 'OBSTETRICIA',
            fecha: this.datePipe.transform(this.formCitas.value.fechaBusqueda, 'yyyy-MM-dd')
        }
        console.log('DATA ', data);

        this.cuposService.getCuposServicioFecha(this.idIpressLapostaMedica, data).subscribe((res: any) => {
            this.DataCupos = res.object;
            this.loading = false;
            console.log('LISTA DE CUPOS POR SERVICIO ', this.DataCupos);
        })
    }

    /**Lista los tipos de documentos de Identidad de un paciente**/
    getDocumentosIdentidad() {
        this.documentoIdentidadService.getDocumentosIdentidad().subscribe((res: any) => {
            this.listaDocumentosIdentidad = res.object;
            console.log('docs ', this.listaDocumentosIdentidad);
        })
    }

    /**Busca un paciente por le numero de documento**/
    getPacientesXnroDocumento() {
        let data = {
            tipoDoc: this.formCitas.value.tipoDoc,
            nroDoc: this.formCitas.value.nroDoc,
        }
        this.pacienteService.getPacienteByNroDoc(data).subscribe((res: any) => {
            this.dataPaciente = [res.object];
            if (this.dataPaciente == null) {
                this.showInfoPaciente();
            } else {
                this.showSuccess();
            }
            console.log('paciente por doc ', this.dataPaciente);
        });

    }

    /**Busca un cupo por el numero de dni de un paciente**/
    async buscarCupoXdniFecha() {
        let data = {
            tipoDoc: this.formCitas.value.tipoDoc,
            nroDoc: this.formCitas.value.nroDoc,
            fecha: this.datePipe.transform(this.formCitas.value.fechaBusqueda, 'yyyy-MM-dd')
        }
        console.log("DATA DNI", data)

        await this.cuposService.buscarCupoPorDniFechaIpress(this.idIpressLapostaMedica, data)
            .then(result => {
                this.DataCuposPaciente = result
                console.log('LISTA DE CUPO DEL PACIENTE', result)
                if (this.DataCuposPaciente == undefined) {
                    this.showInfo();
                    this.getPacientesXnroDocumento();
                } else {
                    this.showSuccess();
                    this.dataPaciente = null;
                    this.DataCupos = null;
                    this.DataCupos = [this.DataCuposPaciente.object];
                }
            });
    }

    /**Modulo para hacer cosultas no gestantes**/
    irConsultaNoControl(row) {
        console.log('pasando data ', row);
        this.obstetriciaService.data = row;
    }


    enviarData2(event) {
        localStorage.setItem('PacienteSinCupo', JSON.stringify(event));
        localStorage.removeItem('datacupos');
    }

    enviarData(event) {
        // this.router.navigate(['/gestante']);
        console.log("EVENTO", event)
        if (event.funcionesVitales == null) {
            Swal.fire({
                icon: 'warning',
                title: 'Paciente',
                text: 'Necesita pasar por triaje',
                showConfirmButton: false,
                timer: 1500,
            })
            return
        } else {
            this.router.navigate(['dashboard/obstetricia-general/citas/gestante'], {queryParams: {id: null}})
            localStorage.setItem('datacupos', JSON.stringify(event));
            localStorage.removeItem('PacienteSinCupo');
        }
    }


    showSuccess() {
        this.messageService.add({
            severity: 'success',
            summary: 'Paciente',
            detail: 'Recuperado con exito'
        });
    }

    showInfoPaciente() {
        this.messageService.add({
            severity: 'info',
            summary: 'Paciente',
            detail: 'No existe en la Base de Datos'
        });
    }

    showInfo() {
        this.messageService.add({
            severity: 'info',
            summary: 'Paciente',
            detail: 'No tiene un registro de cupo'
        });
    }

    /**Buscar lista de cupos que pertenece a un personal de salud**/
    async buscarCuposPorPersonal() {
        let data = {
            tipoDoc: this.formCitas.value.tipoDoc,
            // nroDoc: this.formCitas.value.nroDoc,
            nroDoc: '73145986',
            fecha: this.datePipe.transform(this.formCitas.value.fechaBusqueda, 'yyyy-MM-dd')
        }
        console.log("DATA DNI", data)
        await this.cuposService.buscarListaCuposPersonal(this.idIpressLapostaMedica, data)
            .then((result: any) => {
                this.DataCupos = result.object
                this.loading = false;
                console.log('LISTA DE CUPO DEL PACIENTE', result)
            });
    }

    openDialogTriaje(data) {
        let opcion
        if (data.funcionesVitales == null) {
            opcion = 1
        } else {
            opcion = 3
        }

        let dataAux = {
            data: data,
            option: opcion
        }
        this.ref = this.dialog.open(RegistrarTriajeComponent, {
            header: " Registrar Triaje",
            width: '70%',
            data: dataAux
        });
        console.log("DATA TRIAJE", data)
        // this.ref.onClose.subscribe((data: any) => {
        //     // this.DataCupos();
        //     // this.listCuposTriados();
        // });
    }
}

interface data {
    name: string
    code: number
}
