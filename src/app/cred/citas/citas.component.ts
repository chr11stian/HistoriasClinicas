import {Component, OnInit} from '@angular/core'
import {DialogService} from 'primeng/dynamicdialog'
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ObstetriciaGeneralService} from "../../obstetricia-general/services/obstetricia-general.service";
import {CitasService} from "../../obstetricia-general/services/citas.service";
import {PacienteService} from "../../core/services/paciente/paciente.service";
import {MessageService} from "primeng/api";
import {CuposService} from "../../core/services/cupos.service";
import {DocumentoIdentidadService} from "../../mantenimientos/services/documento-identidad/documento-identidad.service";
import {dato} from "src/app/cred/citas/models/data"

export interface userCita {
    dni: string
    tipoDoc: string
    nroDoc: string
    apellidos: string
    nombres: string
    consultorio: string
    horario: string
    fecha: string
}

@Component({
    selector: 'app-citas',
    templateUrl: './citas.component.html',
    styleUrls: ['./citas.component.css'],
    providers: [DialogService]
})
export class CitasComponent implements OnInit {
    attributeLocalS = 'documento'
    idIpressLapostaMedica = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    iprees: string = JSON.parse(localStorage.getItem('usuario')).ipress.nombreEESS;
    nroDocumento: string = JSON.parse(localStorage.getItem('usuario')).nroDocumento;
    tipoDocumento: string = JSON.parse(localStorage.getItem('usuario')).tipoDocumento;
    loading: boolean = true;
    options: data[]
    selectedOption: data
    citas: any[]


    dataCitas: any;
    formCitas: FormGroup;
    datePipe = new DatePipe('en-US');
        fechaActual = new Date();


    dataPaciente: any[];

    DataCupos: any[];
    listaDocumentosIdentidad: any;
    TipoDoc: string = "DNI";
    DataCuposPaciente: any;


    constructor(private obstetriciaGeneralService: ObstetriciaGeneralService,
                private obstetriciaService: ObstetriciaGeneralService,
                private citasService: CitasService,
                private fb: FormBuilder,
                private pacienteService: PacienteService,
                private messageService: MessageService,
                private cuposService: CuposService,
                private documentoIdentidadService: DocumentoIdentidadService,
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
            {
                dni: 'DNI', /** no debe haber */
                tipoDoc: 'DNI',
                nroDoc: '10101013',
                apellidos: 'CAMPOS RODRIGUEZ',
                nombres: 'THIAGO ALEJANDRO',
                consultorio: 'OBS01',
                horario: '8:00AM',
                fecha: '16/11/2021'
            },
        ]

    }


    ngOnInit(): void {
        this.buildForm();
        this.formCitas.get('tipoDoc').setValue(this.TipoDoc);
        this.formCitas.get('fechaBusqueda').setValue(this.fechaActual);
        this.getDocumentosIdentidad();
        this.getCuposXservicio();
        this.buscarCuposPorPersonal();
    }
    async buscarCuposPorPersonal() {
        let data = {
            tipoDoc: this.tipoDocumento,
            nroDoc: this.nroDocumento,
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
            servicio: 'ATENCION INTEGRAL DEL NINO',
            fecha: this.datePipe.transform(this.formCitas.value.fechaBusqueda, 'yyyy-MM-dd')
        }
        console.log('DATAS ', data);

        this.cuposService.getCuposServicioFecha(this.idIpressLapostaMedica, data).subscribe((res: any) => {
            this.DataCupos = res.object;
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


    enviarData(event) {
        this.obstetriciaGeneralService.tipoDoc = null;
        this.obstetriciaGeneralService.nroDoc = null;
        console.log("EVENTO", event);
        // this.obstetriciaGeneralService.observable$.emit(event.id);
        this.obstetriciaGeneralService.tipoDoc = event.paciente.tipoDoc;
        this.obstetriciaGeneralService.nroDoc = event.paciente.nroDoc;

        let data: dato =
            {
                nroDocumento: event.paciente.nroDoc,
                tipoDoc: event.paciente.tipoDoc,
                idConsulta: '',
                sexo: ''
            }
        localStorage.setItem(this.attributeLocalS, JSON.stringify(data));
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
}

interface data {
    name: string
    code: number
}
