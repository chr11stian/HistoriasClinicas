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
import {RegistrarTriajeComponent} from "../triajes/registrar-triaje/registrar-triaje.component";
import {CuposTriajeService} from "../triajes/services/cupos-triaje/cupos-triaje.service";
import {Router} from '@angular/router';
import {Observable} from "rxjs";


@Component({
    selector: 'app-citas',
    templateUrl: './citas.component.html',
    styleUrls: ['./citas.component.css'],
    providers: [DialogService],
})
export class CitasComponent implements OnInit {
    productObservable$: Observable<number>;

    idIpressLapostaMedica = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    iprees: string = JSON.parse(localStorage.getItem('usuario')).ipress.nombreEESS;
    nroDocumento: string = JSON.parse(localStorage.getItem('usuario')).nroDocumento;
    tipoDocumento: string = JSON.parse(localStorage.getItem('usuario')).tipoDocumento;
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
            
        ]

    }
    ngOnInit(): void {
        this.buildForm();
        this.formCitas.get('tipoDoc').setValue(this.TipoDoc);
        this.formCitas.get('fechaBusqueda').setValue(this.fechaActual);
        this.getDocumentosIdentidad();
        this.buscarCuposPorPersonal();

    }

    buildForm() {
        this.formCitas = this.fb.group({
            fechaInicio: new FormControl(''),
            fechaBusqueda: new FormControl(''),
            tipoDoc: new FormControl(''),
            nroDoc: new FormControl(''),
        })
    }
    /**Lista los tipos de documentos de Identidad de un paciente**/
    getDocumentosIdentidad() {
        this.documentoIdentidadService.getDocumentosIdentidad().subscribe((res: any) => {
            this.listaDocumentosIdentidad = res.object;
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
        });

    }

    /**Busca un cupo por el numero de dni de un paciente**/
    async buscarCupoXdniFecha() {
        let data = {
            tipoDoc: this.formCitas.value.tipoDoc,
            nroDoc: this.formCitas.value.nroDoc,
            fecha: this.datePipe.transform(this.formCitas.value.fechaBusqueda, 'yyyy-MM-dd')
        }

        await this.cuposService.buscarCupoPorDniFechaIpress(this.idIpressLapostaMedica, data)
            .then(result => {
                this.DataCuposPaciente = result
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
        this.obstetriciaService.data = row;
    }


    enviarData2(event) {
        localStorage.setItem('PacienteSinCupo', JSON.stringify(event));
        localStorage.removeItem('datacupos');
    }

    redireccionarCitas(rowData) {
        if (rowData.funcionesVitales == null) {
            Swal.fire({
                icon: 'warning',
                title: 'Paciente',
                text: 'Necesita pasar por triaje',
                showConfirmButton: false,
                timer: 1500,
            })
            return
        } 
        this.router.navigate(['dashboard/obstetricia-general/citas/gestante'], {queryParams: {id: null}})
        localStorage.setItem('datacupos', JSON.stringify(rowData));
        localStorage.removeItem('PacienteSinCupo');
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
    buscarCuposPorPersonal() {
        const inputRequest={
            servicio:"OBSTETRICIA",
            fecha:this.datePipe.transform(this.formCitas.value.fechaBusqueda, 'yyyy-MM-dd')
        }
        this.cuposService.buscarListaCuposPersonalObstetricia(inputRequest)
            .then((result: any) => {
                this.DataCupos = result.object
                this.loading = false;
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
            data: dataAux,
        });
        // console.log("DATA TRIAJE", data)
        this.ref.onClose.subscribe((data: any) => {
            this.buscarCuposPorPersonal();
        });
    }
    redireccionarConsultaGeneral(rowData){
        if (rowData.funcionesVitales == null) {
            Swal.fire({
                icon: 'warning',
                title: 'Paciente',
                text: 'Necesita pasar por triaje',
                showConfirmButton: false,
                timer: 1500,
            })
            return
        }
        let data: any =
        {
          ups:'OBSTETRICIA',
          tipoConsulta:'CONSULTA GESTANTE EXTERNA',
          nroDocumento: rowData.paciente.nroDoc,
          tipoDoc: rowData.paciente.tipoDoc,
          idConsulta: '',
          sexo: rowData.paciente.sexo,
          anio:rowData.paciente.edadAnio,
          mes:rowData.paciente.edadMes,
          dia:rowData.paciente.edadDia,
          idCupo: rowData.id,
          servicio:rowData.servicio
        }
        localStorage.setItem('documento', JSON.stringify(data));
        this.router.navigate(['/dashboard/consulta-generica/lista-cita/lista-consulta'])
        
        // this.router.navigate(['dashboard/obstetricia-general/citas/gestante'], {queryParams: {id: null}})
        // localStorage.setItem('datacupos', JSON.stringify(event));
        // localStorage.removeItem('PacienteSinCupo');
       
    }
}

interface data {
    name: string
    code: number
}
